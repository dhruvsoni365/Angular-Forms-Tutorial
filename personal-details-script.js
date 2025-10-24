// Personal Details Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    init();
});

// Global variables
let personalDetails = [];
let editingId = null;

// Initialize the application
function init() {
    loadDataFromStorage();
    bindEventListeners();
    updateTable();
    updateNoDataMessage();
}

// Bind event listeners
function bindEventListeners() {
    const form = document.getElementById('personalDetailsForm');
    const clearTableBtn = document.getElementById('clearTableBtn');
    const exportBtn = document.getElementById('exportBtn');

    form.addEventListener('submit', handleFormSubmit);
    clearTableBtn.addEventListener('click', clearAllData);
    exportBtn.addEventListener('click', exportToCSV);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = getFormData();
        
        if (editingId !== null) {
            updateExistingEntry(formData);
        } else {
            addNewEntry(formData);
        }
        
        resetForm();
        updateTable();
        updateNoDataMessage();
        saveDataToStorage();
        
        // Show success message
        showNotification('Personal details saved successfully!', 'success');
    }
}

// Get form data
function getFormData() {
    return {
        id: editingId || Date.now(),
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
        country: document.getElementById('country').value,
        occupation: document.getElementById('occupation').value.trim(),
        dateAdded: editingId ? 
            personalDetails.find(p => p.id === editingId).dateAdded : 
            new Date().toISOString()
    };
}

// Add new entry
function addNewEntry(data) {
    personalDetails.push(data);
}

// Update existing entry
function updateExistingEntry(data) {
    const index = personalDetails.findIndex(p => p.id === editingId);
    if (index !== -1) {
        personalDetails[index] = data;
    }
    editingId = null;
}

// Validate form
function validateForm() {
    let isValid = true;
    const requiredFields = [
        { id: 'firstName', name: 'First Name' },
        { id: 'lastName', name: 'Last Name' },
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Phone' },
        { id: 'dateOfBirth', name: 'Date of Birth' },
        { id: 'address', name: 'Address' },
        { id: 'city', name: 'City' },
        { id: 'country', name: 'Country' }
    ];

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');

        if (!value) {
            errorElement.textContent = `${field.name} is required`;
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e1e8ed';
        }
    });

    // Additional email validation
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailPattern.test(email.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        email.style.borderColor = '#e74c3c';
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone');
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone.value && !phonePattern.test(phone.value.replace(/[\s\-\(\)]/g, ''))) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        phone.style.borderColor = '#e74c3c';
        isValid = false;
    }

    // Date validation (not in future)
    const dateOfBirth = document.getElementById('dateOfBirth');
    if (dateOfBirth.value) {
        const birthDate = new Date(dateOfBirth.value);
        const today = new Date();
        if (birthDate >= today) {
            document.getElementById('dateOfBirthError').textContent = 'Date of birth cannot be in the future';
            dateOfBirth.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }

    return isValid;
}

// Update table
function updateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    personalDetails.forEach((person, index) => {
        const row = createTableRow(person, index + 1);
        tableBody.appendChild(row);
    });
}

// Create table row
function createTableRow(person, rowNumber) {
    const row = document.createElement('tr');
    row.className = 'new-row';
    
    const fullName = `${person.firstName} ${person.lastName}`;
    const fullAddress = `${person.address}, ${person.city}`;
    
    row.innerHTML = `
        <td>${rowNumber}</td>
        <td title="${fullName}">${fullName}</td>
        <td title="${person.email}">${person.email}</td>
        <td title="${person.phone}">${person.phone}</td>
        <td>${formatDate(person.dateOfBirth)}</td>
        <td>${person.gender || 'Not specified'}</td>
        <td title="${fullAddress}">${truncateText(fullAddress, 30)}</td>
        <td title="${person.city}">${person.city}</td>
        <td title="${person.state}">${person.state || '-'}</td>
        <td title="${person.zipCode}">${person.zipCode || '-'}</td>
        <td title="${person.country}">${person.country}</td>
        <td title="${person.occupation}">${person.occupation || '-'}</td>
        <td>
            <button class="action-btn edit-btn" onclick="editEntry(${person.id})" title="Edit">
                Edit
            </button>
            <button class="action-btn delete-btn" onclick="deleteEntry(${person.id})" title="Delete">
                Delete
            </button>
        </td>
    `;
    
    return row;
}

