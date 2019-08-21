import { Component, Vue } from "vue-property-decorator"
import * as firebase from "firebase/app"
import { DataTableHeaderType, UserDataType } from "@/types"
import UsersModel from "@/models/users_model"

const usersModel: UsersModel = new UsersModel()

@Component({})
export default class Users extends Vue {
  public title: string = "firestore Read/Write App"
  public buttonText: string = "Create"
  public name: string = ""
  public age: number = 18
  public gender: "male" | "female" | "other" = "male"
  public genderItems: string[] = ["male", "female", "other"]
  public tableHeaders: DataTableHeaderType[] = [
    { text: "name", value: "name"},
    { text: "age", value: "age" },
    { text: "gender", value: "gender", sortable: false }
  ]
  public userData: UserDataType[] = []

  public async mounted(): Promise<void> {
    this.$root.$children[0].$data.displaySignOut = true
    await this.getUser()
  }

  // ユーザー全件取得
  public async getUser(): Promise<void> {
    try {
      this.userData = []
      const user: firebase.firestore.QuerySnapshot = await usersModel.getAll()
      user.docs.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
        this.userData.push(doc.data() as UserDataType)
      })
    } catch (err) {
      console.error(err)
    }
  }

  // ユーザー作成 / 更新
  public async setUsers(): Promise<void> {
    try {
      await usersModel.setUser({
        name: this.name,
        age: this.age,
        gender: this.gender
      })
      this.inputInit()
      this.getUser()
      console.log("success!!!")
    } catch (err) {
      console.error(err)
    }
  }

  // 各項目の初期化
  public inputInit(): void {
    this.name = ""
    this.age = 18
    this.gender = "male"
    this.buttonText = "Create"
  }

  // テーブル行をクリックしたとき
  public clickRow(item: UserDataType): void {
    this.name = item.name
    this.age = item.age
    this.gender = item.gender
    this.buttonText = "Update"
  }
}
