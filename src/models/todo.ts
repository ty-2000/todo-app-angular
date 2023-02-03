// TODO: Statusの値はバックエンドと整合するかを確認
//       時間があれば自動で同期する機能を実装
export const Status = {
  TODO: {code:0, name:"TODO"}, 
  IN_PROGRESS: {code: 1, name:"進行中"}, 
  DONE: {code: 2, name:"DONE"}
} as const

type Status = typeof Status[keyof typeof Status];

export interface Todo {
  category_id: number;
  id:        number;
  title:      string;
  body:       string;
  state:      Status;
  updatedAt: Date;
  createdAt: Date
}
