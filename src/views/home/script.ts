import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"
import store from "@/firebase/firestore_init"

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"
  public name: string = ""
  public age: number = 18
  public gender: string = ""
  public genderItems: string[] = ["male", "female", "other"]

  public tableHeaders: string[] = ["name", "age", "gender"]

  public async setUsers(): Promise<void> {
    try {
      await store.collection("users").doc(this.name).set({
        name: this.name,
        age: this.age,
        gender: this.gender
      })
      console.log("success!!!")
    } catch (err) {
      console.error(err)
    }
  }

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
