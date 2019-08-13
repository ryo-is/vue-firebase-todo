import { Component, Vue } from "vue-property-decorator"
import store from "@/store"
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

  // メッセージの監視
  public setSnapshot(): void {
    messagesDB.onSnapshot(() => {
      this.getMessages()
    })
  }

  // メッセージの取得
  public async getMessages(): Promise<void> {
    const messagesData: firebase.firestore.QuerySnapshot
      = await messagesDB.orderBy("create_time", "desc").limit(20).get()
    this.messages = []
    messagesData.docs.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      this.messages.push({
        id: doc.id,
        display_name: doc.data().display_name,
        text: doc.data().text,
        create_time: doc.data().create_time,
        disable_icon: store.state.displayName !== doc.data().display_name
      })
    })
  }

  // メッセージ作成
  public async sendMessage(): Promise<void> {
    try {
      await messagesDB.add({
        display_name: (store.state.displayName === "") ? "No User" : store.state.displayName,
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

  // メッセージ編集
  public async editMessage(message: MessageType): Promise<void> {
    console.log(message)
  }

  // メッセージ削除
  public async deleteMessage(message: MessageType): Promise<void> {
    try {
      await messagesDB.doc(message.id).delete()
      console.log("delete success!!!")
    } catch (err) {
      console.error(err)
    }
  }
}
