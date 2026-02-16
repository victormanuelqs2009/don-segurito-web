/* ================================================
   DON SEGURITO - JAVASCRIPT FUNCTIONALITY
   ================================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    /* ================================================
       NAVIGATION
       ================================================ */

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for styling
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle && navToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    /* ================================================
       SMOOTH SCROLLING
       ================================================ */

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only prevent default for internal links (not just #)
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ================================================
       WHATSAPP WIDGET
       ================================================ */

    const whatsappWidget = document.getElementById('whatsapp-widget');
    const whatsappButton = document.getElementById('whatsapp-button');
    const whatsappTooltip = document.getElementById('whatsapp-tooltip');
    const whatsappClose = document.getElementById('whatsapp-close');

    let isTooltipOpen = false;
    let hasInteracted = false;

    // Auto-open tooltip after 3 seconds
    setTimeout(() => {
        if (!hasInteracted) {
            openTooltip();
        }
    }, 3000);

    // Hide pulse after 10 seconds
    setTimeout(() => {
        if (whatsappWidget) {
            whatsappWidget.classList.add('hide-pulse');
        }
    }, 10000);

    // Toggle tooltip
    function toggleTooltip() {
        hasInteracted = true;
        if (isTooltipOpen) {
            closeTooltip();
        } else {
            openTooltip();
        }
    }

    function openTooltip() {
        isTooltipOpen = true;
        if (whatsappTooltip) {
            whatsappTooltip.classList.add('active');
        }
    }

    function closeTooltip() {
        isTooltipOpen = false;
        if (whatsappTooltip) {
            whatsappTooltip.classList.remove('active');
        }
    }

    // Button click handler
    if (whatsappButton) {
        whatsappButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTooltip();
            console.log('WhatsApp widget toggled');
        });
    }

    // Close button handler
    if (whatsappClose) {
        whatsappClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeTooltip();
        });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (whatsappWidget && !whatsappWidget.contains(e.target) && isTooltipOpen) {
            closeTooltip();
        }
    });

    // Prevent tooltip from closing when clicking inside it
    if (whatsappTooltip) {
        whatsappTooltip.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /* ================================================
       SCROLL ANIMATIONS
       ================================================ */

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe benefits
    const benefits = document.querySelectorAll('.benefit');
    benefits.forEach((benefit, index) => {
        benefit.style.opacity = '0';
        benefit.style.transform = 'translateY(20px)';
        benefit.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
        observer.observe(benefit);
    });

    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add animate-in styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) translateX(0) !important;
        }
    `;
    document.head.appendChild(style);

    /* ================================================
       ACTIVE NAVIGATION LINK
       ================================================ */

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    /* ================================================
       PERFORMANCE OPTIMIZATIONS
       ================================================ */

    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(highlightNavigation, 50));

    /* ================================================
       ACCESSIBILITY ENHANCEMENTS
       ================================================ */

    // Add keyboard navigation support
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    // Ensure WhatsApp button is accessible via keyboard
    if (whatsappButton) {
        whatsappButton.setAttribute('tabindex', '0');
        whatsappButton.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    /* ================================================
       DYNAMIC CONTENT UPDATES
       ================================================ */

    // Update current year in footer (if needed)
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    /* ================================================
       STATS COUNTER ANIMATION (Optional Enhancement)
       ================================================ */

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Animate stats when they come into view
    const statsSection = document.querySelector('.hero__stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat__number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/\D/g, ''));
                        if (!isNaN(number) && text.includes('+')) {
                            stat.textContent = '0+';
                            animateCounter(stat, number);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    /* ================================================
       CONSOLE LOG - DEV INFO
       ================================================ */

    console.log('%c🛠️ Don Segurito Website Loaded Successfully! ',
        'background: linear-gradient(135deg, #2563eb 0%, #fb923c 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    console.log('%cWhatsApp: +57 322 614 5318',
        'color: #25d366; font-size: 14px; font-weight: bold;');

});

/* ================================================
   UTILITY FUNCTIONS
   ================================================ */

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}
