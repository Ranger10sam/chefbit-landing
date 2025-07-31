/* ========================================
   ChefBit - Advanced Interactive Script
   Mobile-First with Modern Effects
   ======================================== */

// Global variables
let isLoading = true;
let particleSystem = null;
let phoneSwiper = null;
let testimonialSwiper = null;

// ========================================
// Loading Screen & Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Start loading sequence
    simulateLoading();
    
    // Initialize components after DOM is ready
    setTimeout(() => {
        initializeParticles();
        initializeAnimations();
        initializeSwiper();
        initializeScrollEffects();
        initializeInteractions();
        initializeMobileFeatures();
        initializePricing();
        
        // Hide loading screen
        hideLoadingScreen();
    }, 2000);
}

function simulateLoading() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
    }, 100);
}

function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        isLoading = false;
        
        // Trigger entrance animations
        setTimeout(() => {
            document.body.classList.add('loaded');
            triggerEntranceAnimations();
        }, 300);
    }
}

// ========================================
// Particle System (Mobile Optimized)
// ========================================
function initializeParticles() {
    if (window.innerWidth < 768) return; // Skip on mobile for performance
    
    const canvas = document.getElementById('particle-canvas');
    if (!canvas || !window.THREE) return;
    
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particles
        const particleCount = window.innerWidth < 1024 ? 50 : 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            
            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            });
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0xFF6B35,
            size: 0.1,
            transparent: true,
            opacity: 0.6
        });
        
        const particleSystem = new THREE.Points(particles, material);
        scene.add(particleSystem);
        
        camera.position.z = 5;
        
        // Animation loop
        function animate() {
            if (isLoading) return;
            
            requestAnimationFrame(animate);
            
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;
                
                // Wrap around
                if (Math.abs(positions[i * 3]) > 10) velocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 10) velocities[i].z *= -1;
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
    } catch (error) {
        console.log('Particle system not available, continuing without it');
    }
}

// ========================================
// Advanced Animation System
// ========================================
function initializeAnimations() {
    // Initialize AOS with mobile-first settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50, // Smaller offset for mobile
            delay: 0,
            disable: function() {
                return window.innerWidth < 768 && window.DeviceMotionEvent;
            }
        });
    }
    
    // Custom animations
    initializeCounters();
    initializeTextAnimations();
    initializeScrollTriggers();
}

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-item[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const counter = element.querySelector('h3');
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        counter.textContent = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function initializeTextAnimations() {
    // Typing effect for hero title (mobile-friendly)
    if (window.innerWidth > 768) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            heroTitle.style.opacity = '1';
            
            let index = 0;
            function typeText() {
                if (index < text.length) {
                    heroTitle.innerHTML = text.slice(0, index + 1);
                    index++;
                    setTimeout(typeText, 50);
                }
            }
            
            setTimeout(typeText, 1000);
        }
    }
}

// ========================================
// Swiper Initialization
// ========================================
function initializeSwiper() {
    if (typeof Swiper === 'undefined') return;
    
    // Phone showcase swiper
    phoneSwiper = new Swiper('.phone-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        on: {
            slideChange: function() {
                // Add slide change effects
                this.slides.forEach((slide, index) => {
                    if (index === this.activeIndex) {
                        slide.style.transform += ' scale(1.05)';
                    } else {
                        slide.style.transform = slide.style.transform.replace(' scale(1.05)', '');
                    }
                });
            }
        }
    });
    
    // Testimonials swiper
    testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
}

// ========================================
// Scroll Effects & Parallax
// ========================================
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        
        // Navbar effects
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Parallax effects (desktop only)
        if (window.innerWidth > 768) {
            const parallaxElements = document.querySelectorAll('.feature-float');
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Initial call
    updateScrollEffects();
}

function initializeScrollTriggers() {
    // Smooth scroll for anchor links
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
}

// ========================================
// Interactive Features
// ========================================
function initializeInteractions() {
    initializeFAB();
    initializeButtons();
    initializeCards();
    initializeForms();
}

function initializeFAB() {
    const fabMain = document.querySelector('.fab-main');
    const fabOptions = document.querySelector('.fab-options');
    
    if (fabMain && fabOptions) {
        fabMain.addEventListener('click', () => {
            fabMain.classList.toggle('active');
            fabOptions.classList.toggle('active');
        });
        
        // Close FAB when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fab-container')) {
                fabMain.classList.remove('active');
                fabOptions.classList.remove('active');
            }
        });
    }
}

