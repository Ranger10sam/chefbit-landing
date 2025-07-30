// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
});

// Mobile Menu
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-menu-content a');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

mobileToggle.addEventListener('click', toggleMobileMenu);
mobileClose.addEventListener('click', toggleMobileMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Phone showcase carousel
const phoneScreens = document.querySelectorAll('.phone-screen');
let currentScreen = 0;

function rotateScreens() {
    phoneScreens.forEach(screen => screen.classList.remove('active'));
    currentScreen = (currentScreen + 1) % phoneScreens.length;
    phoneScreens[currentScreen].classList.add('active');
}

// Rotate screens every 3 seconds
setInterval(rotateScreens, 3000);

// Parallax effect for hero elements
const heroContent = document.querySelector('.hero-content');
const featureFloats = document.querySelectorAll('.feature-float');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${rate * 0.3}px)`;
    }
    
    featureFloats.forEach((float, index) => {
        const speed = 0.5 + (index * 0.1);
        float.style.transform = `translateY(${rate * speed}px)`;
    });
});

// Form submission (newsletter)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Show success message (you can replace this with actual form submission)
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            e.target.reset();
        }, 3000);
    });
}

// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => imageObserver.observe(img));

// Counter animation for stats
const stats = document.querySelectorAll('.stat-item h3');
const statsOptions = {
    threshold: 1,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
            statsObserver.unobserve(stat);
        }
    });
}, statsOptions);

stats.forEach(stat => statsObserver.observe(stat));

// Add hover effect to feature images
const featureImages = document.querySelectorAll('.phone-mockup');
featureImages.forEach(mockup => {
    mockup.addEventListener('mouseenter', () => {
        mockup.style.transform = 'scale(1.05)';
    });
    
    mockup.addEventListener('mouseleave', () => {
        mockup.style.transform = 'scale(1)';
    });
});

// Carousel for demo section
const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
    // Clone images for infinite scroll
    const images = carouselTrack.querySelectorAll('img');
    images.forEach(img => {
        const clone = img.cloneNode(true);
        carouselTrack.appendChild(clone);
    });
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .plan-cta');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}); 