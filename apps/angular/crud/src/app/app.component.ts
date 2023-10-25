import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './models';
import { TodoService } from './todo.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [TodoService],
  selector: 'app-root',
  template: `
    <p *ngIf="(todolistErrors$ | async)?.length" :[style.color]="'red'">
      {{ todolistErrors$ | async }}
    </p>
    <mat-spinner *ngIf="todolistLoader$ | async"></mat-spinner>
    <div *ngFor="let todo of todolist$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todoService = inject(TodoService);
  todolist$: BehaviorSubject<Todo[]> = this.todoService.todolist$;
  todolistLoader$: BehaviorSubject<boolean> = this.todoService.todolistLoader$;
  todolistErrors$: BehaviorSubject<string> = this.todoService.todolistErrors$;

  ngOnInit(): void {
    this.todoService.getAllTodos();
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  delete(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
