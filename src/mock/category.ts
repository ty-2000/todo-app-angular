
import { Category } from "src/models/category";

export const CATEGORIES: Category[] = [
  { id:1, name: "プログラミング", slug: "program", color:{code:0, name:"red"}, updatedAt:new Date(2020, 8, 21, 21, 10, 5), createdAt:new Date(2020, 8, 21, 21, 10, 5)}, 
  { id:2, name: "フロントエンド", slug: "front", color:{code:1, name:"blue"}, updatedAt:new Date(2021, 8, 21, 21, 10, 5), createdAt:new Date(2021, 8, 21, 21, 10, 5)}, 
  { id:3, name: "バックエンド", slug: "back", color:{code:2, name:"gleen"}, updatedAt:new Date(2022, 8, 21, 21, 10, 5), createdAt:new Date(2022, 8, 21, 21, 10, 5)}, 
]
