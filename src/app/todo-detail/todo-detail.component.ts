import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

import { TodoService } from '../todo.service';
import { Todo } from 'src/models/todo';
import { Status } from 'src/models/todo';
import { Category } from 'src/models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new EventEmitter();

  todo?: Todo
  categories: Category[] = []
  editForm: FormGroup
  allStatusType = Object.values(Status);

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {
    this.editForm = new FormGroup({
      id:           new FormControl(), 
      title:        new FormControl('', Validators.required), 
      body:         new FormControl(''), 
      state:        new FormControl(), 
      category_id:  new FormControl(-1, Validators.min(1)),
    })
  }

  ngOnInit(): void {
    this.getTodo();
    this.todoService.getCategories()
      .pipe(takeUntil(this.onDestroy$),)
      .subscribe(categories =>{ 
        this.categories = categories;
      })
  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id)
      .pipe(takeUntil(this.onDestroy$),)
      .subscribe(todo => {
        this.todo = todo;
        this.editForm.patchValue(todo)
      })
      
  }

  save(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.editForm.value as Todo)
        .pipe(takeUntil(this.onDestroy$),)
        .subscribe(() => this.goBack());
    }
  }
  goBack(): void {
    this.location.back()
  }

  ngOnDestroy() {
    this.onDestroy$.emit()
  }
}
