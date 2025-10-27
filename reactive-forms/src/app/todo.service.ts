import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private nextId: number = 1;

  constructor() {
    // Load todos from localStorage if available
    this.loadTodosFromLocalStorage();
  }

  // Get all todos as observable
  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  // Get all todos as array
  getTodosArray(): Todo[] {
    return this.todos;
  }

  // Get todo by id
  getTodoById(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  // Add new todo
  addTodo(title: string, description: string): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.push(newTodo);
    this.updateTodos();
    return newTodo;
  }

  // Update existing todo
  updateTodo(id: number, updates: Partial<Todo>): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = {
        ...this.todos[index],
        ...updates,
        id: this.todos[index].id, // Preserve id
        createdAt: this.todos[index].createdAt, // Preserve creation date
        updatedAt: new Date()
      };
      this.updateTodos();
      return true;
    }
    return false;
  }

  // Toggle todo completion status
  toggleComplete(id: number): boolean {
    const todo = this.getTodoById(id);
    if (todo) {
      return this.updateTodo(id, { completed: !todo.completed });
    }
    return false;
  }

  // Delete todo
  deleteTodo(id: number): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.updateTodos();
      return true;
    }
    return false;
  }

  // Delete all completed todos
  deleteCompleted(): number {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => !todo.completed);
    this.updateTodos();
    return initialLength - this.todos.length;
  }

  // Clear all todos
  clearAll(): void {
    this.todos = [];
    this.updateTodos();
  }

  // Private method to update BehaviorSubject and localStorage
  private updateTodos(): void {
    this.todosSubject.next(this.todos);
    this.saveTodosToLocalStorage();
  }

  // Save todos to localStorage
  private saveTodosToLocalStorage(): void {
    try {
      localStorage.setItem('todos', JSON.stringify(this.todos));
      localStorage.setItem('nextId', this.nextId.toString());
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  // Load todos from localStorage
  private loadTodosFromLocalStorage(): void {
    try {
      const savedTodos = localStorage.getItem('todos');
      const savedNextId = localStorage.getItem('nextId');

      if (savedTodos) {
        this.todos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
        this.todosSubject.next(this.todos);
      }

      if (savedNextId) {
        this.nextId = parseInt(savedNextId, 10);
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
  }
}
