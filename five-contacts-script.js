document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fiveContactsForm');
    const successMessage = document.getElementById('successMessage');
    
    // Real-time validation for all inputs
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Validate individual field
    function validateField(field) {
        const fieldId = field.id;
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (!field.validity.valid) {
            field.classList.add('error');
            
            if (field.validity.valueMissing) {
                errorElement.textContent = 'This field is required';
            } else if (field.validity.tooShort) {
                errorElement.textContent = `Minimum ${field.minLength} characters required`;
            } else if (field.validity.tooLong) {
                errorElement.textContent = `Maximum ${field.maxLength} characters allowed`;
            } else if (field.validity.patternMismatch) {
                errorElement.textContent = 'Please enter a valid mobile number (10-15 digits)';
            }
            return false;
        } else {
            field.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        successMessage.style.display = 'none';
        successMessage.textContent = '';
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Collect form data
        const contacts = [];
        for (let i = 1; i <= 5; i++) {
            const name = document.getElementById(`name${i}`).value.trim();
            const mobile = document.getElementById(`mobile${i}`).value.trim();
            contacts.push({ name, mobile });
        }
        
        // Display success message
        successMessage.innerHTML = `
            <strong>Success!</strong> All 5 contacts have been submitted successfully!
            <div style="margin-top: 10px; font-size: 0.9rem;">
                ${contacts.map((contact, index) => 
                    `<div style="margin-top: 5px;">
                        <strong>Contact ${index + 1}:</strong> ${contact.name} - ${contact.mobile}
                    </div>`
                ).join('')}
            </div>
        `;
        successMessage.style.display = 'block';
        
        // Log to console
        console.log('Form submitted with contacts:', contacts);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Optional: Reset form after 5 seconds
        // setTimeout(() => {
        //     form.reset();
        //     successMessage.style.display = 'none';
        // }, 5000);
    });
    
    // Reset button handler
    form.addEventListener('reset', function() {
        // Clear all error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        // Remove error classes
        inputs.forEach(input => {
            input.classList.remove('error');
        });
        
        // Hide success message
        successMessage.style.display = 'none';
        successMessage.textContent = '';
    });
});
