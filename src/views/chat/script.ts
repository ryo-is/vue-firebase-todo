import { Component, Vue } from "vue-property-decorator"
import store from "@/store"
import * as firebase from "firebase/app"
import dayjs from "dayjs"
import { MessageType } from "@/types"
import MessagesModel from "@/models/messages_model"

const messagesModel: MessagesModel = new MessagesModel()

@Component({})
export default class Chat extends Vue {
  public title: string = "Chat App"
  public chatModal: boolean = false
  public messageType: string = "create"
  public createMessageText: string = ""
  public editMessageText: string = ""
  public editMessageData: MessageType = null
  public messages: MessageType[] = []

  public mounted(): void {
    this.$root.$children[0].$data.displaySignOut = true
    this.setSnapshot()
  }

  // メッセージタイプを変更
  public changeMessageType(messageType: string): void {
    this.messageType = messageType
    this.chatModal = true
  }

  // 編集モードでchatModalを表示
  public editMessage(message: MessageType): void {
    this.editMessageData = message
    this.changeMessageType("update")
  }

  // メッセージの監視
  public setSnapshot(): void {
    messagesModel.firestoreDB.onSnapshot(() => {
      this.getMessages()
    })
  }

  // メッセージの取得
  public async getMessages(): Promise<void> {
    const messagesData: firebase.firestore.QuerySnapshot
      = await messagesModel.getWithOrderBy("create_time", "desc", 20)
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
      await messagesModel.addMessages({
        display_name: (store.state.displayName === "") ? "No User" : store.state.displayName,
        text: this.createMessageText,
        create_time: dayjs().format("YYYY/MM/DD HH:mm:ss")
      })
      console.log("create success!!!")
      this.createMessageText = ""
      this.chatModal = false
    } catch (err) {
      console.error(err)
    }
  }

  // メッセージ編集
  public async updateMessage(): Promise<void> {
    try {
      await messagesModel.updateMessage(this.editMessageData.id, {
        text: this.editMessageData.text
      })
      console.log("update success!!!")
      this.chatModal = false
    } catch (err) {
      console.error(err)
    }
  }

  // メッセージ削除
  public async deleteMessage(message: MessageType): Promise<void> {
    try {
      await messagesModel.delete(message.id)
      console.log("delete success!!!")
    } catch (err) {
      console.error(err)
    }
  }
}
