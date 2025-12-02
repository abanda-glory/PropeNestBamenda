// Main utility functions used across all pages

// Format price with currency
function formatPrice(price) {
    return price.toLocaleString('en-US') + ' FCFA';
}

// Create property card HTML
function createPropertyCard(property) {
    const isFav = isFavorite(property.id);
    const heartIcon = isFav ? '❤️' : '🤍';
    
    // Different features display for land vs buildings
    let featuresHTML = '';
    if (property.type === 'land') {
        featuresHTML = `
            <div class="property-features">
                <span>🏞️ ${property.type}</span>
                <span>📐 ${property.area}m²</span>
            </div>
        `;
    } else {
        featuresHTML = `
            <div class="property-features">
                ${property.bedrooms > 0 ? `<span>🛏️ ${property.bedrooms}</span>` : ''}
                ${property.bathrooms > 0 ? `<span>🚿 ${property.bathrooms}</span>` : ''}
                <span>📐 ${property.area}m²</span>
            </div>
        `;
    }
    
    return `
        <div class="property-card">
            <div class="property-image">
                <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
                <span class="property-badge ${property.status}">${property.status}</span>
                <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="handleFavoriteClick(${property.id})">
                    ${heartIcon}
                </button>
            </div>
            <div class="property-content">
                <h3>${property.title}</h3>
                <p class="property-location">📍 ${property.location}</p>
                <p class="property-price">${formatPrice(property.price)}</p>
                ${featuresHTML}
                <button class="btn btn-primary" onclick="viewProperty(${property.id})">View Details</button>
            </div>
        </div>
    `;
}

// Handle favorite button click
function handleFavoriteClick(propertyId) {
    toggleFavorite(propertyId);
    
    // Update UI if on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'listings.html') {
        loadProperties();
    } else if (currentPage === 'favorites.html') {
        loadFavoriteProperties();
    } else if (currentPage === 'index.html' || currentPage === '') {
        loadFeaturedProperties();
    }
    
    // Show notification
    showNotification('Favorites updated!');
}

// View property details
function viewProperty(propertyId) {
    window.location.href = `property-detail.html?id=${propertyId}`;
}

// Show notification (simple toast)
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: var(--shadow-hover);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s;
        z-index: 10000;
    }
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Add styles to document only once
if (!document.getElementById('notificationStyles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notificationStyles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Update favorites count in navigation
    updateFavoritesCount();
});

// Update favorites count
function updateFavoritesCount() {
    const favorites = getFavorites();
    const favoritesLinks = document.querySelectorAll('a[href="favorites.html"]');
    
    favoritesLinks.forEach(link => {
        const text = link.textContent;
        if (text.includes('Favorites')) {
            link.textContent = `Favorites (${favorites.length})`;
        }
    });
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (Cameroon format)
function validatePhone(phone) {
    const re = /^(\+237)?[26]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Check if admin is logged in and redirect if needed
function requireAdmin() {
    if (!checkAdminLogin()) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Debounce function for search
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

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initializeData();
    
    // Update favorites count
    updateFavoritesCount();
});