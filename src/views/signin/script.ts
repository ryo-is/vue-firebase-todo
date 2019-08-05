import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"

@Component({})
export default class SignIn extends Vue {
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

  // signin処理
  public async submitSignIn(): Promise<void> {
    console.log(this.mailAddress)
  }

  // signupへ遷移
  public linkSignup(): void {
    router.push("/signup")
  }
}
