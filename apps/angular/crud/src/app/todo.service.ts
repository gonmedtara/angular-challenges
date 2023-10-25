import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Todo } from './models';
import { BehaviorSubject } from 'rxjs';
import { randText } from '@ngneat/falso';

@Injectable()
export class TodoService {
  constructor(private httpClient: HttpClient) {}
  todolist$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todolistLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  todolistErrors$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getAllTodos() {
    this.todolistLoader$.next(true);
    this.httpClient
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (todos: Todo[]) => {
          this.todolist$.next(todos);
          this.todolistLoader$.next(false);
          this.todolistErrors$.next('');
        },
        error: (err: HttpErrorResponse) => {
          this.todolistErrors$.next(err.message);
          this.todolistLoader$.next(false);
        },
      });
  }
  updateTodo(todo: Todo) {
    this.todolistLoader$.next(true);
    this.httpClient
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo?.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe({
        next: (todoUpdated: Todo) => {
          this.todolistLoader$.next(false);
          this.todolistErrors$.next('');
          this.todolist$.next([
            ...this.todolist$.value.filter(
              (_todo: Todo) => _todo.id !== todoUpdated.id
            ),
            todoUpdated,
          ]);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.todolistErrors$.next(err.message);
          this.todolistLoader$.next(false);
        },
      });
  }

  deleteTodo(todo: Todo) {
    this.todolistLoader$.next(true);
    this.httpClient
      .delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe({
        next: () => {
          this.todolist$.next([
            ...this.todolist$.value.filter(
              (_todo: Todo) => _todo.id !== todo.id
            ),
          ]);
          this.todolistLoader$.next(false);
          this.todolistErrors$.next('');
        },
        error: (err: HttpErrorResponse) => {
          this.todolistErrors$.next(err.message);
          this.todolistLoader$.next(false);
        },
      });
  }
}
