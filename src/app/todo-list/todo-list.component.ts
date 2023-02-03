import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';

import { Status, Todo } from 'src/models/todo';
import { Category } from 'src/models/category';
import { TodoService } from '../todo.service';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    title:        new FormControl('', Validators.required), 
    body:         new FormControl(''), 
    state:        new FormControl(Status.TODO), 
    category_id:  new FormControl(-1, Validators.min(1)),
  })

  getTodoList(): void {
    this.todoService.getTodos()
      .pipe(takeUntil(this.onDestroy$),)
      .subscribe(todos => 
        this.todoService.getCategories()
          .pipe(takeUntil(this.onDestroy$),)
          .subscribe(categories =>{ 
            this.categories = categories;
            this.todoList = todos.map(todo => {
              const category = categories.find(category => todo.category_id == category.id)
              if (category == null) { throw new Error('category is not defined')}
              return { todo: todo, category: category }
            });
          }
        )
      )
  }

  add(): void {
    this.todoService.addTodo(this.addForm.value as Todo)
      .pipe(takeUntil(this.onDestroy$), )
      .subscribe(todo => {
        const category = this.categories.find(category => todo.category_id == category.id)
        if (category == null) { throw new Error('category is not defined')}
        this.todoList.push({ todo: todo, category: category})
      })
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
