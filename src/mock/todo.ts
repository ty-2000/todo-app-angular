
import { Todo } from "src/models/todo";

export const TODOS: Todo[] = [
  { category_id:1, id: 1, title:"Scalaの基礎", body:"Scalaの研修-Option", state:{code:0, name:"TODO"}, updatedAt:new Date(2020, 8, 21, 21, 10, 5), createdAt:new Date(2020, 8, 21, 21, 10, 5)}, 
  { category_id:3, id: 2, title:"DBとの接続", body:"DBから情報を取得", state:{code:1, name:"DONE"}, updatedAt:new Date(2021, 8, 21, 21, 10, 5), createdAt:new Date(2021, 8, 21, 21, 10, 5)}, 
  { category_id:2, id: 3, title:"ビューを作る", body:"フォームの作成", state:{code:2, name:"進行中"}, updatedAt:new Date(2022, 8, 21, 21, 10, 5), createdAt:new Date(2022, 8, 21, 21, 10, 5)}, 
]
