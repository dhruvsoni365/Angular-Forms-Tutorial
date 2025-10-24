// Store all submitted personal details
let personalDetailsData = [];
let nextId = 1;

// Validation patterns
const validationPatterns = {
    fullName: {
        pattern: /^[a-zA-Z\s]{2,50}$/,
        message: 'Name must be 2-50 characters and contain only letters and spaces'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        pattern: /^[\+]?[0-9]{10,15}$/,
        message: 'Phone number must be 10-15 digits (optional + prefix)'
    },
    address: {
        pattern: /^.{0,100}$/,
        message: 'Address must not exceed 100 characters'
    },
    city: {
        pattern: /^[a-zA-Z\s]{0,50}$/,
        message: 'City must contain only letters and spaces (max 50 characters)'
    },
    postalCode: {
        pattern: /^[a-zA-Z0-9\s-]{0,10}$/,
        message: 'Postal code must be alphanumeric (max 10 characters)'
    }
};

// DOM Elements
const form = document.getElementById('personalDetailsForm');
const tableBody = document.getElementById('tableBody');
const emptyRow = document.getElementById('emptyRow');
const resetBtn = document.getElementById('resetBtn');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    form.addEventListener('submit', handleSubmit);
    resetBtn.addEventListener('click', handleReset);

    // Add real-time validation
    Object.keys(validationPatterns).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => clearError(fieldName));
        }
    });

    // Load saved data from localStorage
    loadDataFromStorage();
});

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Validate all fields
    let isValid = true;
    const requiredFields = ['fullName', 'email', 'phone'];

    requiredFields.forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });

    // Validate optional fields if they have values
    const optionalFields = ['address', 'city', 'postalCode'];
    optionalFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field && field.value.trim() !== '') {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        }
    });

    if (!isValid) {
        return;
    }

    // Get form data
    const formData = {
        id: nextId++,
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim() || '-',
        city: document.getElementById('city').value.trim() || '-',
        postalCode: document.getElementById('postalCode').value.trim() || '-',
        dateOfBirth: document.getElementById('dateOfBirth').value || '-'
    };

    // Add to data array
    personalDetailsData.push(formData);

    // Save to localStorage
    saveDataToStorage();

    // Update table
    renderTable();

    // Show success message
    showSuccessMessage();

    // Reset form
    form.reset();
    clearAllErrors();
}

// Validate individual field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    const value = field.value.trim();

    // Check if field is required
    const requiredFields = ['fullName', 'email', 'phone'];
    if (requiredFields.includes(fieldName) && value === '') {
        showError(fieldName, 'This field is required');
        return false;
    }

    // Skip validation for empty optional fields
    if (value === '' && !requiredFields.includes(fieldName)) {
        clearError(fieldName);
        return true;
    }

    // Validate pattern
    const validation = validationPatterns[fieldName];
    if (validation && !validation.pattern.test(value)) {
        showError(fieldName, validation.message);
        return false;
    }

    clearError(fieldName);
    return true;
}

// Show error message
function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);

    field.classList.add('error');
    errorElement.textContent = message;
}

// Clear error message
function clearError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);

    field.classList.remove('error');
    errorElement.textContent = '';
}

// Clear all errors
function clearAllErrors() {
    Object.keys(validationPatterns).forEach(fieldName => {
        clearError(fieldName);
    });
}

// Render table with all data
function renderTable() {
    if (personalDetailsData.length === 0) {
        emptyRow.style.display = 'table-row';
        return;
    }

    emptyRow.style.display = 'none';

    tableBody.innerHTML = personalDetailsData.map((data, index) => `
        <tr>
            <td class="index">${index + 1}</td>
            <td>${escapeHtml(data.fullName)}</td>
            <td>${escapeHtml(data.email)}</td>
            <td>${escapeHtml(data.phone)}</td>
            <td>${escapeHtml(data.address)}</td>
            <td>${escapeHtml(data.city)}</td>
            <td>${escapeHtml(data.postalCode)}</td>
            <td>${formatDate(data.dateOfBirth)}</td>
            <td>
                <button class="btn-delete" onclick="deleteRecord(${data.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Delete record
function deleteRecord(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        personalDetailsData = personalDetailsData.filter(data => data.id !== id);
        saveDataToStorage();
        renderTable();
    }
}

// Format date for display
function formatDate(dateString) {
    if (!dateString || dateString === '-') {
        return '-';
    }

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Handle reset button
function handleReset() {
    form.reset();
    clearAllErrors();
}

// Show success message
function showSuccessMessage() {
    // Create success message element if it doesn't exist
    let successMsg = document.querySelector('.success-message');

    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        form.parentElement.insertBefore(successMsg, form);
    }

    successMsg.textContent = 'Personal details submitted successfully!';
    successMsg.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 3000);
}

// Save data to localStorage
function saveDataToStorage() {
    try {
        localStorage.setItem('personalDetailsData', JSON.stringify(personalDetailsData));
        localStorage.setItem('personalDetailsNextId', nextId.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Load data from localStorage
function loadDataFromStorage() {
    try {
        const savedData = localStorage.getItem('personalDetailsData');
        const savedNextId = localStorage.getItem('personalDetailsNextId');

        if (savedData) {
            personalDetailsData = JSON.parse(savedData);
            renderTable();
        }

        if (savedNextId) {
            nextId = parseInt(savedNextId, 10);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

// Auto-format phone number as user types
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('+')) {
        value = '+' + value;
    }
    e.target.value = value;
});
