import Vue from "vue"
import Router from "vue-router"
import Home from "./views/home/Home.vue"
import SignIn from "./views/signin/Signin.vue"
import SignUp from "./views/signup/Signup.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
  ],
})
