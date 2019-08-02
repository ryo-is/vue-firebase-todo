import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import ja from "vuetify/src/locale/ja"

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "md" || "mdi",
  },
  theme: {
    // dark: true
  },
  lang: {
    locales: { ja },
    current: "ja"
  }
});
