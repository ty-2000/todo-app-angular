import { Component, OnInit } from '@angular/core';

import { Todo } from 'src/models/todo';
import { Category } from 'src/models/category';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: { todo: Todo, category: Category }[] = []

  getTodoList(): void {
    this.todoService.getTodos().subscribe(todos => 
      this.todoService.getCategories().subscribe(categories => 
        this.todoList = todos.map(todo => {
          const category = categories.find(category => todo.category_id == category.id)
          if (category == null) { throw new Error('category is not defined')}
          return { todo: todo, category: category }
        })))
  }

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.getTodoList();
  }
}
