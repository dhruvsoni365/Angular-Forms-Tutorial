// User Details Management System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('userForm');
    const submitBtn = document.getElementById('submitBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const tableBody = document.getElementById('tableBody');
    const totalUsersSpan = document.getElementById('totalUsers');
    const notification = document.getElementById('notification');
    
    // Form inputs
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const ageInput = document.getElementById('age');
    const genderInputs = document.getElementsByName('gender');
    const addressInput = document.getElementById('address');
    
    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const ageError = document.getElementById('ageError');
    const genderError = document.getElementById('genderError');
    
    // State
    let users = [];
    let editingId = null;
    
    // Initialize
    loadUsersFromStorage();
    renderTable();
    
    // Validation Functions
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    function validateAge(age) {
        if (!age) return true; // Age is optional
        const ageNum = parseInt(age);
        return ageNum >= 1 && ageNum <= 120;
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 4000);
    }
    
    // Real-time Validation
    nameInput.addEventListener('input', function() {
        const name = this.value.trim();
        if (name && !validateName(name)) {
            showError(nameError, 'Name must be 2-50 characters and contain only letters and spaces');
        } else {
            hideError(nameError);
        }
    });
    
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        if (email && !validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            hideError(emailError);
        }
    });
    
    phoneInput.addEventListener('input', function() {
        const phone = this.value.replace(/\s/g, '');
        if (phone && !validatePhone(phone)) {
            showError(phoneError, 'Please enter a valid phone number (10-15 digits)');
        } else {
            hideError(phoneError);
        }
    });
    
    ageInput.addEventListener('input', function() {
        const age = this.value;
        if (age && !validateAge(age)) {
            showError(ageError, 'Age must be between 1 and 120');
        } else {
            hideError(ageError);
        }
    });
    
    // Radio button click handlers
    document.querySelectorAll('.radio-option').forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            hideError(genderError);
        });
    });
    
    // Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.replace(/\s/g, '');
        const age = ageInput.value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const address = addressInput.value.trim();
        
        // Validate all fields
        let hasErrors = false;
        
        if (!validateName(name)) {
            showError(nameError, 'Please enter a valid name');
            hasErrors = true;
        }
        
        if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            hasErrors = true;
        }
        
        if (!validatePhone(phone)) {
            showError(phoneError, 'Please enter a valid phone number');
            hasErrors = true;
        }
        
        if (age && !validateAge(age)) {
            showError(ageError, 'Please enter a valid age');
            hasErrors = true;
        }
        
        if (!gender) {
            showError(genderError, 'Please select a gender');
            hasErrors = true;
        }
        
        if (hasErrors) {
            showNotification('Please fix the errors in the form', 'error');
            return;
        }
        
        // Check for duplicate email (except when editing the same user)
        const duplicateEmail = users.find(user => 
            user.email.toLowerCase() === email.toLowerCase() && 
            user.id !== editingId
        );
        
        if (duplicateEmail) {
            showError(emailError, 'This email is already registered');
            showNotification('Email already exists in the system', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = editingId ? 'Updating...' : 'Adding...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate processing delay
        setTimeout(() => {
            if (editingId) {
                // Update existing user
                updateUser(editingId, { name, email, phone, age, gender, address });
                showNotification('User updated successfully!', 'success');
                editingId = null;
                submitBtn.textContent = 'Add User';
            } else {
                // Add new user
                addUser({ name, email, phone, age, gender, address });
                showNotification('User added successfully!', 'success');
            }
            
            // Reset form
            form.reset();
            hideAllErrors();
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Render updated table
            renderTable();
            
            // Scroll to table
            document.querySelector('.table-container').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 800);
    });
    
    // Reset button handler
    form.addEventListener('reset', function() {
        hideAllErrors();
        editingId = null;
        submitBtn.textContent = 'Add User';
        notification.style.display = 'none';
        
        // Remove editing highlight from table
        document.querySelectorAll('tr.editing').forEach(row => {
            row.classList.remove('editing');
        });
    });
    
    function hideAllErrors() {
        hideError(nameError);
        hideError(emailError);
        hideError(phoneError);
        hideError(ageError);
        hideError(genderError);
    }
    
    // User Management Functions
    function addUser(userData) {
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        saveUsersToStorage();
    }
    
    function updateUser(id, userData) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = {
                ...users[index],
                ...userData,
                updatedAt: new Date().toISOString()
            };
            saveUsersToStorage();
        }
    }
    
    function deleteUser(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            users = users.filter(user => user.id !== id);
            saveUsersToStorage();
            renderTable();
            showNotification('User deleted successfully!', 'success');
            
            // Reset form if editing this user
            if (editingId === id) {
                form.reset();
                editingId = null;
                submitBtn.textContent = 'Add User';
            }
        }
    }
    
    function editUser(id) {
        const user = users.find(user => user.id === id);
        if (!user) return;
        
        // Populate form
        nameInput.value = user.name;
        emailInput.value = user.email;
        phoneInput.value = user.phone;
        ageInput.value = user.age || '';
        addressInput.value = user.address || '';
        
        // Set gender radio button
        const genderRadio = document.querySelector(`input[name="gender"][value="${user.gender}"]`);
        if (genderRadio) {
            genderRadio.checked = true;
        }
        
        // Update state and button
        editingId = id;
        submitBtn.textContent = 'Update User';
        
        // Highlight the row being edited
        document.querySelectorAll('tr.editing').forEach(row => {
            row.classList.remove('editing');
        });
        document.querySelector(`tr[data-id="${id}"]`)?.classList.add('editing');
        
        // Scroll to form
        document.querySelector('.container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        showNotification('Editing user. Update the form and click "Update User"', 'success');
    }
    
    // Clear All Data
    clearAllBtn.addEventListener('click', function() {
        if (users.length === 0) {
            showNotification('No data to clear', 'error');
            return;
        }
        
        if (confirm(`Are you sure you want to delete all ${users.length} user(s)? This action cannot be undone.`)) {
            users = [];
            saveUsersToStorage();
            renderTable();
            form.reset();
            editingId = null;
            submitBtn.textContent = 'Add User';
            showNotification('All users deleted successfully!', 'success');
        }
    });
    
    // Storage Functions
    function saveUsersToStorage() {
        try {
            localStorage.setItem('userDetails', JSON.stringify(users));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            showNotification('Error saving data', 'error');
        }
    }
    
    function loadUsersFromStorage() {
        try {
            const stored = localStorage.getItem('userDetails');
            if (stored) {
                users = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            users = [];
        }
    }
    
    // Render Table
    function renderTable() {
        if (users.length === 0) {
            tableBody.innerHTML = `
                <tr class="no-data">
                    <td colspan="8">No users registered yet. Add your first user above!</td>
                </tr>
            `;
            totalUsersSpan.textContent = '0';
            return;
        }
        
        tableBody.innerHTML = users.map((user, index) => `
            <tr data-id="${user.id}" ${editingId === user.id ? 'class="editing"' : ''}>
                <td>${index + 1}</td>
                <td>${escapeHtml(user.name)}</td>
                <td>${escapeHtml(user.email)}</td>
                <td>${escapeHtml(user.phone)}</td>
                <td>${user.age || '-'}</td>
                <td>${escapeHtml(user.gender)}</td>
                <td>${user.address ? escapeHtml(user.address) : '-'}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editUserById(${user.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteUserById(${user.id})">Delete</button>
                </td>
            </tr>
        `).join('');
        
        totalUsersSpan.textContent = users.length;
    }
    
    // Utility function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Global functions for onclick handlers
    window.editUserById = editUser;
    window.deleteUserById = deleteUser;
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus on name input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            nameInput.focus();
        }
        
        // Escape to cancel editing
        if (e.key === 'Escape' && editingId) {
            form.reset();
            editingId = null;
            submitBtn.textContent = 'Add User';
            document.querySelectorAll('tr.editing').forEach(row => {
                row.classList.remove('editing');
            });
            showNotification('Editing cancelled', 'success');
        }
    });
    
    // Auto-save indicator
    let saveTimeout;
    function showAutoSaveIndicator() {
        clearTimeout(saveTimeout);
        const indicator = document.createElement('div');
        indicator.textContent = '✓ Saved';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(indicator);
        
        saveTimeout = setTimeout(() => {
            indicator.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => indicator.remove(), 300);
        }, 2000);
    }
    
    // Override saveUsersToStorage to show indicator
    const originalSave = saveUsersToStorage;
    saveUsersToStorage = function() {
        originalSave();
        showAutoSaveIndicator();
    };
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(10px);
        }
    }
`;
document.head.appendChild(style);
