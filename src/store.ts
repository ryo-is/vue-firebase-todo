import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userEmail: ""
  },
  mutations: {
    setUserEmail(state: any, email: string): void {
      state.userEmail = email
    }
  },
  actions: {

  },
});
