/**
 * EUROGARD - Main JavaScript File
 * Handles mobile navigation and responsive interactions
 */

class EurogardApp {
    constructor() {
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.initMobileNavigation();
        this.initScrollBehavior();
        console.log('Eurogard app initialized successfully');
    }

    /**
     * Initialize mobile navigation functionality
     */
    initMobileNavigation() {
        // Get DOM elements
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const menuClose = document.getElementById('mobile-menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const menuLinks = document.querySelectorAll('#mobile-menu a');

        // Check if all elements exist
        if (!menuToggle || !menuClose || !mobileMenu || !mobileOverlay) {
            console.error('Mobile navigation elements not found');
            return;
        }

        // Menu toggle functionality
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Menu close functionality
        menuClose.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeMobileMenu();
        });

        // Overlay click to close
        mobileOverlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Close menu when clicking on menu links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        console.log('Mobile navigation initialized');
    }

    /**
     * Toggle mobile menu open/close
     */
    toggleMobileMenu() {
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const burgerIcon = document.getElementById('burger-icon');

        if (!mobileMenu || !mobileOverlay || !burgerIcon) return;

        // Open menu
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');

        // Show overlay
        mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
        mobileOverlay.classList.add('opacity-100');

        // Change burger icon
        burgerIcon.innerHTML = '✕';

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';

        this.mobileMenuOpen = true;

        // Add stagger animation to menu items
        this.animateMenuItems();
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const burgerIcon = document.getElementById('burger-icon');

        if (!mobileMenu || !mobileOverlay || !burgerIcon) return;

        // Close menu
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');

        // Hide overlay
        mobileOverlay.classList.remove('opacity-100');
        mobileOverlay.classList.add('opacity-0', 'pointer-events-none');

        // Reset burger icon
        burgerIcon.innerHTML = '☰';

        // Restore body scrolling
        document.body.style.overflow = '';

        this.mobileMenuOpen = false;
    }

    /**
     * Animate menu items with stagger effect
     */
    animateMenuItems() {
        const menuItems = document.querySelectorAll('#mobile-menu nav a, #mobile-menu p');
        
        menuItems.forEach((item, index) => {
            // Reset styles
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';

            // Animate with delay
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    /**
     * Initialize scroll behavior
     */
    initScrollBehavior() {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateNavigationOnScroll(lastScrollY);
                    lastScrollY = window.scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Update navigation visibility based on scroll
     */
    updateNavigationOnScroll(lastScrollY) {
        const currentScrollY = window.scrollY;
        const mobileNav = document.querySelector('.lg\\:hidden.fixed.top-0');
        const mobileCarousel = document.querySelector('.lg\\:hidden.fixed.top-18');
        
        if (!mobileNav || window.innerWidth >= 1024) return;

        const scrollDifference = currentScrollY - lastScrollY;
        const scrollThreshold = 100;

        if (currentScrollY > scrollThreshold) {
            if (scrollDifference > 0 && !this.mobileMenuOpen) {
                // Scrolling down - hide nav and carousel
                mobileNav.style.transform = 'translateY(-100%)';
                mobileNav.style.transition = 'transform 0.3s ease';
                
                if (mobileCarousel) {
                    mobileCarousel.style.transform = 'translateY(-100%)';
                    mobileCarousel.style.transition = 'transform 0.3s ease';
                }
            } else if (scrollDifference < 0) {
                // Scrolling up - show nav and carousel
                mobileNav.style.transform = 'translateY(0)';
                mobileNav.style.transition = 'transform 0.3s ease';
                
                if (mobileCarousel) {
                    mobileCarousel.style.transform = 'translateY(0)';
                    mobileCarousel.style.transition = 'transform 0.3s ease';
                }
            }
        } else {
            // Always show nav and carousel at top of page
            mobileNav.style.transform = 'translateY(0)';
            
            if (mobileCarousel) {
                mobileCarousel.style.transform = 'translateY(0)';
            }
        }
    }

    /**
     * Utility method to handle form submissions
     */
    initForms() {
        const contactForm = document.querySelector('form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Form submitted'); // Replace with actual form handling
                // Add your form submission logic here
            });
        }
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 100; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (this.mobileMenuOpen) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }

    /**
     * Initialize intersection observer for animations
     */
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('section');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Handle window resize events
     */
    initResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Close mobile menu on desktop
                if (window.innerWidth >= 1024 && this.mobileMenuOpen) {
                    this.closeMobileMenu();
                }
            }, 150);
        });
    }
}

// Initialize the application
const eurogardApp = new EurogardApp();