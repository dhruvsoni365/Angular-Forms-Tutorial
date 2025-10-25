// Button Component JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Click Counter Button
    let clickCount = 0;
    const clickCounter = document.getElementById('clickCounter');
    
    if (clickCounter) {
        clickCounter.addEventListener('click', function() {
            clickCount++;
            this.textContent = `Click me! (${clickCount})`;
            
            // Add a little shake animation
            this.style.animation = 'shake 0.3s';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    }

    // Toggle Button
    const toggleBtn = document.getElementById('toggleBtn');
    let isToggled = false;
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            isToggled = !isToggled;
            
            if (isToggled) {
                this.textContent = 'Toggled ON';
                this.classList.remove('btn-success');
                this.classList.add('btn-danger');
            } else {
                this.textContent = 'Toggle State';
                this.classList.remove('btn-danger');
                this.classList.add('btn-success');
            }
        });
    }

    // Animate Button
    const animateBtn = document.getElementById('animateBtn');
    
    if (animateBtn) {
        animateBtn.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 500);
        });
    }

    // Ripple Effect Button
    const rippleBtn = document.getElementById('rippleBtn');
    
    if (rippleBtn) {
        rippleBtn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    }

    // Loading Button Simulation
    const loadingBtn = document.getElementById('loadingBtn');
    
    if (loadingBtn) {
        loadingBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Complete!';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                }, 1500);
            }, 2000);
        });
    }

    // Button Group Functionality
    const buttonGroups = document.querySelectorAll('.btn-group');
    
    buttonGroups.forEach(group => {
        const buttons = group.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this group
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    });

    // Add hover sound effect (optional - requires Web Audio API)
    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Add a subtle scale effect on hover
            if (!this.disabled && !this.classList.contains('btn-loading')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled && !this.classList.contains('btn-loading')) {
                this.style.transform = '';
            }
        });
    });

    // Special button effects
    const neonBtn = document.querySelector('.btn-neon');
    if (neonBtn) {
        neonBtn.addEventListener('click', function() {
            this.style.animation = 'neonFlash 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }

    const shadowBtn = document.querySelector('.btn-shadow');
    if (shadowBtn) {
        shadowBtn.addEventListener('click', function() {
            this.style.boxShadow = '0 0 50px rgba(66, 153, 225, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '0 8px 32px rgba(66, 153, 225, 0.3)';
            }, 300);
        });
    }
});

// Ripple Effect Function
function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    element.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes neonFlash {
        0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 65, 0.3); }
        50% { box-shadow: 0 0 50px rgba(0, 255, 65, 0.8), 0 0 100px rgba(0, 255, 65, 0.4); }
    }
`;
document.head.appendChild(style);

// Button click sound (optional - uncomment if you want sound effects)
/*
function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add sound to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', playClickSound);
    });
});
*/

// Console log for debugging
console.log('Button Component JavaScript loaded successfully!');
console.log(`Total buttons found: ${document.querySelectorAll('.btn').length}`);
