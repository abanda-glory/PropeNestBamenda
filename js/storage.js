// Storage management functions for localStorage operations

// Get all properties from localStorage
function getAllProperties() {
    const properties = localStorage.getItem('properties');
    return properties ? JSON.parse(properties) : [];
}

// Get a single property by ID
function getPropertyById(id) {
    const properties = getAllProperties();
    return properties.find(property => property.id === parseInt(id));
}

// Save all properties to localStorage
function saveProperties(properties) {
    localStorage.setItem('properties', JSON.stringify(properties));
}

// Add a new property
function addProperty(property) {
    const properties = getAllProperties();
    const nextId = parseInt(localStorage.getItem('nextPropertyId')) || properties.length + 1;
    
    property.id = nextId;
    properties.push(property);
    
    saveProperties(properties);
    localStorage.setItem('nextPropertyId', (nextId + 1).toString());
    
    return property;
}

// Update an existing property
function updateProperty(updatedProperty) {
    const properties = getAllProperties();
    const index = properties.findIndex(p => p.id === updatedProperty.id);
    
    if (index !== -1) {
        properties[index] = updatedProperty;
        saveProperties(properties);
        return true;
    }
    return false;
}

// Delete a property
function deleteProperty(id) {
    const properties = getAllProperties();
    const filteredProperties = properties.filter(p => p.id !== parseInt(id));
    
    if (filteredProperties.length < properties.length) {
        saveProperties(filteredProperties);
        
        // Also remove from favorites if exists
        const favorites = getFavorites();
        const updatedFavorites = favorites.filter(favId => favId !== parseInt(id));
        saveFavorites(updatedFavorites);
        
        return true;
    }
    return false;
}

// Get all favorites
function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Save favorites
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Add to favorites
function addToFavorites(propertyId) {
    const favorites = getFavorites();
    const id = parseInt(propertyId);
    
    if (!favorites.includes(id)) {
        favorites.push(id);
        saveFavorites(favorites);
        return true;
    }
    return false;
}

// Remove from favorites
function removeFromFavorites(propertyId) {
    const favorites = getFavorites();
    const id = parseInt(propertyId);
    const updatedFavorites = favorites.filter(favId => favId !== id);
    
    if (updatedFavorites.length < favorites.length) {
        saveFavorites(updatedFavorites);
        return true;
    }
    return false;
}

// Check if property is in favorites
function isFavorite(propertyId) {
    const favorites = getFavorites();
    return favorites.includes(parseInt(propertyId));
}

// Toggle favorite status
function toggleFavorite(propertyId) {
    if (isFavorite(propertyId)) {
        return removeFromFavorites(propertyId);
    } else {
        return addToFavorites(propertyId);
    }
}

// Get favorite properties
function getFavoriteProperties() {
    const favorites = getFavorites();
    const allProperties = getAllProperties();
    return allProperties.filter(property => favorites.includes(property.id));
}

// Admin authentication
function checkAdminLogin() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

function adminLogin(username, password) {
    // Simple front-end authentication (NOT SECURE - for demonstration only)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        return true;
    }
    return false;
}

function adminLogout() {
    localStorage.setItem('adminLoggedIn', 'false');
    localStorage.removeItem('adminLoggedIn');
}

// Search and filter functions
function searchProperties(searchTerm) {
    const properties = getAllProperties();
    const term = searchTerm.toLowerCase();
    
    return properties.filter(property => 
        property.title.toLowerCase().includes(term) ||
        property.location.toLowerCase().includes(term) ||
        property.description.toLowerCase().includes(term)
    );
}

