import { Component, Vue } from "vue-property-decorator"
import * as firebase from "firebase/app"
import fireStore from "@/firebase/firestore_init"

const commentsDB: firebase.firestore.CollectionReference = fireStore.collection("comments")

@Component({})
export default class Chat extends Vue {
  public title: string = "Chat App"

  public created(): void {
    this.$root.$children[0].$data.displaySignOut = true
  }
}
