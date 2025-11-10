// Blog page interactivity
document.addEventListener('DOMContentLoaded', function() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Add click event to each card
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If the click is on the "Read More" link, let it handle navigation
            if (e.target.classList.contains('card-link')) {
                e.preventDefault();
                const title = this.querySelector('.card-title').textContent;
                alert(`Opening article: "${title}"\n\nThis would navigate to the full article page.`);
            }
        });
        
        // Add hover effect for card content
        card.addEventListener('mouseenter', function() {
            const link = this.querySelector('.card-link');
            link.style.transform = 'translateX(5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            const link = this.querySelector('.card-link');
            link.style.transform = 'translateX(0)';
        });
    });
    
    // Smooth scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all blog cards
    blogCards.forEach(card => {
        observer.observe(card);
    });
});
