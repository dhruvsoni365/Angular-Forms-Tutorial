// Todo List Application JavaScript

class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    bindEvents() {
        // Form submission
        document.getElementById('todo-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Bulk actions
        document.getElementById('clear-completed').addEventListener('click', () => {
            this.clearCompleted();
        });

        document.getElementById('toggle-all').addEventListener('click', () => {
            this.toggleAll();
        });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchTodos(e.target.value);
        });

        // Export/Import
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportTodos();
        });

        document.getElementById('import-btn').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });

        document.getElementById('import-file').addEventListener('change', (e) => {
            this.importTodos(e.target.files[0]);
        });

        // Modal events
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancel-edit').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.cancelInlineEdit();
            }
        });

        // Click outside modal to close
        document.getElementById('edit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'edit-modal') {
                this.closeModal();
            }
        });
    }

    addTodo() {
        const input = document.getElementById('todo-input');
        const priority = document.getElementById('priority-select').value;
        const dueDate = document.getElementById('due-date').value;
        
        const text = input.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: priority,
            dueDate: dueDate || null,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        this.updateStats();

        // Reset form
        input.value = '';
        document.getElementById('priority-select').value = 'medium';
        document.getElementById('due-date').value = '';
        input.focus();
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.completedAt = todo.completed ? new Date().toISOString() : null;
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }

    editTodo(id, newText, newPriority, newDueDate) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.text = newText.trim();
            todo.priority = newPriority;
            todo.dueDate = newDueDate || null;
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }

    startInlineEdit(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        const textElement = todoElement.querySelector('.todo-text');
        const currentText = textElement.textContent;
        
        textElement.innerHTML = `<input type="text" class="todo-text editing" value="${currentText}">`;
        const input = textElement.querySelector('input');
        input.focus();
        input.select();
        
        this.editingId = id;

        input.addEventListener('blur', () => {
            this.finishInlineEdit(id, input.value);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.finishInlineEdit(id, input.value);
            } else if (e.key === 'Escape') {
                this.cancelInlineEdit();
            }
        });
    }

    finishInlineEdit(id, newText) {
        if (newText.trim()) {
            const todo = this.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = newText.trim();
                todo.updatedAt = new Date().toISOString();
                this.saveTodos();
            }
        }
        this.editingId = null;
        this.render();
        this.updateStats();
    }

    cancelInlineEdit() {
        if (this.editingId) {
            this.editingId = null;
            this.render();
        }
    }

    openModal(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) return;

        document.getElementById('edit-input').value = todo.text;
        document.getElementById('edit-priority').value = todo.priority;
        document.getElementById('edit-due-date').value = todo.dueDate || '';
        document.getElementById('edit-modal').style.display = 'flex';
        document.getElementById('edit-modal').dataset.editId = id;
        document.getElementById('edit-input').focus();
    }

    closeModal() {
        document.getElementById('edit-modal').style.display = 'none';
        document.getElementById('edit-modal').removeAttribute('data-edit-id');
    }

    saveEdit() {
        const id = parseInt(document.getElementById('edit-modal').dataset.editId);
        const newText = document.getElementById('edit-input').value;
        const newPriority = document.getElementById('edit-priority').value;
        const newDueDate = document.getElementById('edit-due-date').value;
        
        if (newText.trim()) {
            this.editTodo(id, newText, newPriority, newDueDate);
        }
        this.closeModal();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    clearCompleted() {
        const completedCount = this.todos.filter(todo => todo.completed).length;
        if (completedCount > 0 && confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }

    toggleAll() {
        const allCompleted = this.todos.every(todo => todo.completed);
        this.todos.forEach(todo => {
            todo.completed = !allCompleted;
            todo.completedAt = todo.completed ? new Date().toISOString() : null;
        });
        this.saveTodos();
        this.render();
        this.updateStats();
    }

    searchTodos(query) {
        const filteredTodos = query.trim() 
            ? this.todos.filter(todo => 
                todo.text.toLowerCase().includes(query.toLowerCase())
              )
            : this.todos;
        
        this.renderTodos(filteredTodos);
    }

    exportTodos() {
        const dataStr = JSON.stringify({
            todos: this.todos,
            exportDate: new Date().toISOString(),
            version: '1.0'
        }, null, 2);
        
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `todos-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importTodos(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.todos && Array.isArray(data.todos)) {
                    const confirmed = confirm(`Import ${data.todos.length} todos? This will replace your current todos.`);
                    if (confirmed) {
                        this.todos = data.todos;
                        this.saveTodos();
                        this.render();
                        this.updateStats();
                        alert('Todos imported successfully!');
                    }
                } else {
                    alert('Invalid file format');
                }
            } catch (error) {
                alert('Error reading file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    getFilteredTodos() {
        let filtered = [...this.todos];
        
        switch (this.currentFilter) {
            case 'active':
                filtered = filtered.filter(todo => !todo.completed);
                break;
            case 'completed':
                filtered = filtered.filter(todo => todo.completed);
                break;
            default:
                break;
        }
        
        return filtered;
    }

    renderTodos(todosToRender = null) {
        const todos = todosToRender || this.getFilteredTodos();
        const todoList = document.getElementById('todo-list');
        
        if (todos.length === 0) {
            todoList.innerHTML = `
                <li class="empty-state">
                    <h3>${this.currentFilter === 'all' ? 'No tasks yet' : `No ${this.currentFilter} tasks`}</h3>
                    <p>${this.currentFilter === 'all' ? 'Add a task to get started!' : `Switch to "All" to see other tasks.`}</p>
                </li>
            `;
            return;
        }
        
        todoList.innerHTML = todos.map(todo => this.renderTodoItem(todo)).join('');
        
        // Bind events for each todo item
        todos.forEach(todo => {
            const element = document.querySelector(`[data-id="${todo.id}"]`);
            
            // Checkbox toggle
            element.querySelector('.todo-checkbox').addEventListener('change', () => {
                this.toggleTodo(todo.id);
            });
            
            // Delete button
            element.querySelector('.delete-btn').addEventListener('click', () => {
                this.deleteTodo(todo.id);
            });
            
            // Edit button (mobile)
            element.querySelector('.edit-btn').addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.openModal(todo.id);
                } else {
                    this.startInlineEdit(todo.id);
                }
            });
            
            // Double-click to edit (desktop)
            element.querySelector('.todo-text').addEventListener('dblclick', () => {
                if (window.innerWidth > 768) {
                    this.startInlineEdit(todo.id);
                }
            });
        });
    }

    renderTodoItem(todo) {
        const now = new Date();
        const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
        const isOverdue = dueDate && dueDate < now && !todo.completed;
        
        const dueDateDisplay = dueDate ? 
            `<span class="due-date ${isOverdue ? 'overdue' : ''}">
                📅 ${dueDate.toLocaleDateString()}
                ${isOverdue ? '(Overdue)' : ''}
            </span>` : '';
        
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        <span class="priority-badge priority-${todo.priority}">${todo.priority} priority</span>
                        ${dueDateDisplay}
                        <span class="created-date">Created ${new Date(todo.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="btn-small edit-btn" title="Edit task">✏️</button>
                    <button class="btn-small delete-btn" title="Delete task">🗑️</button>
                </div>
            </li>
        `;
    }

    render() {
        this.renderTodos();
    }

    updateStats() {
        const activeCount = this.todos.filter(todo => !todo.completed).length;
        const totalCount = this.todos.length;
        const completedCount = totalCount - activeCount;
        
        const statsText = activeCount === 0 && totalCount > 0 
            ? `All ${totalCount} tasks completed! 🎉`
            : activeCount === 1 
                ? '1 task remaining'
                : `${activeCount} tasks remaining`;
        
        document.getElementById('todo-count').textContent = statsText;
        
        // Update button states
        document.getElementById('clear-completed').disabled = completedCount === 0;
        document.getElementById('toggle-all').disabled = totalCount === 0;
    }

    // Utility methods
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            return [];
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
