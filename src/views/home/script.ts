import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import { TaskType } from "@/types"
import firebase from "firebase"
import fireStore from "@/firebase/firestore_init"

const store: firebase.firestore.CollectionReference = fireStore.collection("tasks")

@Component({})
export default class Home extends Vue {
  public title: string = "TODO Tasks"
  public newTask: string = ""
  public tasks: TaskType[] = []

  get remainingTasks(): number {
    return this.tasks.length - this.completedTasks
  }

  get completedTasks(): number {
    return this.tasks.filter((task: TaskType) => task.done).length
  }

  get progress(): number {
    return this.completedTasks / this.tasks.length * 100
  }

  public async created(): Promise<void> {
    this.setSnapshot()
  }

  // タスク変更をsubcribeする
  public setSnapshot(): void {
    store.onSnapshot((data: firebase.firestore.QuerySnapshot) => {
      data.docChanges().forEach((docChange: firebase.firestore.DocumentChange) => {
        if (docChange.oldIndex === -1) {
          this.tasks.push({
            id: docChange.doc.id,
            text: docChange.doc.data().text,
            done: docChange.doc.data().done
          })
        } else {
          console.log(docChange)
          this.tasks[docChange.oldIndex].done = docChange.doc.data().done
        }
      })
    })
  }

  // タスク作成
  public async createTask(): Promise<void> {
    try {
      await store.add({
        text: this.newTask,
        done: false
      })
      this.newTask = ""
      console.log("success!!!")
    } catch (err) {
      console.error(err)
    }
  }

  // タスク更新
  public async updateTask(task: any): Promise<void> {
    try {
      await store.doc(task.id).update({
        done: task.done
      })
      console.log("success!!!")
    } catch (err) {
      console.error(err)
    }
  }

  // サインアウト処理
  public async signOut(): Promise<void> {
    try {
      await firebase.auth().signOut()
      router.push("/signin")
    } catch (err) {
      console.error(err)
    }
  }
}
