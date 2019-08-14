import * as firebase from "firebase/app"
import fireStore from "@/firebase/firestore_init"
import { AddMessageType, UpdateMessageType } from "@/types"

export default class AbstractModel {
  public firestoreDB: firebase.firestore.CollectionReference

  constructor(collectionPath: string) {
    this.firestoreDB = fireStore.collection(collectionPath)
  }

  // OrderByで昇順降順を指定して取得する
  public async getWithOrderBy(
    fieldPath: string,
    directionStr: firebase.firestore.OrderByDirection,
    limit: number
  ): Promise<firebase.firestore.QuerySnapshot> {
    return await this.firestoreDB.orderBy(fieldPath, directionStr).limit(limit).get()
  }

  // データを追加する
  public async add<T extends firebase.firestore.DocumentData | AddMessageType>(
    data: T
  ): Promise<void> {
    await this.firestoreDB.add(data)
  }

  // データを更新する
  public async update<T extends firebase.firestore.UpdateData | UpdateMessageType>(
    documentPath: string,
    data: T
  ): Promise<void> {
    await this.firestoreDB.doc(documentPath).update(data)
  }

  // データを削除する
  public async delete(
    documentPath: string
  ): Promise<void> {
    await this.firestoreDB.doc(documentPath).delete()
  }
}
