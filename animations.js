// Simple, clean animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Initialize navigation behavior
    initNavigation();
    
    // Initialize parallax scrolling
    initParallax();
    
    // Add hover classes to service items
    initServiceCards();
    
    // Initialize form enhancements
    initFormEffects();
});

// Fade-in on scroll
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add fade-in to specific elements with stagger
    const fadeElements = [
        {selector: '.hero h1', delay: 'stagger-1'},
        {selector: '.hero h2', delay: 'stagger-2'},
        {selector: '.hero button', delay: 'stagger-3'},
        {selector: '.service-item', delay: 'stagger-1'},
        {selector: '.feature-item', delay: 'stagger-1'},
        {selector: '.review-card', delay: 'stagger-1'}
    ];
    
    fadeElements.forEach(({selector, delay}) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('fade-in');
            if (delay === 'stagger-1') {
                el.classList.add(`stagger-${(index % 3) + 1}`);
            } else {
                el.classList.add(delay);
            }
            observer.observe(el);
        });
    });
}

// Navigation hide/show on scroll
function initNavigation() {
    const nav = document.querySelector('.desktop-nav');
    let lastScroll = 0;
    let ticking = false;
    
    function updateNav() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for backdrop blur
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navigation
        if (currentScroll > lastScroll && currentScroll > 200) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });
}

// Simple parallax for background images
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .ani20');
    
    parallaxElements.forEach(el => {
        el.classList.add('parallax-bg');
    });
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            el.style.backgroundPosition = `center ${yPos}px`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Service cards setup
function initServiceCards() {
    // Find service items and add class
    const serviceItems = document.querySelectorAll('section:nth-of-type(2) .flex > div');
    serviceItems.forEach(item => {
        item.classList.add('service-item');
    });
    
    // Find feature items and add class
    const featureItems = document.querySelectorAll('.bg-\\[\\#EDDE14\\] > div');
    featureItems.forEach(item => {
        item.classList.add('feature-item');
    });
    
    // Find review cards and add class
    const reviewCards = document.querySelectorAll('.bg-white.p-10');
    reviewCards.forEach(card => {
        card.classList.add('review-card');
    });
}

// Form effects
function initFormEffects() {
    const form = document.querySelector('form');
    if (!form) return;
    
    // Add class to form for animations
    form.classList.add('contact-form');
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Simple loading state
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate submission
        setTimeout(() => {
            button.textContent = '✓ Sent!';
            button.style.borderColor = '#4CAF50';
            button.style.color = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.borderColor = '';
                button.style.color = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
    
    // Add accent line class to yellow bars
    document.querySelectorAll('.bg-\\[\\#EDDE14\\].w-15.h-2, .bg-\\[\\#EDDE14\\].w-16.h-1').forEach(el => {
        el.classList.add('accent-line');
    });
    
    // Add social icon class
    const socialIcons = document.querySelectorAll('.bg-\\[\\#2A2A2A\\] a');
    socialIcons.forEach(icon => {
        icon.classList.add('social-icon');
    });
}