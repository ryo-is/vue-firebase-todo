import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"

@Component({})
export default class SignUp extends Vue {
  public title: string = "firestore Read/Write App"
  public mailAddress: string = ""
  public password: string = ""
  public valid: boolean = true
  public mailAddressRules: any[] = [
    (v: string): string | boolean => !!v || "メールアドレスは必須です",
    (v: string): string | boolean => v.match(/[^\s]@[^\s]/) !== null || "メールアドレスの形式になっていません"
  ]
  public passwordRules: any[] = [
    (v: any): string | boolean => !!v || "Password is required"
  ]

  // サインアップ処理
  public async submitSignUp(): Promise<void> {
    console.log(this.mailAddress)

    try {
      const user: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(this.mailAddress, this.password)
      console.log(user)
      router.push("/signin")
    } catch (err) {
      console.error(err)
    }
  }

  // signinページへ遷移
  public linkSignin(): void {
    router.push("/signin")
  }
}
