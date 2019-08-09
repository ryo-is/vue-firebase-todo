import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import * as firebase from "firebase/app"

@Component({})
export default class SignUp extends Vue {
  public title: string = "firestore Read/Write App"
  public alertDisplay: boolean = false
  public errorMessage: string = ""
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

  public created(): void {
    this.$root.$children[0].$data.displaySignOut = false
  }

  // サインアップ処理
  public async submitSignUp(): Promise<void> {
    try {
      const user: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(this.mailAddress, this.password)
      console.log(user)
      router.push("/signin")
    } catch (err) {
      console.error(err)
      this.checkErrorCode(err.code)
      this.alertDisplay = true
    }
  }

  // エラーコードのチェック
  public checkErrorCode(code: string): void {
    switch (code) {
      default:
        this.errorMessage = "Email Already In Use"
        break
    }
  }

  // signinページへ遷移
  public linkSignin(): void {
    router.push("/signin")
  }
}
