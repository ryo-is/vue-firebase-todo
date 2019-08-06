import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"
import fireStore from "@/firebase/firestore_init"
import { TaskType } from "@/types"

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"
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
    await this.getTasks()
  }

  // タスク取得
  public async getTasks(): Promise<void> {
    try {
      this.tasks = []
      const taskData: firebase.firestore.QuerySnapshot = await fireStore.collection("tasks").get()
      taskData.docs.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
        this.tasks.push({
          id: doc.id,
          text: doc.data().text,
          done: doc.data().done
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  // タスク作成
  public async createTask(): Promise<void> {
    try {
      const addTask: firebase.firestore.DocumentReference = await fireStore.collection("tasks").add({
        text: this.newTask,
        done: false
      })
      console.log(addTask)
      this.tasks.push({
        id: addTask.id,
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
      await fireStore.collection("tasks").doc(task.id).update({
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
