import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  imports: [
    NgClass,
    FormsModule
  ],
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();

  constructor(private todoService: TodoService) {}

  deleteTodo(): void {
      this.todoService.deleteTodo(this.todo.id);
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }
}
