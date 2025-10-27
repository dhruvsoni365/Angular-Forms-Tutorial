import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-manager',
  templateUrl: './todo-manager.component.html',
  styleUrls: ['./todo-manager.component.css']
})
export class TodoManagerComponent implements OnInit, OnDestroy {
  todoForm: FormGroup;
  todos: Todo[] = [];
  editingTodo: Todo | null = null;
  filterMode: 'all' | 'active' | 'completed' = 'all';
  private todosSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Subscribe to todos
    this.todosSubscription = this.todoService.getTodos().subscribe(
      todos => {
        this.todos = todos;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }

  // Getters for form controls
  get title() {
    return this.todoForm.get('title');
  }

  get description() {
    return this.todoForm.get('description');
  }

  // Get filtered todos based on filter mode
  get filteredTodos(): Todo[] {
    switch (this.filterMode) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  // Get counts for different categories
  get totalCount(): number {
    return this.todos.length;
  }

  get activeCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  // Add or update todo
  onSubmit(): void {
    if (this.todoForm.valid) {
      const { title, description } = this.todoForm.value;

      if (this.editingTodo) {
        // Update existing todo
        this.todoService.updateTodo(this.editingTodo.id, {
          title,
          description
        });
        this.editingTodo = null;
      } else {
        // Add new todo
        this.todoService.addTodo(title, description);
      }

      this.todoForm.reset();
    }
  }

  // Start editing a todo
  editTodo(todo: Todo): void {
    this.editingTodo = todo;
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description
    });
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingTodo = null;
    this.todoForm.reset();
  }

  // Toggle todo completion
  toggleComplete(id: number): void {
    this.todoService.toggleComplete(id);
  }

  // Delete a todo
  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id);
      if (this.editingTodo && this.editingTodo.id === id) {
        this.cancelEdit();
      }
    }
  }

  // Delete all completed todos
  deleteCompleted(): void {
    if (confirm('Are you sure you want to delete all completed todos?')) {
      const count = this.todoService.deleteCompleted();
      console.log(`Deleted ${count} completed todo(s)`);
    }
  }

  // Clear all todos
  clearAll(): void {
    if (confirm('Are you sure you want to delete ALL todos? This cannot be undone.')) {
      this.todoService.clearAll();
      this.cancelEdit();
    }
  }

  // Set filter mode
  setFilter(mode: 'all' | 'active' | 'completed'): void {
    this.filterMode = mode;
  }

  // Track by function for ngFor performance
  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }
}
