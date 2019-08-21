import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import * as firebase from "firebase/app"
import "firebase/auth"

@Component({})
export default class SignIn extends Vue {
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

  // signin処理
  public async submitSignIn(provider: "default" | "google" = "default"): Promise<void> {
    try {
      switch (provider) {
        case "google":
          await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
          break
        default:
          await firebase.auth().signInWithEmailAndPassword(this.mailAddress, this.password)
          break
      }
      router.push("/")
    } catch (err) {
      console.error(err)
      this.checkErrorCode(err.code)
      this.alertDisplay = true
    }
  }

  // エラーコードのチェック
  public checkErrorCode(code: string): void {
    switch (code) {
      case "auth/wrong-password":
        this.errorMessage = "Wrong Password"
        break
      default:
        this.errorMessage = "User Not Found"
        break
    }
  }

  // signupへ遷移
  public linkSignup(): void {
    router.push("/signup")
  }
}
