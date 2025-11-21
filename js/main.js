// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', () => {
    if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'flex';
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Sticky Navigation Bar
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Floating Button Visibility
// ============================================
const floatingBtn = document.getElementById('floatingBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        floatingBtn.classList.add('visible');
    } else {
        floatingBtn.classList.remove('visible');
    }
});

// ============================================
// Before/After Comparison Slider
// ============================================
const comparisonRange = document.getElementById('comparisonRange');
const afterImage = document.getElementById('afterImage');
const comparisonDivider = document.getElementById('comparisonDivider');

if (comparisonRange && afterImage && comparisonDivider) {
    comparisonRange.addEventListener('input', (e) => {
        const value = e.target.value;
        afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        comparisonDivider.style.left = `${value}%`;
    });
}

// ============================================
// Booking Modal Functions
// ============================================
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');

function openBookingModal(serviceType = '') {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set minimum date to today
    const bookingDate = document.getElementById('bookingDate');
    const today = new Date().toISOString().split('T')[0];
    bookingDate.setAttribute('min', today);
    
    // Pre-select service type if provided
    if (serviceType) {
        const serviceSelect = document.getElementById('serviceType');
        if (serviceSelect) {
            // Map service names to dropdown values
            const serviceMap = {
                'Regular Cleaning': 'regular',
                'Deep Cleaning': 'deep',
                'Move In/Out': 'move',
                'Post-Construction': 'construction',
                'Commercial Cleaning': 'commercial',
                'Office Cleaning': 'office'
            };
            const mappedValue = serviceMap[serviceType];
            if (mappedValue) {
                serviceSelect.value = mappedValue;
            }
        }
    }
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
        closeBookingModal();
    }
});

// ============================================
// Form Submission Handler
// ============================================
// FormSubmit handles the submission automatically
// We just need to show a success message before form submits
bookingForm.addEventListener('submit', (e) => {
    // Don't prevent default - let FormSubmit handle it
    const name = document.getElementById('fullName').value;
    
    // Show quick confirmation (form will submit right after)
    setTimeout(() => {
        alert(`Thank you, ${name}! Your booking request has been submitted. We'll contact you shortly to confirm.`);
    }, 100);
});

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
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

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.service-card, .why-card, .step, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Phone Number Formatting
// ============================================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
}

// ============================================
// Service Area Scroll Animations
// ============================================
// Animate service content box
const serviceContentBox = document.querySelector('.service-content-box');
if (serviceContentBox) {
    serviceContentBox.style.opacity = '0';
    serviceContentBox.style.transform = 'translateY(40px) scale(0.95)';
    serviceContentBox.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
    observer.observe(serviceContentBox);
}

// Animate trust badge
const trustBadge = document.querySelector('.trust-badge-stamp');
if (trustBadge) {
    trustBadge.style.opacity = '0';
    trustBadge.style.transform = 'rotate(-15deg) scale(0.5)';
    trustBadge.style.transition = 'opacity 0.6s ease 0.4s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s';
    observer.observe(trustBadge);
}

const areaBadges = document.querySelectorAll('.badge');
areaBadges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(30px) scale(0.8)';
    badge.style.transition = `opacity 0.5s ease ${0.6 + index * 0.08}s, transform 0.5s ease ${0.6 + index * 0.08}s`;
    observer.observe(badge);
});

// ============================================
// How It Works Steps Scroll Animation
// ============================================
const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(50px) scale(0.95)';
    step.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    observer.observe(step);
});

// Wrap step icons in colored backgrounds
steps.forEach(step => {
    const icon = step.querySelector('.step-icon');
    if (icon && !icon.parentElement.classList.contains('step-icon-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'step-icon-wrapper';
        icon.parentNode.insertBefore(wrapper, icon);
        wrapper.appendChild(icon);
    }
});

// Animate arrows
const stepArrows = document.querySelectorAll('.step-arrow');
stepArrows.forEach((arrow, index) => {
    arrow.style.opacity = '0';
    arrow.style.transition = `opacity 0.6s ease ${0.4 + index * 0.2}s`;
    observer.observe(arrow);
});

// ============================================
// Why-Us Cards Scroll Animation
// ============================================
const whyCards = document.querySelectorAll('.why-card');
whyCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// ============================================
// Testimonials Scroll Animation
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = `opacity 0.7s ease ${index * 0.2}s, transform 0.7s ease ${index * 0.2}s`;
    observer.observe(card);
});

// ============================================
// Guarantee Feature Boxes Scroll Animation
// ============================================
const guaranteeFeatureBoxes = document.querySelectorAll('.guarantee-feature-box');
guaranteeFeatureBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateX(-30px)';
    box.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(box);
});

// Guarantee Slogan Animation
const guaranteeSloganTop = document.querySelector('.guarantee-slogan-top');
if (guaranteeSloganTop) {
    guaranteeSloganTop.style.opacity = '0';
    guaranteeSloganTop.style.transform = 'translateY(30px)';
    guaranteeSloganTop.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(guaranteeSloganTop);
}

// Guarantee Tagline Bottom Animation
const guaranteeTaglineBottom = document.querySelector('.guarantee-tagline-bottom');
if (guaranteeTaglineBottom) {
    guaranteeTaglineBottom.style.opacity = '0';
    guaranteeTaglineBottom.style.transform = 'translateY(30px)';
    guaranteeTaglineBottom.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
    observer.observe(guaranteeTaglineBottom);
}

// Guarantee Image Animation
const guaranteeImage = document.querySelector('.guarantee-image');
if (guaranteeImage) {
    guaranteeImage.style.opacity = '0';
    guaranteeImage.style.transform = 'scale(0.9)';
    guaranteeImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
    observer.observe(guaranteeImage);
}

// ============================================
// Service Card Flip on Mobile/Tablet Touch
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    let isFlipped = false;
    
    card.addEventListener('click', (e) => {
        // Only handle click/tap on touch devices or screens smaller than desktop
        if (window.innerWidth <= 1366 || 'ontouchstart' in window) {
            e.preventDefault();
            
            // Toggle flip state
            const inner = card.querySelector('.service-card-inner');
            if (inner) {
                if (isFlipped) {
                    inner.style.transform = 'rotateY(0deg)';
                } else {
                    inner.style.transform = 'rotateY(180deg)';
                }
                isFlipped = !isFlipped;
            }
        }
    });
    
    // Reset flip state when clicking outside the card
    document.addEventListener('click', (e) => {
        if (!card.contains(e.target) && isFlipped) {
            const inner = card.querySelector('.service-card-inner');
            if (inner) {
                inner.style.transform = 'rotateY(0deg)';
                isFlipped = false;
            }
        }
    });
});

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Samin Cleaning website loaded successfully!');
    
    // Add any initialization code here
    // For example, you could load booking availability from an API
});
