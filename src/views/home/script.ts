import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"
import fireStore from "@/firebase/firestore_init"

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"

  // サインアウト処理
  public async signOut(): Promise<void> {
    try {
      await firebase.auth().signOut()
      router.push("/signin")
    } catch (err) {
      console.error(err)
    }
  }
}
