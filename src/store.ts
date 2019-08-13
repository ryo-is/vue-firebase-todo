import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    displayName: ""
  },
  mutations: {
    setDisplayName(state: any, displayName: string): void {
      state.displayName = displayName
    }
  },
  actions: {

  },
});
