<template>
  <section>
      <!-- Header -->
      <header class="bg-dark text-white text-center py-4">
        <h1 class="pageTitle">مشاوره روانشناسی</h1>
      </header>

      <!-- Main Content -->
      <div class="content container mt-5">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <!-- Psychologist Details -->
               <!-- v-for loop to iterate over psychologists array -->
               <div v-for="(psychologist, index) in therapists.data" :key="index" dir="rtl" class="card mb-4">
                    <div class="card-header">درباره روانشناس</div>
                    <div class="card-body">
                        <h5 class="card-title">{{ psychologist.name }}</h5>
                        <p class="card-text">فیلد درمان: {{ psychologist.treatment_fields }}</p>
                        <p class="card-text">تحصیلات: {{ psychologist.education }}</p>
                        <p class="card-text">شماره تماس: {{ psychologist.phone_number }}</p>
                        <p class="card-text">درباره روانشناس: {{ psychologist.description }}</p>
                        <p class="card-text">هزینه ساعتی: {{ psychologist.price }} تومان</p>
                        <p class="card-text">میزان تجربه: {{ psychologist.work_experience }} سال</p>
                    </div>
                </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-dark text-white text-center py-3 mt-4">
        <p>تمامی حقوق این وب سایت متعلق به گروه طراحی سایت یک می باشد</p>
      </footer>
  </section>
</template>

<script>
import axios from "axios";

export default {
  asyncData(context) {
    const therapists = axios.get(`${process.env.UrlApi}/api/therapists`);
    return axios
      .all([therapists])
      .then(
        axios.spread((...responses) => {
          const therapists = responses[0];
          return {
            therapists: therapists.data,
          };
        })
      )
      .catch((e) => {
        context.error(e);
      });
  },

  head() {
    return {
      title: "متخصصین مشاوره روانشناسی به صورت آنلاین تلفنی و حضوری",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "در این وب سایت مجموعه ای از مشاورین و متخصصین روانشناسی گرد هم آمده اند تا به شما کمک کنند",
        },
      ],
    };
  },

  data() {
    return {};
  },
};
</script>


<style scoped>

.content {
  min-height: 100vh;
}

.pageTitle {
  font-size: 22pt;
}
section {
  min-height: 100vh;
}
</style>
