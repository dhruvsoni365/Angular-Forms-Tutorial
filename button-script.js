// Button Component JavaScript Functions

// Show alert function
function showAlert(message) {
    alert(message);
}

// Change button color function
function changeColor(button) {
    const colors = ['btn-primary', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info'];
    const currentClasses = button.className.split(' ');
    
    // Find current color class
    let currentColorIndex = -1;
    for (let i = 0; i < colors.length; i++) {
        if (currentClasses.includes(colors[i])) {
            currentColorIndex = i;
            button.classList.remove(colors[i]);
            break;
        }
    }
    
    // Add next color class
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    button.classList.add(colors[nextColorIndex]);
}

// Toggle button size function
function toggleSize(button) {
    if (button.classList.contains('btn-large')) {
        button.classList.remove('btn-large');
        button.classList.add('btn-small');
        button.textContent = 'Small Size';
    } else if (button.classList.contains('btn-small')) {
        button.classList.remove('btn-small');
        button.textContent = 'Normal Size';
    } else {
        button.classList.add('btn-large');
        button.textContent = 'Large Size';
    }
}

// Add loading state to button
function addLoadingState(button, duration = 2000) {
    const originalText = button.textContent;
    button.classList.add('loading');
    button.disabled = true;
    
    setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = false;
        button.textContent = originalText;
    }, duration);
}

// Create dynamic button function
function createButton(text, type = 'primary', size = 'normal', onClick = null) {
    const button = document.createElement('button');
    button.className = `btn btn-${type}`;
    
    if (size === 'small') button.classList.add('btn-small');
    if (size === 'large') button.classList.add('btn-large');
    
    button.textContent = text;
    
    if (onClick && typeof onClick === 'function') {
        button.addEventListener('click', onClick);
    }
    
    return button;
}

// Batch button operations
function disableAllButtons(container) {
    const buttons = container.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function enableAllButtons(container) {
    const buttons = container.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Button animation effects
function pulseButton(button, duration = 1000) {
    button.style.animation = `pulse ${duration}ms ease-in-out`;
    setTimeout(() => {
        button.style.animation = '';
    }, duration);
}

// Add pulse animation CSS if not already present
if (!document.querySelector('#pulse-animation')) {
    const style = document.createElement('style');
    style.id = 'pulse-animation';
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize button interactions on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Button components loaded successfully!');
    
    // Add click effects to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showAlert,
        changeColor,
        toggleSize,
        addLoadingState,
        createButton,
        disableAllButtons,
        enableAllButtons,
        pulseButton
    };
}
