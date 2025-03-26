import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {NewTaskComponent} from './new-task/new-task.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [
    TodoItemComponent,
    NewTaskComponent,
    NgForOf
  ],
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  clearAll() {
    if (this.todos.length > 0) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }
}
