document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const cafeCards = document.querySelectorAll('.cafe-card');
    const navItems = document.querySelectorAll('.nav-item');
    const feedContainer = document.querySelector('.feed-container');

    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (btn.textContent === '♡') {
                btn.textContent = '♥';
                btn.style.color = '#EC4899';
                btn.style.transform = 'scale(1.3)';
                
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 200);
            } else {
                btn.textContent = '♡';
                btn.style.color = '#1a1a1a';
            }
        });
    });

    cafeCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });

    let isScrolling;
    feedContainer.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        
        feedContainer.style.scrollBehavior = 'smooth';
        
        isScrolling = setTimeout(() => {
            feedContainer.style.scrollBehavior = 'auto';
        }, 100);
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cafeCards.forEach(card => {
        observer.observe(card);
    });

    const tagPills = document.querySelectorAll('.tag-pill');
    tagPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.stopPropagation();
            pill.style.background = '#8B5CF6';
            pill.style.color = 'white';
            
            setTimeout(() => {
                pill.style.background = '#f3f4f6';
                pill.style.color = '#4b5563';
            }, 300);
        });
    });

    const time = document.querySelector('.time');
    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        time.textContent = `${hours}:${minutes}`;
    };
    
    updateTime();
    setInterval(updateTime, 60000);

    const avatar = document.querySelector('.avatar');
    avatar.addEventListener('click', () => {
        avatar.style.transform = 'rotate(360deg) scale(1.1)';
        avatar.style.transition = 'transform 0.6s ease';
        
        setTimeout(() => {
            avatar.style.transform = 'rotate(0deg) scale(1)';
        }, 600);
    });
});
