import AbstractModel from "./abstract"
import { AddMessageType, UpdateMessageType } from "@/types"

export default class MessagesModel extends AbstractModel {
  constructor() {
    super("messages")
  }

  // メッセージ作成
  public async addMessages(data: AddMessageType): Promise<void> {
    await this.add<AddMessageType>(data)
  }

  // メッセージ更新
  public async updateMessage(documentPath: string, data: UpdateMessageType): Promise<void> {
    await this.update<UpdateMessageType>(documentPath, data)
  }
}
