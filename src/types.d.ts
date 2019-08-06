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
  text: string
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
