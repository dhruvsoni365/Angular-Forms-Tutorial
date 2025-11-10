document.addEventListener('DOMContentLoaded', function() {
    const cardsWrapper = document.getElementById('cardsWrapper');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const indicatorDots = document.getElementById('indicatorDots');
    const projectCards = document.querySelectorAll('.project-card');

    // Scroll amount (one card width + gap)
    const scrollAmount = 380;

    // Initialize scroll indicator dots
    function initIndicatorDots() {
        const numCards = projectCards.length;
        const cardsPerView = Math.floor(cardsWrapper.clientWidth / 380);
        const numDots = Math.ceil(numCards / cardsPerView);

        indicatorDots.innerHTML = '';
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToSection(i));
            indicatorDots.appendChild(dot);
        }
    }

    // Scroll to specific section
    function scrollToSection(index) {
        const cardsPerView = Math.floor(cardsWrapper.clientWidth / 380);
        const scrollPosition = index * cardsPerView * scrollAmount;
        cardsWrapper.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Update active indicator dot
    function updateIndicator() {
        const dots = indicatorDots.querySelectorAll('.indicator-dot');
        const cardsPerView = Math.floor(cardsWrapper.clientWidth / 380);
        const scrollPosition = cardsWrapper.scrollLeft;
        const activeIndex = Math.round(scrollPosition / (cardsPerView * scrollAmount));

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });

        updateScrollButtons();
    }

    // Update scroll button states
    function updateScrollButtons() {
        const maxScroll = cardsWrapper.scrollWidth - cardsWrapper.clientWidth;
        scrollLeftBtn.disabled = cardsWrapper.scrollLeft <= 0;
        scrollRightBtn.disabled = cardsWrapper.scrollLeft >= maxScroll - 5;
    }

    // Scroll left button
    scrollLeftBtn.addEventListener('click', () => {
        cardsWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Scroll right button
    scrollRightBtn.addEventListener('click', () => {
        cardsWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Listen to scroll events
    cardsWrapper.addEventListener('scroll', () => {
        updateIndicator();
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initIndicatorDots();
            updateIndicator();
        }, 250);
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startScrollLeft = 0;

    cardsWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        startScrollLeft = cardsWrapper.scrollLeft;
        isDragging = true;
    }, { passive: true });

    cardsWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        cardsWrapper.scrollLeft = startScrollLeft + diff;
    }, { passive: true });

    cardsWrapper.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Mouse drag support for desktop
    let mouseDown = false;
    let startX;
    let scrollLeft;

    cardsWrapper.addEventListener('mousedown', (e) => {
        mouseDown = true;
        startX = e.pageX - cardsWrapper.offsetLeft;
        scrollLeft = cardsWrapper.scrollLeft;
        cardsWrapper.style.cursor = 'grabbing';
    });

    cardsWrapper.addEventListener('mouseleave', () => {
        mouseDown = false;
        cardsWrapper.style.cursor = 'grab';
    });

    cardsWrapper.addEventListener('mouseup', () => {
        mouseDown = false;
        cardsWrapper.style.cursor = 'grab';
    });

    cardsWrapper.addEventListener('mousemove', (e) => {
        if (!mouseDown) return;
        e.preventDefault();
        const x = e.pageX - cardsWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        cardsWrapper.scrollLeft = scrollLeft - walk;
    });

    // Set cursor style
    cardsWrapper.style.cursor = 'grab';

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            cardsWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowRight') {
            cardsWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

    // Handle view button clicks
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');
            const title = card.querySelector('.card-title').textContent;
            
            // Add animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);

            // Show alert (replace with actual navigation)
            setTimeout(() => {
                alert(`Opening project: ${title}\n\nThis would navigate to the project details page.`);
            }, 200);
        });
    });

    // Handle card clicks
    projectCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('view-btn')) {
                const title = card.querySelector('.card-title').textContent;
                console.log(`Card clicked: ${title}`);
            }
        });
    });

    // Auto-scroll feature (optional - uncomment to enable)
    /*
    let autoScrollInterval;
    let isAutoScrolling = false;

    function startAutoScroll() {
        if (isAutoScrolling) return;
        isAutoScrolling = true;
        
        autoScrollInterval = setInterval(() => {
            const maxScroll = cardsWrapper.scrollWidth - cardsWrapper.clientWidth;
            
            if (cardsWrapper.scrollLeft >= maxScroll - 5) {
                cardsWrapper.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                cardsWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000);
    }

    function stopAutoScroll() {
        isAutoScrolling = false;
        clearInterval(autoScrollInterval);
    }

    // Start auto-scroll after 2 seconds
    setTimeout(startAutoScroll, 2000);

    // Stop auto-scroll on user interaction
    cardsWrapper.addEventListener('mouseenter', stopAutoScroll);
    cardsWrapper.addEventListener('touchstart', stopAutoScroll);
    scrollLeftBtn.addEventListener('click', stopAutoScroll);
    scrollRightBtn.addEventListener('click', stopAutoScroll);
    */

    // Initialize
    initIndicatorDots();
    updateIndicator();

    // Add smooth entrance animation
    setTimeout(() => {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
            }, index * 100);
        });
    }, 100);

    // Log initialization
    console.log('Project card scroller initialized');
    console.log(`Total cards: ${projectCards.length}`);
});
