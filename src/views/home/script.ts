import { Component, Vue } from "vue-property-decorator"
import { TaskType } from "@/types"
import * as firebase from "firebase/app"
import TasksModel from "@/models/tasks_model"

const tasksModel: TasksModel = new TasksModel()

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

  public async mounted(): Promise<void> {
    this.$root.$children[0].$data.displaySignOut = true
    this.setSnapshot()
  }

  // タスク変更をsubcribeする
  public setSnapshot(): void {
    tasksModel.firestoreDB.onSnapshot((data: firebase.firestore.QuerySnapshot) => {
      data.docChanges().forEach((docChange: firebase.firestore.DocumentChange) => {
        switch (docChange.type) {
          case "added":
            this.tasks.splice(docChange.newIndex, 0, {
              id: docChange.doc.id,
              text: docChange.doc.data().text,
              done: docChange.doc.data().done
            })
            break
          case "modified":
            this.tasks[docChange.oldIndex].done = docChange.doc.data().done
            break
          default:
            this.tasks.splice(docChange.oldIndex, 1)
            break
        }
      })
    })
  }

  // タスクの取得
  public async getTasks(): Promise<void> {
    try {
      const taskData: firebase.firestore.QuerySnapshot = await tasksModel.getAll()
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
      await tasksModel.addTask({
        text: this.newTask,
        done: false
      })
      this.newTask = ""
      console.log("create success!!!")
    } catch (err) {
      console.error(err)
    }
  }

  // タスク更新
  public async updateTask(task: TaskType): Promise<void> {
    try {
      await tasksModel.updateTask(task.id, {
        　done: task.done
      })
      console.log("update success!!!")
    } catch (err) {
      console.error(err)
    }
  }

  // タスク削除
  public async deleteTask(task: TaskType): Promise<void> {
    try {
      await tasksModel.delete(task.id)
      console.log("delete success!!!")
    } catch (err) {
      console.error(err)
    }
  }
}
