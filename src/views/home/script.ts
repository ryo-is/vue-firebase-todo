import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"

const store: firebase.firestore.Firestore = firebase.firestore()

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"
  public name: string = ""
  public age: number = 18
  public gender: string = ""
  public genderItems: string[] = ["male", "female", "other"]

  public async createUser(): Promise<void> {
    try {
      const result: firebase.firestore.DocumentReference = await store.collection("users").add({
        name: this.name,
        age: this.age,
        gender: this.gender
      })
      console.log(result)
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
