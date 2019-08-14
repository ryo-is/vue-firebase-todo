import AbstractModel from "./abstract"
import { AddTaskType, UpdateTaskType } from "@/types"

export default class TasksModel extends AbstractModel {
  constructor() {
    super("tasks")
  }

  // タスク追加
  public async addTask(data: AddTaskType): Promise<void> {
    await this.add<AddTaskType>(data)
  }

  // タスク更新
  public async updateTask(documentPath: string, data: UpdateTaskType): Promise<void> {
    await this.update<UpdateTaskType>(documentPath, data)
  }
}
