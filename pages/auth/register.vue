<template>
  <section>
    <!-- Register form -->
    <div class="container mx-4 px-5 pt-5 custom-form">
      <h4 class="lh-lg Regtxt text-center text-white pt-3 fw-bold">ایمیل خود را چک کرده و کد تایید به همراه بقیه مشخصات زیر را وارد کنید</h4>
      <form @submit.prevent class="px-lg-5">
        <div class="mt-5 form-group">
          <input
            class="form-control"
            placeholder="آدرس ایمیل خود را وارد کنید"
            v-model="email"
            type="email"
            dir="rtl" 
            />
        </div>
        <div class="form-group">
          <input
            class="form-control"
            placeholder="نام کامل خود را وارد کنید"
            v-model="name"
            type="text"/>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            placeholder="کد تایید را وارد کنید"
            v-model="verification_code"
            type="number"/>
        </div>
        <div class="form-group">
          <input
            v-model="password"
            class="form-control mt-3"
            placeholder="رمز عبور خود را وارد کنید"
            type="password"
            id="typeText"
          />
        </div>
      </form>
      <div class="px-lg-5 pt-2">
        <button @click="Register" class="btn btn-success btn-md">
        تکمیل ثبت نام
      </button>
      </div>
      <div v-if="DspRegisterErrRes" class="p-1 text-center mt-5 bg-danger"> <!-- Centered Response Paragraph -->
        <p  v-if="DspRegisterErrRes.data.message" class="fw-bold mt-2 response">{{ DspRegisterErrRes.data.message }}</p>
        <p  v-if="DspRegisterErrRes.data.error" class="fw-bold mt-2 response">{{ DspRegisterErrRes.data.error }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      name: "",
      verification_code: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["DspRegisterErrRes", "DspRegisterScuRes"])
  },
  methods: {
    ...mapActions(["SetRegister"]),
    Register() {
      this.SetRegister({
        email: this.email,
        name: this.name,
        verification_code: this.verification_code,
        password: this.password,
      });
    },
  },
  created() {
    if(this.$route.query.email) {
      this.email = this.$route.query.email
    }
  }
};
</script>

<style scoped>
section{
  background: linear-gradient(135deg, #388e3c, #1e6db3, #394240); /* Darker gradient from green to blue to a darker shade of gray */
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff; 
}

/* Custom styles for a Persian psychology website with RTL */
[type=email], [type=number], [type=tel], [type=url] {
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

