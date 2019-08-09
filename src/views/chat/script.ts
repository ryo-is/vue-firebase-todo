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
    messagesDB.onSnapshot(() => {
      this.getMessages()
    })
  }

  public async getMessages(): Promise<void> {
    const messagesData: firebase.firestore.QuerySnapshot = await messagesDB.orderBy("create_time", "desc").get()
    if (this.messages.length === 0) {
      messagesData.docs.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
        this.messages.push({
          id: doc.id,
          text: doc.data().text,
          create_time: doc.data().create_time
        })
      })
    } else {
      const doc: firebase.firestore.QueryDocumentSnapshot = messagesData.docs[0]
      this.messages.unshift({
        id: doc.id,
        text: doc.data().text,
        create_time: doc.data().create_time
      })
    }
  }

  // メッセージ作成
  public async sendMessage(): Promise<void> {
    try {
      await messagesDB.add({
        text: this.newMessage,
        create_time: dayjs().format("YYYY/MM/DD HH:mm:ss")
      })
      console.log("create success!!!")
      this.newMessage = ""
      this.chatModal = false
    } catch (err) {
      console.error(err)
    }
  }
}
