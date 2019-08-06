import { Component, Vue } from "vue-property-decorator"
import router from "@/router"
import firebase from "firebase"
import fireStore from "@/firebase/firestore_init"
import { TaskType } from "@/types"

@Component({})
export default class Home extends Vue {
  public title: string = "firestore Read/Write App"
  public newTask: string = ""
  public tasks: TaskType[] = [
    { text: "hoge", done: false },
    { text: "foobar", done: false }
  ]

  get remainingTasks(): number {
    return this.tasks.length - this.completedTasks
  }

  get progress(): number {
    return this.completedTasks / this.tasks.length * 100
  }

  get completedTasks(): number {
    return this.tasks.filter((task: TaskType) => task.done).length
  }

  public async createTask(): Promise<void> {
    this.tasks.push({
      text: this.newTask,
      done: false
    })
    this.newTask = ""
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
