export type FirebaseConfigType = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export type TaskType = {
  id: string
  text: string
  done: boolean
}

export type AddTaskType = {
  text: string
  done: boolean
}

export type UpdateTaskType = {
  done: boolean
}

export type DataTableHeaderType = {
  text: string
  value: string
  align?: string
  sortable?: boolean
}

export type UserDataType = {
  name: string
  age: number
  gender: "male" | "female" | "other"
}

export type MessageType = {
  id: string
  display_name: string
  text: string
  create_time: string
  disable_icon?: boolean
}

export type AddMessageType = {
  display_name: string
  text: string
  create_time: string
}

export type UpdateMessageType = {
  text: string
}

export type SetUserType = UserDataType
