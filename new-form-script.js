// Form validation and submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');

    // Validation patterns
    const namePattern = /^[a-zA-Z\s]{2,50}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');

        if (name === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, errorElement, 'Name must be at least 2 characters');
            return false;
        } else if (name.length > 50) {
            showError(nameInput, errorElement, 'Name must not exceed 50 characters');
            return false;
        } else if (!namePattern.test(name)) {
            showError(nameInput, errorElement, 'Name can only contain letters and spaces');
            return false;
        } else {
            clearError(nameInput, errorElement);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');

        if (email === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailInput, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            clearError(emailInput, errorElement);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const errorElement = document.getElementById('messageError');

        if (message === '') {
            showError(messageInput, errorElement, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, errorElement, 'Message must be at least 10 characters');
            return false;
        } else if (message.length > 500) {
            showError(messageInput, errorElement, 'Message must not exceed 500 characters');
            return false;
        } else {
            clearError(messageInput, errorElement);
            return true;
        }
    }

    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        return isNameValid && isEmailValid && isMessageValid;
    }

    // Add real-time validation listeners
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        if (validateForm()) {
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Submitting...';

            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                successMessage.textContent = 'Form submitted successfully!';
                successMessage.style.display = 'block';

                // Log form data (in production, send to server)
                console.log('Form submitted:', formData);

                // Reset form
                form.reset();

                // Clear all error states
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.classList.remove('error');
                });

                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Submit';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });

    // Handle form reset
    form.addEventListener('reset', function() {
        // Clear all error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });

        // Remove error classes
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
        });

        // Hide success message
        successMessage.style.display = 'none';
    });
});
