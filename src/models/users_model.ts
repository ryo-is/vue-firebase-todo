import AbstructModel from "./abstract"
import { SetUserType } from "@/types"

export default class UsersModel extends AbstructModel {
  constructor() {
    super("users")
  }

  // ユーザー登録
  public async setUser(data: SetUserType): Promise<void> {
    await this.set<SetUserType>(data)
  }
}
