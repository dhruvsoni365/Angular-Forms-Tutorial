// Authentication Form JavaScript
// Handles form validation, mode switching, and API communication

// Form state
let isLoginMode = true;
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const form = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const accountTierSelect = document.getElementById('accountTier');
const accountTierGroup = document.getElementById('accountTierGroup');
const submitBtn = document.getElementById('submitBtn');
const toggleLink = document.getElementById('toggleLink');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const togglePassword = document.getElementById('togglePassword');
const responseMessage = document.getElementById('responseMessage');

// Error message elements
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const passwordStrength = document.getElementById('passwordStrength');

// Validation Functions (exported for testing)
const ValidationUtils = {
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    },

    validatePassword: function(password) {
        return password.length >= 8;
    },

    getPasswordStrength: function(password) {
        if (password.length === 0) return null;
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Character variety checks
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    },

    validateAccountTier: function(tier) {
        return ['free', 'pro'].includes(tier);
    }
};

// UI Update Functions
function updatePasswordStrength(password) {
    const strength = ValidationUtils.getPasswordStrength(password);
    
    if (!strength) {
        passwordStrength.style.display = 'none';
        return;
    }
    
    passwordStrength.className = 'password-strength ' + strength;
    
    const messages = {
        weak: '⚠️ Weak password - Add more characters and variety',
        medium: '✓ Medium strength - Consider adding special characters',
        strong: '✓✓ Strong password!'
    };
    
    passwordStrength.textContent = messages[strength];
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function showResponseMessage(message, type) {
    responseMessage.textContent = message;
    responseMessage.className = 'response-message ' + type;
    
    if (type === 'success') {
        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 5000);
    }
}

function setLoading(loading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (loading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Form Mode Toggle
function toggleFormMode(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        formTitle.textContent = 'Login to Your Account';
        formSubtitle.textContent = 'Enter your credentials to access your account';
        submitBtn.querySelector('.btn-text').textContent = 'Login';
        toggleLink.textContent = 'Register here';
        document.getElementById('toggleFormMode').innerHTML = 
            'Don\'t have an account? <a href="#" id="toggleLink">Register here</a>';
        accountTierGroup.style.display = 'none';
        passwordInput.setAttribute('autocomplete', 'current-password');
    } else {
        formTitle.textContent = 'Create New Account';
        formSubtitle.textContent = 'Sign up to get started with your account';
        submitBtn.querySelector('.btn-text').textContent = 'Register';
        toggleLink.textContent = 'Login here';
        document.getElementById('toggleFormMode').innerHTML = 
            'Already have an account? <a href="#" id="toggleLink">Login here</a>';
        accountTierGroup.style.display = 'block';
        passwordInput.setAttribute('autocomplete', 'new-password');
    }
    
    // Re-attach event listener to new link
    document.getElementById('toggleLink').addEventListener('click', toggleFormMode);
    
    // Clear form and errors
    form.reset();
    clearError(emailError);
    clearError(passwordError);
    passwordStrength.style.display = 'none';
    responseMessage.style.display = 'none';
}

// Real-time Validation
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    
    if (email.length === 0) {
        clearError(emailError);
        this.classList.remove('valid', 'invalid');
        return;
    }
    
    if (ValidationUtils.validateEmail(email)) {
        clearError(emailError);
        this.classList.remove('invalid');
        this.classList.add('valid');
    } else {
        showError(emailError, 'Please enter a valid email address');
        this.classList.remove('valid');
        this.classList.add('invalid');
    }
});

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    if (!isLoginMode) {
        updatePasswordStrength(password);
    }
    
    if (password.length === 0) {
        clearError(passwordError);
        this.classList.remove('valid', 'invalid');
        return;
    }
    
    if (ValidationUtils.validatePassword(password)) {
        clearError(passwordError);
        this.classList.remove('invalid');
        this.classList.add('valid');
    } else {
        showError(passwordError, 'Password must be at least 8 characters long');
        this.classList.remove('valid');
        this.classList.add('invalid');
    }
});

// Toggle Password Visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🙈';
});

// Form Submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous messages
    responseMessage.style.display = 'none';
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const accountTier = accountTierSelect.value;
    
    // Validate
    let isValid = true;
    
    if (!ValidationUtils.validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        emailInput.classList.add('invalid');
        isValid = false;
    }
    
    if (!ValidationUtils.validatePassword(password)) {
        showError(passwordError, 'Password must be at least 8 characters long');
        passwordInput.classList.add('invalid');
        isValid = false;
    }
    
    if (!isLoginMode && !ValidationUtils.validateAccountTier(accountTier)) {
        showError(document.getElementById('tierError'), 'Please select a valid account tier');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Prepare request
    const endpoint = isLoginMode ? '/login' : '/register';
    const payload = {
        email,
        password,
        ...(isLoginMode ? {} : { accountTier })
    };
    
    // Submit to API
    setLoading(true);
    
    try {
        const response = await fetch(API_BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showResponseMessage(
                data.message || (isLoginMode ? 'Login successful!' : 'Registration successful!'),
                'success'
            );
            
            // Show user info if available
            if (data.user) {
                setTimeout(() => {
                    showResponseMessage(
                        `Welcome ${data.user.email}! Account Tier: ${data.user.accountTier || 'N/A'}`,
                        'success'
                    );
                }, 2000);
            }
            
            // Clear form after successful submission
            if (!isLoginMode) {
                setTimeout(() => {
                    form.reset();
                    passwordStrength.style.display = 'none';
                }, 3000);
            }
        } else {
            showResponseMessage(
                data.error || 'An error occurred. Please try again.',
                'error'
            );
        }
    } catch (error) {
        console.error('Request error:', error);
        showResponseMessage(
            'Unable to connect to server. Please ensure the server is running on port 3000.',
            'error'
        );
    } finally {
        setLoading(false);
    }
});

// Initialize
toggleLink.addEventListener('click', toggleFormMode);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationUtils;
}
