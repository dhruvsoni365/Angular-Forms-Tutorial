document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('radioForm');
    const result = document.getElementById('result');
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get the selected radio button value
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        
        if (selectedOption) {
            const answer = selectedOption.value;
            showResult(answer);
        } else {
            showError('Please select an option before submitting.');
        }
    });
    
    // Add click animation to radio options
    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    function showResult(answer) {
        result.className = 'result success';
        result.innerHTML = `
            <strong>Thank you for your response!</strong><br>
            You selected: <em>${answer.charAt(0).toUpperCase() + answer.slice(1)}</em>
        `;
        result.style.display = 'block';
        
        // Scroll to result
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function showError(message) {
        result.className = 'result error';
        result.textContent = message;
        result.style.display = 'block';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            result.style.display = 'none';
        }, 3000);
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.activeElement.type === 'radio') {
            form.dispatchEvent(new Event('submit'));
        }
    });
});
