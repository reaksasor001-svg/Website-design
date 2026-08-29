/* ===========================
   BLOOM & BLOSSOM JAVASCRIPT
   Fresh Flower Shop Interactivity
   =========================== */

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add to Cart Button Functionality
const addToCartButtons = document.querySelectorAll('.btn-small');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const flowerName = button.closest('.gallery-item')?.querySelector('h3')?.textContent || 
                          button.closest('.flower-card')?.querySelector('h3')?.textContent;
        const price = button.closest('.gallery-item')?.querySelector('.price')?.textContent ||
                     button.closest('.flower-card')?.querySelector('.price')?.textContent;
        
        // Show feedback
        const originalText = button.textContent;
        button.textContent = '✓ Added!';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
        
        // Log to console (in a real app, this would add to cart)
        console.log(`Added ${flowerName} ${price} to cart`);
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Highlight active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    // In a single-page app, you'd check which section is in view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Lazy Loading for Images (Enhanced Performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bloom & Blossom website loaded successfully!');
    
    // Add animation to cards on load
    const cards = document.querySelectorAll('.flower-card, .gallery-item, .feature-item');
    cards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease ${index * 0.1}s both`;
    });
});

// Add CSS animation dynamically if not in stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Phone number formatting (optional)
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
            e.target.value = value;
        }
    });
});

// Scroll to top button (optional feature)
const scrollToTopButton = document.createElement('button');
scrollToTopButton.id = 'scrollToTop';
scrollToTopButton.innerHTML = '↑ Top';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #e91e63;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 99;
    font-weight: bold;
    width: 50px;
    height: 50px;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'flex';
        scrollToTopButton.style.alignItems = 'center';
        scrollToTopButton.style.justifyContent = 'center';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Log startup message
console.log('%c🌸 Welcome to Bloom & Blossom 🌸', 'color: #e91e63; font-size: 16px; font-weight: bold;');
console.log('%cFresh Flowers Shop Website', 'color: #ff6b9d; font-size: 14px;');
