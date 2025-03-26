import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos!: Todo[];

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const todosJson = localStorage.getItem('todos');
    this.todos = todosJson ? JSON.parse(todosJson) : [
      { id: 1, title: 'Atividade 01 - Inteligência artificial', completed: true },
      { id: 2, title: 'Desenvolver Aplicação Simples com Angular 2', completed: true },
      { id: 3, title: 'Trabalho de Redes', completed: true },
      { id: 4, title: 'Atividade de Compiladores', completed: true },
      { id: 5, title: "Mereço nota 10!", completed: false }
    ];
    this.sortTodos();
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  private updateLocalStorageAndSave(): void {
    this.saveToLocalStorage();
  }

  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo);
    this.sortTodos();
    this.updateLocalStorageAndSave();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  getTodoNewId(): number {
    return this.todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  }

  sortTodos() {
    this.todos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  clearAll() {
    this.todos = [];
    this.updateLocalStorageAndSave();
  }
}
