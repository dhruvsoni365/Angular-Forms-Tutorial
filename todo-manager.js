// Todo Manager - CRUD Operations with localStorage
class TodoManager {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingTodoId = null;
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.attachEventListeners();
        this.render();
    }

    cacheDOMElements() {
        // Form elements
        this.todoForm = document.getElementById('todoForm');
        this.todoTitle = document.getElementById('todoTitle');
        this.todoDescription = document.getElementById('todoDescription');
        
        // List elements
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.todoCount = document.getElementById('todoCount');
        
        // Filter elements
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.editForm = document.getElementById('editForm');
        this.editTitle = document.getElementById('editTitle');
        this.editDescription = document.getElementById('editDescription');
        this.closeModal = document.getElementById('closeModal');
        this.cancelEdit = document.getElementById('cancelEdit');
        
        // Footer elements
        this.clearCompleted = document.getElementById('clearCompleted');
        this.footerActions = document.getElementById('footerActions');
    }

    attachEventListeners() {
        // Add todo form
        this.todoForm.addEventListener('submit', (e) => this.handleAddTodo(e));
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });
        
        // Edit modal
        this.editForm.addEventListener('submit', (e) => this.handleEditSubmit(e));
        this.closeModal.addEventListener('click', () => this.closeEditModal());
        this.cancelEdit.addEventListener('click', () => this.closeEditModal());
        
        // Clear completed
        this.clearCompleted.addEventListener('click', () => this.handleClearCompleted());
        
        // Close modal on outside click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });
    }

    // CREATE - Add new todo
    handleAddTodo(e) {
        e.preventDefault();
        
        const title = this.todoTitle.value.trim();
        const description = this.todoDescription.value.trim();
        
        if (!title) return;
        
        const newTodo = {
            id: Date.now().toString(),
            title: title,
            description: description,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(newTodo);
        this.saveTodos();
        this.render();
        
        // Reset form
        this.todoForm.reset();
        this.todoTitle.focus();
    }

    // READ - Get filtered todos
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    // UPDATE - Toggle todo completion
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    // UPDATE - Open edit modal
    openEditModal(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;
        
        this.editingTodoId = id;
        this.editTitle.value = todo.title;
        this.editDescription.value = todo.description || '';
        this.editModal.classList.add('active');
        this.editTitle.focus();
    }

    // UPDATE - Submit edit
    handleEditSubmit(e) {
        e.preventDefault();
        
        const title = this.editTitle.value.trim();
        const description = this.editDescription.value.trim();
        
        if (!title || !this.editingTodoId) return;
        
        const todo = this.todos.find(t => t.id === this.editingTodoId);
        if (todo) {
            todo.title = title;
            todo.description = description;
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
        }
        
        this.closeEditModal();
    }

    // Close edit modal
    closeEditModal() {
        this.editModal.classList.remove('active');
        this.editingTodoId = null;
        this.editForm.reset();
    }

    // DELETE - Remove todo
    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this todo?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.render();
        }
    }

    // DELETE - Clear all completed todos
    handleClearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) return;
        
        if (confirm(`Are you sure you want to delete ${completedCount} completed todo(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    // Filter change handler
    handleFilterChange(e) {
        const filter = e.target.dataset.filter;
        this.currentFilter = filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.render();
    }

    // Render todos
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        // Update count
        const activeCount = this.todos.filter(t => !t.completed).length;
        this.todoCount.textContent = `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'}`;
        
        // Show/hide clear completed button
        const completedCount = this.todos.filter(t => t.completed).length;
        this.footerActions.style.display = completedCount > 0 ? 'block' : 'none';
        
        // Show empty state if no todos
        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '';
            this.emptyState.classList.remove('hidden');
            
            // Update empty state message based on filter
            const emptyMessages = {
                all: 'No todos yet',
                active: 'No active todos',
                completed: 'No completed todos'
            };
            this.emptyState.querySelector('h3').textContent = emptyMessages[this.currentFilter];
            return;
        }
        
        this.emptyState.classList.add('hidden');
        
        // Render todo items
        this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
        
        // Attach event listeners to todo items
        this.attachTodoEventListeners();
    }

    // Create HTML for a single todo
    createTodoHTML(todo) {
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-header">
                    <div class="checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            class="todo-checkbox" 
                            ${todo.completed ? 'checked' : ''}
                            data-id="${todo.id}"
                        >
                    </div>
                    <div class="todo-content">
                        <div class="todo-title">${this.escapeHTML(todo.title)}</div>
                        ${todo.description ? `<div class="todo-description">${this.escapeHTML(todo.description)}</div>` : ''}
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" data-id="${todo.id}">
                        ✏️ Edit
                    </button>
                    <button class="action-btn delete-btn" data-id="${todo.id}">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }

    // Attach event listeners to todo items
    attachTodoEventListeners() {
        // Checkboxes
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTodo(e.target.dataset.id);
            });
        });
        
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.openEditModal(e.target.dataset.id);
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteTodo(e.target.dataset.id);
            });
        });
    }

    // Escape HTML to prevent XSS
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // LocalStorage operations
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoManager();
});
