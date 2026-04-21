// DOM Elements
const menuIconBtn = document.getElementById('menuIconBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle Dropdown Menu
menuIconBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu-icon-container')) {
        dropdownMenu.classList.remove('active');
    }
});

// Toggle Hamburger Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.mobile-menu')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Get in Touch Button
function handleGetInTouch() {
    // Show alert or redirect to contact
    alert('Thank you for your interest! Feel free to reach out via the social links in the menu.');
    // Alternatively, you could open email:
    // window.location.href = 'mailto:hello@example.com';
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards, project cards, blog cards, and timeline items
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.skill-card, .project-card, .blog-card, .timeline-item, .timeline-content'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });

    // Add initial fade-in delay
    elementsToObserve.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add smooth scroll behavior to body
document.documentElement.style.scrollBehavior = 'smooth';

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key to close dropdowns
    if (e.key === 'Escape') {
        dropdownMenu.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }

    // Tab key navigation for dropdown
    if (e.key === 'Tab' && dropdownMenu.classList.contains('active')) {
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        const activeElement = document.activeElement;
        
        // If current focus is on the last dropdown link, close the dropdown
        if (activeElement === dropdownLinks[dropdownLinks.length - 1]) {
            dropdownMenu.classList.remove('active');
        }
    }
});

// Add active state to navbar links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add click animation to buttons
const buttons = document.querySelectorAll('button, a');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('cta-button')) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
        }
    });
});

// Prevent default dropdown link behavior if it's not a real link
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Let the link navigate normally or open in new tab
        // Links already have href, so no additional handling needed
    });
});

// Add console message
console.log(
    '%cWelcome to Ahmad Rizki\'s Portfolio!',
    'font-size: 20px; color: #6366f1; font-weight: bold;'
);
console.log(
    '%cFeel free to explore and connect!',
    'font-size: 14px; color: #b0b9d4;'
);

// Performance: Disable animations on reduced-motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
    // You can add more animation disabling logic here if needed
}
