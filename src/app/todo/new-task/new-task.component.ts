import { Component } from '@angular/core';
import { TodoService } from '../../shared/services/todo.service';
import { Todo } from '../../shared/models/todo.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';

  constructor(private todoService: TodoService) { }

  addTask() {
    if (this.newTaskTitle.trim() !== '') {
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: this.newTaskTitle,
        completed: false
      };

      this.todoService.addTodo(newTodo);
      this.newTaskTitle = '';
    }
  }
}
