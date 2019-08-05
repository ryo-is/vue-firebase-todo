import Vue from "vue"
import vuetify from "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"
import firebase from "firebase"

Vue.config.productionTip = false

// 認証確認
router.beforeEach((to, from, next) => {
  if (to.matched.some((record: any) => record.meta.requiredAuth)) {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        console.log("authorized")
        next()
      } else {
        console.log("not authorized")
        next({
          path: "signin",
          query: {
            redirect: to.fullPath
          }
        })
      }
    })
  }
  next()
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
