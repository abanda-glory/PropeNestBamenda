// Property Detail Page Logic

let currentProperty = null;

// Load property details on page load
window.addEventListener('DOMContentLoaded', function() {
    const propertyId = getUrlParameter('id');
    
    if (!propertyId) {
        showNotification('Property not found');
        setTimeout(() => {
            window.location.href = 'listings.html';
        }, 2000);
        return;
    }
    
    loadPropertyDetails(propertyId);
});

// Load and display property details
function loadPropertyDetails(propertyId) {
    const property = getPropertyById(propertyId);
    
    if (!property) {
        showNotification('Property not found');
        setTimeout(() => {
            window.location.href = 'listings.html';
        }, 2000);
        return;
    }
    
    currentProperty = property;
    displayPropertyDetails(property);
    loadSimilarProperties(property);
    updateFavoriteButton();
}

// Display property details
function displayPropertyDetails(property) {
    // Update page title
    document.title = `${property.title} - RealEstate`;
    
    // Breadcrumb
    document.getElementById('breadcrumbTitle').textContent = property.title;
    
    // Main image
    document.getElementById('mainImage').src = property.images[0];
    document.getElementById('mainImage').alt = property.title;
    
    // Thumbnails
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    thumbnailGallery.innerHTML = property.images.map((image, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${image}', this)">
            <img src="${image}" alt="${property.title} ${index + 1}">
        </div>
    `).join('');
    
    // Status badge
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.textContent = property.status;
    statusBadge.className = `status-badge ${property.status}`;
    
    // Basic info
    document.getElementById('propertyTitle').textContent = property.title;
    document.getElementById('propertyLocation').textContent = `📍 ${property.location}`;
    document.getElementById('propertyPrice').textContent = formatPrice(property.price);
    
    // Key features - Different for land vs buildings
    const keyFeaturesContainer = document.querySelector('.key-features');
    
    if (property.type === 'land') {
        // Display land-specific features
        keyFeaturesContainer.innerHTML = `
            <div class="feature">
                <span class="feature-icon">🏞️</span>
                <div>
                    <p class="feature-label">Type</p>
                    <p class="feature-value">${property.type}</p>
                </div>
            </div>
            <div class="feature">
                <span class="feature-icon">📐</span>
                <div>
                    <p class="feature-label">Total Area</p>
                    <p class="feature-value">${property.area}m²</p>
                </div>
            </div>
            <div class="feature">
                <span class="feature-icon">📋</span>
                <div>
                    <p class="feature-label">Status</p>
                    <p class="feature-value">${property.status === 'sale' ? 'For Sale' : 'For Rent'}</p>
                </div>
            </div>
            <div class="feature">
                <span class="feature-icon">💰</span>
                <div>
                    <p class="feature-label">Price</p>
                    <p class="feature-value">${formatPrice(property.price)}</p>
                </div>
            </div>
        `;
    } else {
        // Display building features (house/apartment)
        keyFeaturesContainer.innerHTML = `
            <div class="feature">
                <span class="feature-icon">🏠</span>
                <div>
                    <p class="feature-label">Type</p>
                    <p class="feature-value">${property.type}</p>
                </div>
            </div>
            ${property.bedrooms > 0 ? `
            <div class="feature">
                <span class="feature-icon">🛏️</span>
                <div>
                    <p class="feature-label">Bedrooms</p>
                    <p class="feature-value">${property.bedrooms}</p>
                </div>
            </div>
            ` : ''}
            ${property.bathrooms > 0 ? `
            <div class="feature">
                <span class="feature-icon">🚿</span>
                <div>
                    <p class="feature-label">Bathrooms</p>
                    <p class="feature-value">${property.bathrooms}</p>
                </div>
            </div>
            ` : ''}
            <div class="feature">
                <span class="feature-icon">📐</span>
                <div>
                    <p class="feature-label">Area</p>
                    <p class="feature-value">${property.area}m²</p>
                </div>
            </div>
        `;
    }
    
    // Description
    document.getElementById('propertyDescription').textContent = property.description;
    
    // Amenities
    const amenitiesGrid = document.getElementById('amenitiesGrid');
    amenitiesGrid.innerHTML = property.amenities.map(amenity => `
        <div class="amenity-item">
            <span>✓</span>
            <span>${amenity}</span>
        </div>
    `).join('');
}

// Change main image when thumbnail is clicked
function changeMainImage(imageSrc, thumbnailElement) {
    document.getElementById('mainImage').src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnailElement.classList.add('active');
}

// Toggle favorite for current property
function togglePropertyFavorite() {
    if (!currentProperty) return;
    
    toggleFavorite(currentProperty.id);
    updateFavoriteButton();
    showNotification(isFavorite(currentProperty.id) ? 'Added to favorites!' : 'Removed from favorites!');
}

// Update favorite button appearance
function updateFavoriteButton() {
    if (!currentProperty) return;
    
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (isFavorite(currentProperty.id)) {
        favoriteBtn.textContent = '❤️';
    } else {
        favoriteBtn.textContent = '🤍';
    }
}

// Load similar properties
function loadSimilarProperties(property) {
    const allProperties = getAllProperties();
    
    // Find similar properties (same type, different ID)
    const similarProperties = allProperties
        .filter(p => p.id !== property.id && p.type === property.type)
        .slice(0, 3);
    
    const container = document.getElementById('similarProperties');
    
    if (similarProperties.length === 0) {
        container.innerHTML = '<p class="text-center">No similar properties found.</p>';
        return;
    }
    
    container.innerHTML = similarProperties.map(p => createPropertyCard(p)).join('');
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;
    
    // Validate email
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address');
        return;
    }
    
    // Validate phone
    if (!validatePhone(phone)) {
        showNotification('Please enter a valid phone number');
        return;
    }
    
    // In a real application, this would send the form data to a server
    console.log('Contact Form Submission:', {
        propertyId: currentProperty.id,
        propertyTitle: currentProperty.title,
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Show success message
    showNotification('Message sent successfully! We will contact you soon.');
    
    // Reset form
    document.getElementById('contactForm').reset();
}