function initializeButtons() {
    // Ripple effect for buttons
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
    
    // Pulse animation for primary buttons
    const primaryButtons = document.querySelectorAll('.pulse-btn');
    primaryButtons.forEach(button => {
        setInterval(() => {
            button.style.transform = 'scale(1.02)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
        }, 3000);
    });
}

function initializeCards() {
    // Interactive hover effects for cards
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function initializeForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    
    // Simulate API call
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Subscribed! ✓';
        button.style.background = '#10B981';
        
        setTimeout(() => {
            button.textContent = 'Subscribe';
            button.style.background = '';
            button.disabled = false;
            form.reset();
        }, 3000);
    }, 1000);
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            'email': email
        });
    }
}

// ========================================
// Mobile-First Features
// ========================================
function initializeMobileFeatures() {
    initializeMobileMenu();
    initializeTouchGestures();
    initializeMobileOptimizations();
}

function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Update ARIA attributes
        const isOpen = mobileMenu.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(toggleMobileMenu, 300); // Delay for smooth transition
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

function initializeTouchGestures() {
    // Swipe gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - open menu
                const mobileMenu = document.querySelector('.mobile-menu');
                if (!mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.add('active');
                }
            } else {
                // Swipe right - close menu
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
}

function initializeMobileOptimizations() {
    // Optimize images for mobile
    if (window.innerWidth < 768) {
        const images = document.querySelectorAll('img[src*="jpg"], img[src*="png"]');
        images.forEach(img => {
            img.loading = 'lazy';
            img.style.willChange = 'auto'; // Reduce memory usage
        });
    }
    
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 500);
    });
}

// ========================================
// Pricing Features
// ========================================
function initializePricing() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    if (toggle) {
        toggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            monthlyPrices.forEach(price => {
                price.style.display = isYearly ? 'none' : 'inline';
            });
            
            yearlyPrices.forEach(price => {
                price.style.display = isYearly ? 'inline' : 'none';
            });
            
            // Add animation effect
            document.querySelectorAll('.pricing-card').forEach(card => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
            });
        });
    }
}

// ========================================
// Demo & Media Functions
// ========================================
function playDemo() {
    // Simulate video play (replace with actual video implementation)
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const playButton = document.querySelector('.play-button');
    
    if (videoPlaceholder && playButton) {
        playButton.style.transform = 'scale(0)';
        videoPlaceholder.style.position = 'relative';
        
        // Create play overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            z-index: 10;
        `;
        overlay.innerHTML = '▶ Demo Video Playing...';
        
        videoPlaceholder.appendChild(overlay);
        
        // Remove overlay after 3 seconds (simulate video)
        setTimeout(() => {
            overlay.remove();
            playButton.style.transform = '';
        }, 3000);
    }
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'video_play', {
            'video_title': 'ChefBit Demo'
        });
    }
}

// ========================================
// Utility Functions
// ========================================
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// Performance Monitoring
// ========================================
function initializePerformanceMonitoring() {
    // Monitor core web vitals
    if ('web-vital' in window) {
        web-vital.getFCP(console.log);
        web-vital.getLCP(console.log);
        web-vital.getFID(console.log);
        web-vital.getCLS(console.log);
    }
    
    // Monitor memory usage on mobile
    if (performance.memory && window.innerWidth < 768) {
        setInterval(() => {
            const memoryInfo = performance.memory;
            const usage = (memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100;
            
            if (usage > 80) {
                // Reduce animations and effects
                document.body.classList.add('performance-mode');
            }
        }, 30000);
    }
}

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', (e) => {
    console.error('ChefBit Error:', e.error);
    
    // Graceful degradation
    if (e.error.message.includes('AOS') || e.error.message.includes('Swiper')) {
        console.log('Animation library not loaded, continuing with basic functionality');
    }
});

// ========================================
// Entrance Animations
// ========================================
function triggerEntranceAnimations() {
    // Hero entrance
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 1s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Stagger animation for cards
    const cards = document.querySelectorAll('.feature-card, .step-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });
}

// ========================================
// Initialize Performance Monitoring
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializePerformanceMonitoring();
});

// ========================================
// Export for global access
// ========================================
window.ChefBit = {
    playDemo,
    initializeApp,
    hideLoadingScreen
}; 