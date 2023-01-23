import { Component, OnInit } from '@angular/core';

import { Todo } from 'src/models/todo';
import { Category } from 'src/models/category';
import { CATEGORIES } from 'src/mock/category';
import { TODOS } from 'src/mock/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList = TODOS
  categoryList = CATEGORIES

  todoWithCategories = this.todoList.map(todo => {
    return {
      todo: todo, 
      category: this.getCategory(todo.category_id)
    }
  })

  getCategory(id: number): Category {
    const category = this.categoryList.find(category => category.id == id)
    if (category == null) {
      throw new Error("Undefined category is inferred")
    } 
    return category
  }

  constructor() { }

  ngOnInit(): void {
  }
}
