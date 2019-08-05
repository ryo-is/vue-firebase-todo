import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"

  public async signOut(): Promise<void> {
    try {
      await firebase.auth().signOut()
      router.push("/signin")
    } catch (err) {
      console.error(err)
    }
  }
}
