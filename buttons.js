// Modern Button JavaScript Functionality

class ButtonManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupToggleButtons();
        this.setupLoadingButtons();
        this.setupCounterButtons();
    }

    setupEventListeners() {
        // Add click handlers to all buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn') && !e.target.disabled) {
                this.handleButtonClick(e.target, e);
            }
        });

        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.classList.contains('btn') && !e.target.disabled) {
                    e.preventDefault();
                    this.handleButtonClick(e.target, e);
                }
            }
        });
    }

    handleButtonClick(button, event) {
        // Create ripple effect
        this.createRipple(button, event);

        // Handle specific button types
        if (button.classList.contains('btn-toggle')) {
            this.handleToggle(button);
        } else if (button.classList.contains('btn-loading-demo')) {
            this.handleLoadingDemo(button);
        } else if (button.classList.contains('btn-counter')) {
            this.handleCounter(button);
        } else if (button.classList.contains('btn-notification')) {
            this.showNotification(button);
        } else if (button.classList.contains('btn-modal')) {
            this.showModal(button);
        }
    }

    createRipple(button, event) {
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

    setupToggleButtons() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 600ms linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    handleToggle(button) {
        button.classList.toggle('active');
        const isActive = button.classList.contains('active');
        
        // Update button text based on state
        if (button.dataset.toggleText) {
            const currentText = button.textContent;
            button.textContent = button.dataset.toggleText;
            button.dataset.toggleText = currentText;
        }

        // Update ARIA attributes
        button.setAttribute('aria-pressed', isActive);
        
        // Trigger custom event
        button.dispatchEvent(new CustomEvent('toggle', {
            detail: { active: isActive }
        }));
    }

    handleLoadingDemo(button) {
        if (button.classList.contains('btn-loading')) return;

        const originalText = button.textContent;
        button.classList.add('btn-loading');
        button.disabled = true;

        setTimeout(() => {
            button.classList.remove('btn-loading');
            button.disabled = false;
            button.textContent = originalText;
        }, 3000);
    }

    setupLoadingButtons() {
        // Add loading animation styles
        const style = document.createElement('style');
        style.textContent = `
            .btn-loading {
                color: transparent !important;
            }
            
            .btn-loading::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        `;
        document.head.appendChild(style);
    }

    setupCounterButtons() {
        this.counters = new Map();
    }

    handleCounter(button) {
        const counterId = button.dataset.counter || 'default';
        const currentCount = this.counters.get(counterId) || 0;
        const newCount = currentCount + 1;
        this.counters.set(counterId, newCount);

        const countDisplay = button.querySelector('.count') || 
                           document.querySelector(`[data-counter-display="${counterId}"]`);
        
        if (countDisplay) {
            countDisplay.textContent = newCount;
        } else {
            button.textContent = button.textContent.replace(/\d+/, newCount);
        }
    }

    showNotification(button) {
        const message = button.dataset.message || 'Button clicked!';
        const type = button.dataset.notificationType || 'info';
        
        this.createNotification(message, type);
    }

    createNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    animation: slideIn 0.3s ease;
                    max-width: 300px;
                    word-wrap: break-word;
                }

                .notification-success { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }
                .notification-error { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }
                .notification-warning { background: #fff3cd; color: #856404; border-left: 4px solid #ffc107; }
                .notification-info { background: #cce7ff; color: #004085; border-left: 4px solid #007bff; }

                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    showModal(button) {
        const title = button.dataset.modalTitle || 'Modal Title';
        const content = button.dataset.modalContent || 'Modal content goes here.';
        
        this.createModal(title, content);
    }

    createModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        modalOverlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary modal-close">Cancel</button>
                    <button class="btn btn-primary">OK</button>
                </div>
            </div>
        `;

        // Add modal styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1001;
                    animation: fadeIn 0.3s ease;
                }

                .modal {
                    background: white;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    animation: scaleIn 0.3s ease;
                }

                .modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px;
                    border-bottom: 1px solid #dee2e6;
                }

                .modal-header h3 {
                    margin: 0;
                    color: #333;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .modal-close:hover {
                    background: #f8f9fa;
                }

                .modal-body {
                    padding: 20px;
                }

                .modal-footer {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    padding: 20px;
                    border-top: 1px solid #dee2e6;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(modalOverlay);

        // Close modal handlers
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay || e.target.classList.contains('modal-close')) {
                modalOverlay.remove();
            }
        });

        // Escape key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                modalOverlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // Utility methods
    disableButton(button, duration = 3000) {
        button.disabled = true;
        button.classList.add('btn-disabled');
        
        setTimeout(() => {
            button.disabled = false;
            button.classList.remove('btn-disabled');
        }, duration);
    }

    setButtonLoading(button, loading = true) {
        if (loading) {
            button.classList.add('btn-loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
        }
    }

    createButton(options = {}) {
        const button = document.createElement('button');
        
        // Default options
        const defaults = {
            text: 'Button',
            variant: 'primary',
            size: 'default',
            disabled: false,
            classes: []
        };

        const config = { ...defaults, ...options };

        button.textContent = config.text;
        button.className = `btn btn-${config.variant}`;
        
        if (config.size !== 'default') {
            button.classList.add(`btn-${config.size}`);
        }
        
        config.classes.forEach(cls => button.classList.add(cls));
        
        if (config.disabled) {
            button.disabled = true;
        }

        if (config.onClick) {
            button.addEventListener('click', config.onClick);
        }

        return button;
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.buttonManager = new ButtonManager();
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ButtonManager;
}
