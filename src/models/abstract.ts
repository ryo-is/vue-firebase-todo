import * as firebase from "firebase/app"
import fireStore from "@/firebase/firestore_init"

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
    return this.firestoreDB.orderBy(fieldPath, directionStr).limit(limit).get()
  }
}
