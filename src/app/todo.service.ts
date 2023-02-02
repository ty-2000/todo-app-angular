import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from 'src/models/category';

import { Todo } from 'src/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient) { }

  private todosUrl = 'api/todos';
  private categoriesUrl = 'api/categories';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(todos => console.log('fetched todos')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(categories => console.log('fetched categories')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  addTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
      .pipe(
        tap((newTodo: Todo) => console.log(`added hero w/ id=${newTodo.id}`)),
        catchError(this.handleError<Todo>('addTodo'))
      )
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`
    return this.http.get<Todo>(url).pipe(
      tap(todo => console.log(`fetched todo id=${id},title=${todo.title},body=${todo.body},state={code=${todo.state.code},name=${todo.state.name}}`)), 
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    )
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${todo.id},title=${todo.title},body=${todo.body},state={code=${todo.state.code},name=${todo.state.name}}`)), 
      catchError(this.handleError<any>('updateTodo'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力
  
      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
