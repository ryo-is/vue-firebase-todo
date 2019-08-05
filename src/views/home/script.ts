import { Component, Vue } from "vue-property-decorator"
import firebase from "firebase"

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"
}
