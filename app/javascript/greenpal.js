// Mobile-First GreenPal JavaScript

// Carousel functionality
let currentSlide = 0;
const carousel = document.querySelector('.carousel-container');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.service-card');

// Brand logos carousel
const brandLogosCarousel = document.querySelector('.brand-logos-carousel');
const brandLogos = document.querySelectorAll('.brand-logo');

// Initialize carousel
function initializeCarousel() {
    if (carousel && cards.length > 0) {
        // Set initial active dot
        updateDots();
        
        // Add scroll event listener for carousel
        carousel.addEventListener('scroll', handleCarouselScroll);
        
        // Add click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
    }
}

// Initialize brand logos carousel
function initializeBrandLogosCarousel() {
    if (brandLogosCarousel && brandLogos.length > 0) {
        // Add touch support for brand logos carousel
        addTouchSupport(brandLogosCarousel);
    }
}

// Handle carousel scroll
function handleCarouselScroll() {
    const cardWidth = cards[0].offsetWidth + 16; // card width + gap
    const scrollPosition = carousel.scrollLeft;
    const newSlide = Math.round(scrollPosition / cardWidth);
    
    if (newSlide !== currentSlide) {
        currentSlide = newSlide;
        updateDots();
    }
}

// Go to specific slide
function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < cards.length) {
        const cardWidth = cards[0].offsetWidth + 16;
        carousel.scrollTo({
            left: slideIndex * cardWidth,
            behavior: 'smooth'
        });
        currentSlide = slideIndex;
        updateDots();
    }
}

// Update pagination dots
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Handle card button click
function handleCardClick() {
    // Add click animation
    const cardBtn = event.target;
    cardBtn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        cardBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Show success message
    showNotification('Redirecting to service details...', 'success');
    
    // Simulate redirect after a short delay
    setTimeout(() => {
        console.log('Navigating to service details page...');
        // window.location.href = '/service-details';
    }, 1000);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const addressInput = document.querySelector('.field-house');
    const address = addressInput.value.trim();
    
    if (!address) {
        showNotification('Please enter your address', 'error');
        addressInput.focus();
        return false;
    }
    
    // Add loading state
    const submitBtn = document.querySelector('.btn-main');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Searching...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Found lawn care services in your area!', 'success');
        
        // Scroll to service carousel
        document.querySelector('.service-carousel').scrollIntoView({
            behavior: 'smooth'
        });
    }, 2000);
    
    return false;
}

// Toggle FAQ functionality
function toggleFAQ(faqItem) {
    const isExpanded = faqItem.classList.contains('expanded');
    const chevron = faqItem.querySelector('.faq-chevron');
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('expanded');
            item.classList.add('collapsed');
            const itemChevron = item.querySelector('.faq-chevron');
            if (itemChevron) {
                itemChevron.classList.remove('expanded');
            }
        }
    });
    
    // Toggle current FAQ item
    if (isExpanded) {
        faqItem.classList.remove('expanded');
        faqItem.classList.add('collapsed');
        if (chevron) {
            chevron.classList.remove('expanded');
        }
    } else {
        faqItem.classList.remove('collapsed');
        faqItem.classList.add('expanded');
        if (chevron) {
            chevron.classList.add('expanded');
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add form event listeners
function initializeFormHandlers() {
    const form = document.querySelector('.address-form');
    const input = document.querySelector('.field-house');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (input) {
        // Add enter key handler
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleFormSubmit(e);
            }
        });
    }
}

// Add header button functionality
function initializeHeaderButtons() {
    const headerBtn = document.querySelector('.main-header .btn');
    
    if (headerBtn) {
        headerBtn.addEventListener('click', function() {
            showNotification('Opening pricing page...', 'info');
            // Add your navigation logic here
        });
    }
}

// Add touch/swipe support for carousel
function initializeTouchSupport() {
    if (carousel) {
        addTouchSupport(carousel);
    }
}

// Generic touch support function
function addTouchSupport(element) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    element.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > 10) {
            element.scrollLeft += diff;
            startX = currentX;
        }
    });
    
    element.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeBrandLogosCarousel();
    initializeFormHandlers();
    initializeHeaderButtons();
    initializeTouchSupport();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('GreenPal mobile-first design initialized successfully!');
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Recalculate carousel position if needed
    if (carousel && currentSlide >= cards.length) {
        currentSlide = cards.length - 1;
        updateDots();
    }
}); 