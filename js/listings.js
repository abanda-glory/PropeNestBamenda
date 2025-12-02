// Listings page functionality

// Load properties on page load
window.addEventListener('DOMContentLoaded', function() {
    loadProperties();
    
    // Check for saved search term or filter from home page
    const savedSearch = localStorage.getItem('searchTerm');
    const savedFilter = localStorage.getItem('filterType');
    
    if (savedSearch) {
        document.getElementById('searchInput').value = savedSearch;
        localStorage.removeItem('searchTerm');
    }
    
    if (savedFilter) {
        document.getElementById('typeFilter').value = savedFilter;
        localStorage.removeItem('filterType');
    }
    
    if (savedSearch || savedFilter) {
        applyFilters();
    }
    
    // Add real-time search listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }
});

// Load and display properties
function loadProperties() {
    const properties = getAllProperties();
    displayProperties(properties);
}

// Display properties in the grid
function displayProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    
    resultsCount.textContent = properties.length;
    
    if (properties.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        grid.innerHTML = properties.map(property => createPropertyCard(property)).join('');
    }
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value;
    const filters = {
        type: document.getElementById('typeFilter').value,
        status: document.getElementById('statusFilter').value,
        minPrice: document.getElementById('minPrice').value,
        maxPrice: document.getElementById('maxPrice').value,
        bedrooms: document.getElementById('bedroomsFilter').value,
        bathrooms: document.getElementById('bathroomsFilter').value,
        minArea: document.getElementById('minArea').value
    };
    
    const filteredProperties = searchAndFilter(searchTerm, filters);
    displayProperties(filteredProperties);
}

// Reset all filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('bedroomsFilter').value = 'all';
    document.getElementById('bathroomsFilter').value = 'all';
    document.getElementById('minArea').value = '';
    
    loadProperties();
}

// Toggle mobile filters
function toggleMobileFilters() {
    const sidebar = document.querySelector('.filters-sidebar');
    sidebar.classList.toggle('active');
    
    // Create and toggle overlay
    let overlay = document.querySelector('.filter-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'filter-overlay';
        overlay.onclick = toggleMobileFilters;
        document.body.appendChild(overlay);
    }
    
    overlay.classList.toggle('active');
    
    // Prevent body scroll when filters are open
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}