// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initFormValidation();
    initFAQ();
    initStatsCounter();
    initScrollAnimations();
    initSmoothScrolling();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
}

function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // Validate required fields
    const requiredFields = [
        { id: 'nome', message: 'Nome é obrigatório' },
        { id: 'email', message: 'E-mail é obrigatório' },
        { id: 'telefone', message: 'Telefone é obrigatório' },
        { id: 'servico', message: 'Selecione um serviço' },
        { id: 'mensagem', message: 'Mensagem é obrigatória' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            showError(element, field.message);
            isValid = false;
        } else {
            clearError(element);
        }
    });
    
    // Validate email format
    const email = document.getElementById('email');
    if (email.value.trim() && !isValidEmail(email.value)) {
        showError(email, 'E-mail inválido');
        isValid = false;
    }
    
    // Validate phone format
    const telefone = document.getElementById('telefone');
    if (telefone.value.trim() && !isValidPhone(telefone.value)) {
        showError(telefone, 'Telefone inválido');
        isValid = false;
    }
    
    // Validate terms checkbox
    const termos = document.getElementById('termos');
    if (!termos.checked) {
        showError(termos, 'Você deve concordar com os termos');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch (field.id) {
        case 'nome':
            if (!value) {
                showError(field, 'Nome é obrigatório');
                return false;
            }
            break;
            
        case 'email':
            if (!value) {
                showError(field, 'E-mail é obrigatório');
                return false;
            } else if (!isValidEmail(value)) {
                showError(field, 'E-mail inválido');
                return false;
            }
            break;
            
        case 'telefone':
            if (!value) {
                showError(field, 'Telefone é obrigatório');
                return false;
            } else if (!isValidPhone(value)) {
                showError(field, 'Telefone inválido');
                return false;
            }
            break;
            
        case 'servico':
            if (!value) {
                showError(field, 'Selecione um serviço');
                return false;
            }
            break;
            
        case 'mensagem':
            if (!value) {
                showError(field, 'Mensagem é obrigatória');
                return false;
            }
            break;
            
        case 'termos':
            if (!field.checked) {
                showError(field, 'Você deve concordar com os termos');
                return false;
            }
            break;
    }
    
    clearError(field);
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function submitForm() {
    const submitButton = document.querySelector('.form-submit');
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            // Clear all validation states
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.classList.remove('error', 'success');
            });
            
            // Clear all error messages
            const errorElements = form.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
            });
        }, 3000);
    }, 2000);
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on target
            if (target === 98) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + (target > 99 ? '+' : '');
            }
        }, 16);
    };
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .mvv-card, .why-choose-item, .process-step');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form Input Masks (Phone)
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
});

// Utility Functions
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // You could set a fallback image here
            // this.src = 'assets/images/fallback.jpg';
        });
    });
});

// Console message for developers
console.log('%c🎨 Be Design Website', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com HTML5, CSS3 e JavaScript', 'color: #666; font-size: 14px;');
console.log('%cPara mais informações: contato@bedesign.com.br', 'color: #666; font-size: 12px;');

