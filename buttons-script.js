/**
 * Button Showcase Interactive JavaScript
 * Handles button interactions, demos, and dynamic behavior
 */

class ButtonShowcase {
    constructor() {
        this.clickCount = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupToggleButtons();
        this.setupLoadingButtons();
        this.setupDemoButton();
        this.addRippleEffect();
        console.log('Button Showcase initialized');
    }

    setupEventListeners() {
        // Add global click listener for all buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn:not(:disabled)')) {
                this.handleButtonClick(e.target);
            }
        });

        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement.matches('.btn:not(:disabled)')) {
                    e.preventDefault();
                    activeElement.click();
                }
            }
        });
    }

    handleButtonClick(button) {
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Log button interaction
        console.log(`Button clicked: ${button.textContent.trim()}`);
    }

    setupToggleButtons() {
        const toggleButtons = document.querySelectorAll('.btn-toggle');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentState = button.getAttribute('data-toggle') === 'true';
                const newState = !currentState;
                
                button.setAttribute('data-toggle', newState.toString());
                button.textContent = newState ? 'Toggle On' : 'Toggle Off';
                
                // Add visual feedback
                this.showFeedback(button, `Toggle ${newState ? 'ON' : 'OFF'}`);
            });
        });
    }

    setupLoadingButtons() {
        const loadingButtons = document.querySelectorAll('.btn-loading');
        
        loadingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isLoading = button.getAttribute('data-loading') === 'true';
                
                if (!isLoading) {
                    this.startLoading(button);
                    
                    // Simulate loading time
                    setTimeout(() => {
                        this.stopLoading(button);
                    }, 3000);
                }
            });
        });
    }

    startLoading(button) {
        button.setAttribute('data-loading', 'true');
        button.disabled = true;
        
        const textElement = button.querySelector('.btn-text');
        if (textElement) {
            textElement.textContent = 'Loading...';
        }
    }

    stopLoading(button) {
        button.setAttribute('data-loading', 'false');
        button.disabled = false;
        
        const textElement = button.querySelector('.btn-text');
        if (textElement) {
            textElement.textContent = 'Load Data';
        }
        
        this.showFeedback(button, 'Loading Complete!');
    }

    setupDemoButton() {
        const demoButton = document.getElementById('demoButton');
        const clickCountElement = document.getElementById('clickCount');
        const lastClickedElement = document.getElementById('lastClicked');
        
        if (demoButton) {
            demoButton.addEventListener('click', () => {
                this.clickCount++;
                const now = new Date().toLocaleTimeString();
                
                clickCountElement.textContent = `Clicks: ${this.clickCount}`;
                lastClickedElement.textContent = `Last clicked: ${now}`;
                
                // Change button text based on click count
                if (this.clickCount === 1) {
                    demoButton.textContent = 'Great! Click again!';
                } else if (this.clickCount === 5) {
                    demoButton.textContent = 'You\'re on fire! 🔥';
                } else if (this.clickCount === 10) {
                    demoButton.textContent = 'Click Master! 🏆';
                } else if (this.clickCount > 10) {
                    demoButton.textContent = `${this.clickCount} clicks! Amazing!`;
                }
                
                // Add celebration effect for milestones
                if (this.clickCount % 5 === 0) {
                    this.addCelebrationEffect(demoButton);
                }
            });
        }
    }

    addRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    showFeedback(element, message) {
        // Create feedback tooltip
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.875rem;
            white-space: nowrap;
            z-index: 1000;
            animation: fadeInOut 2s ease-in-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    addCelebrationEffect(element) {
        // Create celebration particles
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd93d'];
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (i * 30) * Math.PI / 180;
            const distance = 50 + Math.random() * 30;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: celebrate 0.8s ease-out forwards;
                animation-delay: ${i * 0.05}s;
                pointer-events: none;
                z-index: 1000;
            `;
            
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            
            element.style.position = 'relative';
            element.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Utility method to create button programmatically
    createButton(text, type = 'primary', size = 'medium', options = {}) {
        const button = document.createElement('button');
        button.className = `btn btn-${type} btn-${size}`;
        button.textContent = text;
        
        // Apply additional options
        if (options.disabled) button.disabled = true;
        if (options.icon) {
            const icon = document.createElement('span');
            icon.className = 'icon';
            icon.textContent = options.icon;
            button.insertBefore(icon, button.firstChild);
            button.classList.add('btn-icon');
        }
        if (options.onClick) {
            button.addEventListener('click', options.onClick);
        }
        
        return button;
    }

    // Method to add custom animations
    addCustomAnimation(element, animationName, duration = '0.3s') {
        element.style.animation = `${animationName} ${duration} ease-in-out`;
        
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }

    // Theme switcher (bonus feature)
    switchTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('button-showcase-theme', theme);
    }

    // Initialize theme from storage
    initTheme() {
        const savedTheme = localStorage.getItem('button-showcase-theme');
        if (savedTheme) {
            this.switchTheme(savedTheme);
        }
    }
}

// CSS animations (to be injected)
const animationStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
    
    @keyframes celebrate {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
        }
        40%, 43% {
            transform: translate3d(0, -15px, 0);
        }
        70% {
            transform: translate3d(0, -7px, 0);
        }
        90% {
            transform: translate3d(0, -2px, 0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize the button showcase when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.buttonShowcase = new ButtonShowcase();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ButtonShowcase;
}