function filterProperties(filters) {
    let properties = getAllProperties();
    
    // Filter by type
    if (filters.type && filters.type !== 'all') {
        properties = properties.filter(p => p.type === filters.type);
    }
    
    // Filter by status
    if (filters.status && filters.status !== 'all') {
        properties = properties.filter(p => p.status === filters.status);
    }
    
    // Filter by price range
    if (filters.minPrice) {
        properties = properties.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
        properties = properties.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    
    // Filter by bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'all') {
        properties = properties.filter(p => p.bedrooms === parseInt(filters.bedrooms));
    }
    
    // Filter by bathrooms
    if (filters.bathrooms && filters.bathrooms !== 'all') {
        properties = properties.filter(p => p.bathrooms === parseInt(filters.bathrooms));
    }
    
    // Filter by minimum area
    if (filters.minArea) {
        properties = properties.filter(p => p.area >= parseFloat(filters.minArea));
    }
    
    return properties;
}

// Combined search and filter
function searchAndFilter(searchTerm, filters) {
    let properties = getAllProperties();
    
    // Apply search first
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        properties = properties.filter(property => 
            property.title.toLowerCase().includes(term) ||
            property.location.toLowerCase().includes(term) ||
            property.description.toLowerCase().includes(term)
        );
    }
    
    // Then apply filters
    if (filters.type && filters.type !== 'all') {
        properties = properties.filter(p => p.type === filters.type);
    }
    
    if (filters.status && filters.status !== 'all') {
        properties = properties.filter(p => p.status === filters.status);
    }
    
    if (filters.minPrice) {
        properties = properties.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
        properties = properties.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    
    if (filters.bedrooms && filters.bedrooms !== 'all') {
        properties = properties.filter(p => p.bedrooms === parseInt(filters.bedrooms));
    }
    
    if (filters.bathrooms && filters.bathrooms !== 'all') {
        properties = properties.filter(p => p.bathrooms === parseInt(filters.bathrooms));
    }
    
    if (filters.minArea) {
        properties = properties.filter(p => p.area >= parseFloat(filters.minArea));
    }
    
    return properties;
}

// Initialize data on first load
initializeData();

// TENANTS MANAGEMENT
function getTenants() {
    const tenants = localStorage.getItem('tenants');
    return tenants ? JSON.parse(tenants) : [];
}

function saveTenants(tenants) {
    localStorage.setItem('tenants', JSON.stringify(tenants));
}

function getTenantById(id) {
    const tenants = getTenants();
    return tenants.find(t => t.id === parseInt(id));
}

function addTenant(tenant) {
    const tenants = getTenants();
    const nextId = tenants.length > 0 ? Math.max(...tenants.map(t => t.id)) + 1 : 1;
    tenant.id = nextId;
    tenants.push(tenant);
    saveTenants(tenants);
    return tenant;
}

function updateTenant(updatedTenant) {
    const tenants = getTenants();
    const index = tenants.findIndex(t => t.id === updatedTenant.id);
    if (index !== -1) {
        tenants[index] = updatedTenant;
        saveTenants(tenants);
        return true;
    }
    return false;
}

function removeTenant(id) {
    const tenants = getTenants();
    const filteredTenants = tenants.filter(t => t.id !== parseInt(id));
    saveTenants(filteredTenants);
    return true;
}

// OWNERS MANAGEMENT
function getOwners() {
    const owners = localStorage.getItem('owners');
    return owners ? JSON.parse(owners) : [];
}

function saveOwners(owners) {
    localStorage.setItem('owners', JSON.stringify(owners));
}

function getOwnerById(id) {
    const owners = getOwners();
    return owners.find(o => o.id === parseInt(id));
}

function addOwner(owner) {
    const owners = getOwners();
    const nextId = owners.length > 0 ? Math.max(...owners.map(o => o.id)) + 1 : 1;
    owner.id = nextId;
    owners.push(owner);
    saveOwners(owners);
    return owner;
}

function updateOwner(updatedOwner) {
    const owners = getOwners();
    const index = owners.findIndex(o => o.id === updatedOwner.id);
    if (index !== -1) {
        owners[index] = updatedOwner;
        saveOwners(owners);
        return true;
    }
    return false;
}

function removeOwner(id) {
    const owners = getOwners();
    const filteredOwners = owners.filter(o => o.id !== parseInt(id));
    saveOwners(filteredOwners);
    return true;
}