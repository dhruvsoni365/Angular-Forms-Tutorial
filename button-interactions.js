// Button Interactions and Functionality

class ButtonManager {
    constructor() {
        this.init();
    }

    init() {
        this.addRippleEffect();
        this.handleLoadingStates();
        this.addKeyboardSupport();
        this.addTooltipSupport();
        this.handleButtonGroups();
    }

    // Add ripple effect to buttons with ripple class
    addRippleEffect() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-ripple')) {
                this.createRipple(e);
            }
        });
    }

    createRipple(event) {
        const button = event.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Handle loading states
    handleLoadingStates() {
        document.addEventListener('click', (e) => {
            if (e.target.dataset.loading === 'true') {
                this.toggleLoading(e.target);
            }
        });
    }

    toggleLoading(button, duration = 2000) {
        const originalText = button.textContent;
        button.classList.add('btn-loading');
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        button.textContent = '';

        setTimeout(() => {
            button.classList.remove('btn-loading');
            button.disabled = false;
            button.removeAttribute('aria-busy');
            button.textContent = originalText;
        }, duration);
    }

    // Add keyboard support
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('btn')) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.target.click();
                }
            }
        });
    }

    // Add tooltip support
    addTooltipSupport() {
        const buttonsWithTooltips = document.querySelectorAll('[data-tooltip]');
        
        buttonsWithTooltips.forEach(button => {
            const tooltip = this.createTooltip(button.dataset.tooltip);
            button.appendChild(tooltip);

            button.addEventListener('mouseenter', () => {
                tooltip.classList.add('show');
            });

            button.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            button.addEventListener('focus', () => {
                tooltip.classList.add('show');
            });

            button.addEventListener('blur', () => {
                tooltip.classList.remove('show');
            });
        });
    }

    createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'btn-tooltip';
        tooltip.textContent = text;
        return tooltip;
    }

    // Handle button groups
    handleButtonGroups() {
        const buttonGroups = document.querySelectorAll('.btn-group');
        
        buttonGroups.forEach(group => {
            const buttons = group.querySelectorAll('.btn');
            
            buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    if (group.dataset.toggle === 'single') {
                        buttons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    } else {
                        button.classList.toggle('active');
                    }
                });

                // Keyboard navigation within button groups
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft' && index > 0) {
                        e.preventDefault();
                        buttons[index - 1].focus();
                    } else if (e.key === 'ArrowRight' && index < buttons.length - 1) {
                        e.preventDefault();
                        buttons[index + 1].focus();
                    }
                });
            });
        });
    }

    // Utility methods
    static showSuccess(message, duration = 3000) {
        this.showNotification(message, 'success', duration);
    }

    static showError(message, duration = 3000) {
        this.showNotification(message, 'error', duration);
    }

    static showNotification(message, type, duration) {
        const notification = document.createElement('div');
        notification.className = `btn-notification btn-notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    // Form validation helpers
    static validateForm(formElement) {
        const requiredFields = formElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                this.highlightInvalidField(field);
            } else {
                this.removeHighlight(field);
            }
        });

        return isValid;
    }

    static highlightInvalidField(field) {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
    }

    static removeHighlight(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }

    // Animation helpers
    static animateButton(button, animation = 'pulse') {
        button.style.animation = `${animation} 0.3s ease`;
        
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    }

    // Accessibility helpers
    static announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }
}

// Common button interactions
function handleButtonClick(button, action) {
    switch(action) {
        case 'success':
            ButtonManager.showSuccess('Operation completed successfully!');
            break;
        case 'error':
            ButtonManager.showError('An error occurred. Please try again.');
            break;
        case 'loading':
            new ButtonManager().toggleLoading(button);
            break;
        case 'copy':
            handleCopyAction(button);
            break;
        case 'download':
            handleDownloadAction(button);
            break;
        case 'share':
            handleShareAction(button);
            break;
        default:
            console.log('Button clicked:', button.textContent);
    }
}

function handleCopyAction(button) {
    const textToCopy = button.dataset.copyText || 'Sample text copied!';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            ButtonManager.showSuccess('Copied to clipboard!');
            ButtonManager.announceToScreenReader('Text copied to clipboard');
        }).catch(() => {
            ButtonManager.showError('Failed to copy text');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        ButtonManager.showSuccess('Copied to clipboard!');
    }
}

function handleDownloadAction(button) {
    const filename = button.dataset.filename || 'download.txt';
    const content = button.dataset.content || 'Sample download content';
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    ButtonManager.showSuccess('File downloaded!');
}

function handleShareAction(button) {
    const shareData = {
        title: button.dataset.shareTitle || 'Check this out!',
        text: button.dataset.shareText || 'Shared from Button Components Demo',
        url: button.dataset.shareUrl || window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).then(() => {
            ButtonManager.showSuccess('Content shared successfully!');
        }).catch(() => {
            // Fallback to copying URL
            handleCopyAction(button);
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(shareData.url).then(() => {
            ButtonManager.showSuccess('Link copied to clipboard!');
        });
    }
}

// CSS animations (to be added via JavaScript)
const animationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    .btn-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        z-index: 1000;
        margin-bottom: 8px;
    }

    .btn-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: #333;
    }

    .btn-tooltip.show {
        opacity: 1;
        visibility: visible;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Add animations to page
if (!document.getElementById('button-animations')) {
    const style = document.createElement('style');
    style.id = 'button-animations';
    style.textContent = animationStyles;
    document.head.appendChild(style);
}

// Initialize button manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ButtonManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ButtonManager, handleButtonClick };
}
