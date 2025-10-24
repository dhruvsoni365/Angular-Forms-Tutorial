// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('fullName');
    const mobileInput = document.getElementById('mobileNumber');
    const nameError = document.getElementById('nameError');
    const mobileError = document.getElementById('mobileError');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = form.querySelector('.submit-btn');

    // Real-time validation functions
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }

    function validateMobile(mobile) {
        const mobileRegex = /^[\+]?[0-9]{10,15}$/;
        return mobileRegex.test(mobile.replace(/\s/g, ''));
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    function updateSubmitButton() {
        const isNameValid = validateName(nameInput.value);
        const isMobileValid = validateMobile(mobileInput.value);
        
        submitBtn.disabled = !(isNameValid && isMobileValid && nameInput.value.trim() && mobileInput.value.trim());
    }

    // Real-time name validation
    nameInput.addEventListener('input', function() {
        const name = this.value.trim();
        
        if (name === '') {
            hideError(nameError);
        } else if (!validateName(name)) {
            showError(nameError, 'Name must be 2-50 characters long and contain only letters and spaces');
        } else {
            hideError(nameError);
        }
        
        updateSubmitButton();
    });

    // Real-time mobile validation
    mobileInput.addEventListener('input', function() {
        let mobile = this.value.replace(/\s/g, '');
        
        // Auto-format mobile number (optional)
        if (mobile.length > 3 && mobile.length <= 6) {
            mobile = mobile.slice(0, 3) + ' ' + mobile.slice(3);
        } else if (mobile.length > 6 && mobile.length <= 10) {
            mobile = mobile.slice(0, 3) + ' ' + mobile.slice(3, 6) + ' ' + mobile.slice(6);
        }
        
        const rawMobile = mobile.replace(/\s/g, '');
        
        if (rawMobile === '') {
            hideError(mobileError);
        } else if (!validateMobile(rawMobile)) {
            showError(mobileError, 'Please enter a valid mobile number (10-15 digits)');
        } else {
            hideError(mobileError);
        }
        
        updateSubmitButton();
    });

    // Format mobile number on blur
    mobileInput.addEventListener('blur', function() {
        let mobile = this.value.replace(/\s/g, '');
        
        // Format mobile number for better readability
        if (mobile.length >= 10) {
            if (mobile.startsWith('+')) {
                // International format
                this.value = mobile.slice(0, 1) + ' ' + mobile.slice(1, 4) + ' ' + mobile.slice(4, 7) + ' ' + mobile.slice(7);
            } else {
                // Domestic format
                this.value = mobile.slice(0, 3) + ' ' + mobile.slice(3, 6) + ' ' + mobile.slice(6);
            }
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const mobile = mobileInput.value.replace(/\s/g, '');
        
        // Final validation
        let hasErrors = false;
        
        if (!validateName(name)) {
            showError(nameError, 'Please enter a valid name');
            hasErrors = true;
        }
        
        if (!validateMobile(mobile)) {
            showError(mobileError, 'Please enter a valid mobile number');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            successMessage.innerHTML = `
                <strong>Success!</strong><br>
                Name: ${name}<br>
                Mobile: ${mobile}<br>
                Form submitted successfully!
            `;
            successMessage.style.display = 'block';
            
            // Reset form after successful submission
            form.reset();
            hideError(nameError);
            hideError(mobileError);
            
            // Reset button state
            submitBtn.textContent = 'Submit';
            submitBtn.classList.remove('loading');
            submitBtn.disabled = true;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
        }, 1500);
    });

    // Reset button functionality
    form.addEventListener('reset', function() {
        hideError(nameError);
        hideError(mobileError);
        successMessage.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submit';
        submitBtn.classList.remove('loading');
    });

    // Initial state
    updateSubmitButton();
});

// Additional utility functions
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+1 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    
    return phoneNumber;
}

// Prevent form submission on Enter key in input fields (optional)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = this.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});