// Edit entry
function editEntry(id) {
    const person = personalDetails.find(p => p.id === id);
    if (person) {
        // Populate form with existing data
        document.getElementById('firstName').value = person.firstName;
        document.getElementById('lastName').value = person.lastName;
        document.getElementById('email').value = person.email;
        document.getElementById('phone').value = person.phone;
        document.getElementById('dateOfBirth').value = person.dateOfBirth;
        document.getElementById('gender').value = person.gender || '';
        document.getElementById('address').value = person.address;
        document.getElementById('city').value = person.city;
        document.getElementById('state').value = person.state || '';
        document.getElementById('zipCode').value = person.zipCode || '';
        document.getElementById('country').value = person.country;
        document.getElementById('occupation').value = person.occupation || '';
        
        editingId = id;
        
        // Change button text
        const submitBtn = document.querySelector('.btn-primary');
        submitBtn.textContent = 'Update Entry';
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
        
        showNotification('Entry loaded for editing', 'info');
    }
}

// Delete entry
function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        personalDetails = personalDetails.filter(p => p.id !== id);
        updateTable();
        updateNoDataMessage();
        saveDataToStorage();
        showNotification('Entry deleted successfully', 'success');
    }
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        personalDetails = [];
        updateTable();
        updateNoDataMessage();
        saveDataToStorage();
        showNotification('All data cleared successfully', 'success');
    }
}

// Reset form
function resetForm() {
    document.getElementById('personalDetailsForm').reset();
    editingId = null;
    
    // Reset button text
    const submitBtn = document.querySelector('.btn-primary');
    submitBtn.textContent = 'Add to Table';
    
    // Clear error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Reset border colors
    document.querySelectorAll('input, select').forEach(el => {
        el.style.borderColor = '#e1e8ed';
    });
}

// Update no data message visibility
function updateNoDataMessage() {
    const noDataMessage = document.getElementById('noDataMessage');
    const tableContainer = document.querySelector('.table-container');
    
    if (personalDetails.length === 0) {
        noDataMessage.style.display = 'block';
        tableContainer.style.display = 'none';
    } else {
        noDataMessage.style.display = 'none';
        tableContainer.style.display = 'block';
    }
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Truncate text
function truncateText(text, maxLength) {
    if (!text) return '-';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Save data to localStorage
function saveDataToStorage() {
    try {
        localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        showNotification('Error saving data to storage', 'error');
    }
}

// Load data from localStorage
function loadDataFromStorage() {
    try {
        const saved = localStorage.getItem('personalDetails');
        if (saved) {
            personalDetails = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        personalDetails = [];
        showNotification('Error loading saved data', 'error');
    }
}

// Export to CSV
function exportToCSV() {
    if (personalDetails.length === 0) {
        showNotification('No data to export', 'warning');
        return;
    }

    const headers = [
        'ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Date of Birth',
        'Gender', 'Address', 'City', 'State', 'ZIP Code', 'Country', 'Occupation', 'Date Added'
    ];

    const csvContent = [
        headers.join(','),
        ...personalDetails.map(person => [
            person.id,
            `"${person.firstName}"`,
            `"${person.lastName}"`,
            `"${person.email}"`,
            `"${person.phone}"`,
            person.dateOfBirth,
            `"${person.gender || ''}"`,
            `"${person.address}"`,
            `"${person.city}"`,
            `"${person.state || ''}"`,
            `"${person.zipCode || ''}"`,
            `"${person.country}"`,
            `"${person.occupation || ''}"`,
            new Date(person.dateAdded).toLocaleString()
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `personal-details-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Data exported successfully', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });

    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add some sample data for demonstration
function addSampleData() {
    if (personalDetails.length === 0) {
        const sampleData = [
            {
                id: Date.now() + 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+1-555-0123',
                dateOfBirth: '1990-05-15',
                gender: 'Male',
                address: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'United States',
                occupation: 'Software Engineer',
                dateAdded: new Date().toISOString()
            },
            {
                id: Date.now() + 2,
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                phone: '+1-555-0456',
                dateOfBirth: '1985-08-22',
                gender: 'Female',
                address: '456 Oak Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90210',
                country: 'United States',
                occupation: 'Marketing Manager',
                dateAdded: new Date().toISOString()
            }
        ];
        
        personalDetails = sampleData;
        updateTable();
        updateNoDataMessage();
        saveDataToStorage();
    }
}

// Uncomment the next line to add sample data on page load
// setTimeout(addSampleData, 1000);
