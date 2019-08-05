import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"
import fireStore from "@/firebase/firestore_init"
import { DataTableHeaderType, UserDataType } from "@/types"

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"
  public name: string = ""
  public age: number = 18
  public gender: string = ""
  public genderItems: string[] = ["male", "female", "other"]

  public tableHeaders: DataTableHeaderType[] = [
    { text: "name", value: "name"},
    { text: "age", value: "age" },
    { text: "gender", value: "gender", sortable: false }
  ]
  public userData: UserDataType[] = []

  public async created(): Promise<void> {
    await this.getUser()
  }

  public async getUser(): Promise<void> {
    this.userData = []
    const user: firebase.firestore.QuerySnapshot = await fireStore.collection("users").get()
    user.docs.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      console.log(doc.data())
      this.userData.push(doc.data() as UserDataType)
    })
  }

  public async setUsers(): Promise<void> {
    try {
      await fireStore.collection("users").doc(this.name).set({
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
