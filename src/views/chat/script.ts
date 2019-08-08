import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"
import fireStore from "@/firebase/firestore_init"

const commentsDB: firebase.firestore.CollectionReference = fireStore.collection("comments")

@Component({})
export default class Chat extends Vue {
  public title: string = "Chat App"

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
