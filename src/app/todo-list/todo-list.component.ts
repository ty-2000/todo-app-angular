import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';

import { Todo } from 'src/models/todo';
import { Category } from 'src/models/category';
import { TodoService } from '../todo.service';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new EventEmitter();

  todoList: { todo: Todo, category: Category }[] = []
  categories: Category[] = []
  addForm = new FormGroup({
    title:        new FormControl(''), 
    body:         new FormControl(''), 
    state:        new FormControl(Status.TODO), 
    category_id:  new FormControl(),
  })

  getTodoList(): void {
    this.todoService.getTodos()
      .pipe(takeUntil(this.onDestroy$),)
      .subscribe(todos => 
        this.todoService.getCategories()
          .pipe(takeUntil(this.onDestroy$),)
          .subscribe(categories => 
            this.todoList = todos.map(todo => {
              const category = categories.find(category => todo.category_id == category.id)
              if (category == null) { throw new Error('category is not defined')}
              return { todo: todo, category: category }
            })))
  }

  ngOnDestroy() {
    this.onDestroy$.emit()
  }

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.getTodoList();
  }
}
