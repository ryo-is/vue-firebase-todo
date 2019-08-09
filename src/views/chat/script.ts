import { Component, Vue } from "vue-property-decorator"
import * as firebase from "firebase/app"
import fireStore from "@/firebase/firestore_init"
import dayjs from "dayjs"
import { MessageType } from "@/types"

const messagesDB: firebase.firestore.CollectionReference = fireStore.collection("messages")

@Component({})
export default class Chat extends Vue {
  public title: string = "Chat App"
  public chatModal: boolean = false
  public newMessage: string = ""
  public messages: MessageType[] = []

  public created(): void {
    this.$root.$children[0].$data.displaySignOut = true
    this.setSnapshot()
  }

  public setSnapshot(): void {
    messagesDB.onSnapshot((data: firebase.firestore.QuerySnapshot) => {
      data.docChanges().forEach((docChange: firebase.firestore.DocumentChange) => {
        switch (docChange.type) {
          case "added":
            this.messages.splice(docChange.newIndex, 0, {
              id: docChange.doc.id,
              text: docChange.doc.data().text,
              create_time: docChange.doc.data().create_time
            })
            break
          case "modified":
            this.messages[docChange.oldIndex].text = docChange.doc.data().message
            break
          default:
            this.messages.slice(docChange.oldIndex, 1)
            break
        }
      })
    })
  }

  // メッセージ作成
  public async sendMessage(): Promise<void> {
    try {
      await messagesDB.add({
        text: this.newMessage,
        create_time: dayjs().format("YYYY/MM/DD HH:mm:ss")
      })
      console.log("create success!!!")
      this.chatModal = false
    } catch (err) {
      console.error(err)
    }
  }
}
