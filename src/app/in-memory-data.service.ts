import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo, Status } from 'src/models/todo';
import { Category } from 'src/models/category';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const todos = [
      { category_id:1, id: 1, title:"Scalaの基礎", body:"Scalaの研修-Option", state:Status.TODO, updatedAt:new Date(2020, 8, 21, 21, 10, 5), createdAt:new Date(2020, 8, 21, 21, 10, 5)}, 
      { category_id:3, id: 2, title:"DBとの接続", body:"DBから情報を取得", state:Status.IN_PROGRESS, updatedAt:new Date(2021, 8, 21, 21, 10, 5), createdAt:new Date(2021, 8, 21, 21, 10, 5)}, 
      { category_id:2, id: 3, title:"ビューを作る", body:"フォームの作成", state:Status.DONE, updatedAt:new Date(2022, 8, 21, 21, 10, 5), createdAt:new Date(2022, 8, 21, 21, 10, 5)}, 
    ];
    const categories = [
      { id:1, name: "プログラミング", slug: "program", color:{code:0, name:"red"}, updatedAt:new Date(2020, 8, 21, 21, 10, 5), createdAt:new Date(2020, 8, 21, 21, 10, 5)}, 
      { id:2, name: "フロントエンド", slug: "front", color:{code:1, name:"blue"}, updatedAt:new Date(2021, 8, 21, 21, 10, 5), createdAt:new Date(2021, 8, 21, 21, 10, 5)}, 
      { id:3, name: "バックエンド", slug: "back", color:{code:2, name:"gleen"}, updatedAt:new Date(2022, 8, 21, 21, 10, 5), createdAt:new Date(2022, 8, 21, 21, 10, 5)}, 
    ];
    return {todos, categories};
  }

  genId<T extends Todo | Category>(table: T[]): number {
    return table.length > 0 ? Math.max(...table.map(r => r.id)) + 1 : 1
  }
}