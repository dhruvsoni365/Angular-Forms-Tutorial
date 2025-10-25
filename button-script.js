// Enhanced Button JavaScript Functionality

// Message display function
function showMessage(text, type = 'success') {
    const messageEl = document.getElementById('message');
    
    // Set message text and type
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    
    // Show message
    messageEl.classList.add('show');
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 3000);
}

// Loading button simulation
function simulateLoading() {
    const btn = document.getElementById('loadingBtn');
    const originalText = btn.textContent;
    
    // Add loading state
    btn.classList.add('btn-loading');
    btn.textContent = 'Loading...';
    btn.disabled = true;
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
        btn.classList.remove('btn-loading');
        btn.textContent = originalText;
        btn.disabled = false;
        showMessage('Loading completed! ✅', 'success');
    }, 2000);
}

// Toggle button functionality
let isToggled = false;
function toggleButton() {
    const btn = document.getElementById('toggleBtn');
    isToggled = !isToggled;
    
    if (isToggled) {
        btn.classList.add('active');
        btn.textContent = 'Toggled On';
        showMessage('Toggle activated! 🟢', 'success');
    } else {
        btn.classList.remove('active');
        btn.textContent = 'Toggle Me';
        showMessage('Toggle deactivated! 🔴', 'info');
    }
}

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Keyboard accessibility
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn')) {
            event.preventDefault();
            focusedElement.click();
        }
    }
});

// Button analytics (demo)
function trackButtonClick(buttonText) {
    console.log(`Button clicked: ${buttonText} at ${new Date().toISOString()}`);
    // In a real application, you would send this data to your analytics service
}

// Add click tracking to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            trackButtonClick(this.textContent.trim());
        });
    });
});

// Touch device optimizations
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
        
        // Add touch styles
        const style = document.createElement('style');
        style.textContent = `
            .btn.touch-active {
                transform: scale(0.95);
                transition: transform 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    });
}

// Button state management
class ButtonManager {
    constructor() {
        this.buttons = new Map();
    }
    
    register(buttonId, config = {}) {
        const button = document.getElementById(buttonId);
        if (button) {
            this.buttons.set(buttonId, {
                element: button,
                originalText: button.textContent,
                originalClass: button.className,
                config: config
            });
        }
    }
    
    setState(buttonId, state) {
        const buttonData = this.buttons.get(buttonId);
        if (!buttonData) return;
        
        const { element, originalText, originalClass } = buttonData;
        
        switch (state) {
            case 'loading':
                element.classList.add('btn-loading');
                element.textContent = 'Loading...';
                element.disabled = true;
                break;
                
            case 'success':
                element.className = originalClass + ' btn-success';
                element.textContent = '✓ Success';
                element.disabled = false;
                setTimeout(() => this.reset(buttonId), 2000);
                break;
                
            case 'error':
                element.className = originalClass + ' btn-danger';
                element.textContent = '✗ Error';
                element.disabled = false;
                setTimeout(() => this.reset(buttonId), 2000);
                break;
                
            case 'disabled':
                element.disabled = true;
                break;
                
            default:
                this.reset(buttonId);
        }
    }
    
    reset(buttonId) {
        const buttonData = this.buttons.get(buttonId);
        if (!buttonData) return;
        
        const { element, originalText, originalClass } = buttonData;
        element.className = originalClass;
        element.textContent = originalText;
        element.disabled = false;
    }
}

// Initialize button manager
const buttonManager = new ButtonManager();

// Export for global use
window.ButtonManager = ButtonManager;
window.showMessage = showMessage;
window.simulateLoading = simulateLoading;
window.toggleButton = toggleButton;
