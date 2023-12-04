import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      RegisterErrRes: null,
      RegisterScuRes: null,
      VrCodeErrRes: null, 
      VrCodeSucRes: null, 
      LoginSucRes: null, 
      LoginErrRes: null, 
      TherapistErrRes: null, 
      TherapistSucres: null
    },
    mutations: {
      async Register(state, payload) {
        /* request config */
        var ReqConfig = {
          method: "post",
          url: `${process.env.UrlApi}/api/signup/`,
          headers: {
            "Content-Type": "application/json", 
          }, 
          data: {
            email: payload.email, 
            name: payload.name, 
            password: payload.password, 
            verification_code: payload.verification_code
          }
        };
        /* request section */
        await this.$axios(ReqConfig)
          .then((response) => {
             state.RegisterScuRes = response.data
             /* clear error response */
             state.RegisterErrRes = null
             /* push to profile user page */
               if(response.status == 201) {
                this.$router.push({
                 path: '/auth/login', 
                 query: {email : payload.email}
                })
              }
          })
          .catch((error) => {
            state.RegisterErrRes = error.response
            /* clear sucess response */
            state.RegisterScuRes = null
          });
      },
      async VrCode(state, payload) {
        /* request config */
        var ReqConfig = {
          method: "post",
          url: `${process.env.UrlApi}/api/mail/`,
          headers: {
            "Content-Type": "application/json", 
          }, 
          data: {
            email: payload.email, 
          }
        };
        /* request section */
        await this.$axios(ReqConfig)
          .then((response) => {
             state.VrCodeSucRes = response.data
             /* clear error res */
             state.VrCodeErrRes = null
             /* push to register page */
             if(response.status == 200) {
               this.$router.push({
                path: '/auth/register', 
                query: {email : payload.email}
               })
             /* clear register res */
             state.RegisterErrRes = null
             state.RegisterScuRes = null
             }
          })
          .catch((error) => {
            state.VrCodeErrRes = error.response
            /* clear success res */
            state.VrCodeSucRes = null
          });
      },
      /* Login */
      async Login(state, payload) {
        /* request config */
        var ReqConfig = {
          method: "post",
          url: `${process.env.UrlApi}/api/login/`,
          headers: {
            "Content-Type": "application/json", 
          }, 
          data: {
            email: payload.email, 
            password: payload.password, 
          }
        };
        /* request section */
        await this.$axios(ReqConfig)
          .then((response) => {
             state.LoginSucRes = response.data
             /* clear error response */
             state.LoginErrRes = null
              
             /* store token in cookie and push to user profile */
               if(response.status == 200) {

                /* remove old cookie */
                this.$cookiz.remove("jwt-token");
                /* set cookie */
                this.$cookiz.set("jwt-token", response.data.token, {maxAge: 60 * 60 * 24 * 30, path: '/' })

                /* push to profile */
                this.$router.push({
                 path: '/profile/user', 
                })

              }
          })
          .catch((error) => {
            state.LoginErrRes = error.response
            /* clear sucess response */
            state.LoginSucRes = null
          });
      },
      /* Therapist */
      async Therapist(state, payload) {
        /* request config */
        var ReqConfig = {
          method: "post",
          url: `${process.env.UrlApi}/api/therapists/`,
          headers: {
            Authorization: "Bearer " + payload.token,
            "Content-Type": "application/json", 
          }, 
          data: {
            treatment_fields: payload.treatment_fields,
            name: payload.name,
            education: payload.education, 
            phone_number: payload.phone_number, 
            description: payload.description, 
            price: payload.price, 
            work_experience: payload.work_experience 
          }
        };
        /* request section */
        await this.$axios(ReqConfig)
          .then((response) => {
             state.TherapistSucres = response.data
             /* clear error res */
             state.TherapistErrRes = null
          })
          .catch((error) => {
            state.TherapistErrRes = error.response
            /* clear success res */
            state.TherapistSucres = null
          });
      },
      
    },
    actions: {
      /* Register action */
      SetRegister({ commit }, payload) {
        commit("Register", payload)
      }, 
      /* VrCode Action */
      SetVrCode({ commit }, payload) {
        commit("VrCode", payload)
      },
      /* Login Action */
      SetLogin({ commit }, payload) {
        commit("Login", payload)
      },
      /* Therapist Action */
      SetTherapist({ commit }, payload) {
        commit("Therapist", payload)
      },
    },
    getters: {
      /* Dsp Register Response */
      DspRegisterErrRes(state) {
        return state.RegisterErrRes;
      },
      DspRegisterScuRes(state) {
        return state.RegisterScuRes;
      },
      /* Dsp VrCode Response */
      DspVrCodeSucRes(state) {
        return state.VrCodeSucRes;
      }, 
      DspVrCodeErrRes(state) {
        return state.VrCodeErrRes;
      },
      /* Dsp Login Response */
      DspLoginSucRes(state) {
        return state.LoginSucRes;
      }, 
      DspLoginErrRes(state) {
        return state.LoginErrRes;
      }, 
      /* Dsp Therapist response */
      DspTherapistSucres(state) {
        return state.TherapistSucres;
      }, 
      DspTherapistErrRes(state) {
        return state.TherapistErrRes;
      },
    }
  });
};

export default createStore;
