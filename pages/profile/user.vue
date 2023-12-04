<template>
  <section>
    <div class="container-fluid">
      <div class="d-lg-none row">
        <div class="col-12">
          <div class="bg-dark p-2 text-start">
            <p class="rounded p-2 bg-success pe-2 mt-2 text-white">
              پنل درمانگر سامانه روانشناسی سایت یک
            </p>
            <a href="/">
              <p class="rounded p-2 bg-success pe-2 mt-2 text-white">
                درمانگر ها
              </p>
            </a>
            <p class="rounded p-2 bg-success pe-2 mt-2 text-white">
              ایجاد مقاله
            </p>
            <p class="MobileExit rounded p-2 bg-danger pe-2 mt-4 text-white">
              خروج از پنل
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10">
          <h5 class="pt-lg-5 my-5 text-center text-white fw-bold">
            جهت نمایش در بخش درمانگر ها اطلاعات زیر را تکمیل کنید
          </h5>
          <div class="mx-4 px-5 py-5 custom-form">
            <!-- display errors  -->
            <div
              v-if="DspTherapistErrRes"
              class="p-1 text-center mb-5 bg-danger"
            >
              <!-- Centered Response Paragraph -->
              <p
                v-if="DspTherapistErrRes.data.message"
                class="fw-bold mt-2 text-white"
              >
                {{ DspTherapistErrRes.data.message }}
              </p>
              <p
                v-if="DspTherapistErrRes.data.error"
                class="fw-bold mt-2 text-white"
              >
                {{ DspTherapistErrRes.data.error }}
              </p>
            </div>
            <!-- display success -->
            <div
              class="p-1 text-center mb-5 bg-success"
              v-if="DspTherapistSucres"
            >
              <p class="fw-bold mt-2 text-white">
                {{ DspTherapistSucres.message }}
              </p>
            </div>
            <form @submit.prevent class="px-lg-5">
              <div class="mt-3 form-group">
                <input
                  class="form-control"
                  placeholder="نام خود را وارد کنید"
                  type="text"
                  dir="rtl"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="education"
                  class="form-control"
                  placeholder="آخرین مدرک تحصیلی"
                  type="text"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="price"
                  class="form-control"
                  placeholder="هزینه مشاوره ساعتی"
                  type="number"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="phone_number"
                  class="form-control"
                  placeholder="شماره تماس"
                  type="number"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="work_experience"
                  class="form-control"
                  placeholder="تجربه فعالیت"
                  type="number"
                />
              </div>
              <div
                class="form-group"
                v-for="(field, index) in treatment_fields"
                :key="index"
              >
                <div class="d-flex flex-row">
                  <input
                    class="form-control"
                    placeholder="شاخه درمان"
                    v-model="field.value"
                    :name="'field' + index"
                    type="text"
                  />
                  <button
                    v-if="index !== 0"
                    class="ms-2 btn btn-sm btn-danger"
                    type="button"
                    @click="removeField(index)"
                  >
                    حذف
                  </button>
                </div>
              </div>
              <button
                class="text-white btn btn-sm btn-secondary"
                type="button"
                @click="addField"
              >
                افزودن شاخه درمان
              </button>
              <div class="mt-4 form-group">
                <textarea
                  v-model="description"
                  class="form-control"
                  rows="5"
                  cols="50"
                  placeholder="مختصری درباره خود توضیح دهید"
                  id="description"
                ></textarea>
              </div>
            </form>
            <div class="px-lg-5 pt-2">
              <button @click="Therapist" class="btn btn-success btn-md">
                تکمیل اطلاعات
              </button>
            </div>
          </div>
        </div>
        <!-- Desktop section sidebar -->
        <div class="LeftPanel bg-dark col-lg-2 d-none d-lg-block">
          <nuxt-link class="profile_title" to="/profile/user">
            <p class="rounded bg-success p-2 mt-5 me-2 text-start text-white">
              پنل درمانگر سامانه روانشناسی سایت یک
            </p>
          </nuxt-link>
          <p class="rounded bg-success p-2 mt-5 me-2 text-start text-white">
            ایجاد مقاله
          </p>
          <a href="/">
            <p class="rounded bg-success p-2 mt-3 me-2 text-start text-white">
              درمانگر ها
            </p>
          </a>
          <p class="rounded bg-danger p-2 mt-5 me-2 text-start text-white">
            خروج از پنل
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
    
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      treatment_fields: [{ value: "" }], // Initial field
      name: "",
      education: "",
      phone_number: "",
      description: "",
      price: "",
      work_experience: "",
    };
  },
  computed: {
    ...mapGetters(["DspTherapistSucres", "DspTherapistErrRes"]),
  },
  methods: {
    ...mapActions(["SetTherapist"]),
    addField() {
      this.treatment_fields.push({ value: "" });
    },
    removeField(index) {
      this.treatment_fields.splice(index, 1);
    },
    Therapist() {
      if (this.treatment_fields[0].value !== "") {
        this.SetTherapist({
          treatment_fields: this.formatTreatmentFields(),
          name: this.name,
          education: this.education,
          phone_number: this.phone_number,
          description: this.description,
          price: this.price,
          work_experience: this.work_experience,
          token: this.$cookiz.get("jwt-token"),
        });
      } else {
        alert("تمامی فیلد ها را پر کرده و حداقل یک شاخه درمان وارد کنید");
      }
    },
    formatTreatmentFields() {
      const formattedFields = {};
      this.treatment_fields.forEach((field, index) => {
        formattedFields["field" + (index + 1)] = field.value;
      });
      return JSON.stringify(formattedFields);
    },
  },
  /* check if User is not authenticated */
  middleware({ redirect, app }) {
    if (!app.$cookiz.get("jwt-token")) {
      redirect("/auth/login");
    }
  },
};
</script>
    
    
<style scoped>
a {
  text-decoration: none;
}

.MobileExit {
  text-align: center;
  width: 100px;
}

.profile_title {
  text-decoration: none !important;
}

.LeftPanel {
  min-height: 100vh;
}

.bg-grey {
  background-color: #f8f9fa; /* Set your preferred grey color */
}

section {
  background: linear-gradient(
    135deg,
    #388e3c,
    #1e6db3,
    #394240
  ); /* Darker gradient from green to blue to a darker shade of gray */
  min-height: 100vh;
}

/* Custom styles for a Persian psychology website with RTL */
[type="email"],
[type="number"],
[type="tel"],
[type="url"] {
  direction: rtl !important;
}

.RegTxt {
  font-size: 2em;
  color: #28a745; /* Bootstrap green color */
}

.custom-form {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15); /* Enhanced box shadow */
  border: 2px solid #fff; /* White border */
  direction: rtl;
}

.form-group {
  margin-bottom: 20px;
}

.btn-success {
  background-color: #28a745; /* Bootstrap green color */
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838; /* Darker shade of Bootstrap green color */
  border-color: #218838;
}
</style>