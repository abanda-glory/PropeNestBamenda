// Admin Panel Logic

let editingPropertyId = null;
let editingTenantId = null;
let editingOwnerId = null;

// Load everything on page load
window.addEventListener('DOMContentLoaded', function() {
    loadAdminProperties();
    updateAdminStats();
    loadTenants();
    loadOwners();
});

// Section Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section-content').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const sections = {
        'properties': 'propertiesSection',
        'tenants': 'tenantsSection',
        'owners': 'ownersSection',
        'statistics': 'statisticsSection'
    };
    
    const titles = {
        'properties': 'Property Management',
        'tenants': 'Tenant Management',
        'owners': 'Land Owner Management',
        'statistics': 'Statistics & Analytics'
    };
    
    document.getElementById(sections[sectionName]).style.display = 'block';
    document.getElementById('sectionTitle').textContent = titles[sectionName];
    
    // Add active class to clicked nav item
    event.target.closest('.nav-item').classList.add('active');
    
    // Load section data
    if (sectionName === 'statistics') {
        updateStatisticsSection();
    }
}

// Toggle mobile sidebar
function toggleSidebar() {
    document.querySelector('.admin-sidebar').classList.toggle('active');
}

// PROPERTIES MANAGEMENT
function loadAdminProperties() {
    const properties = getAllProperties();
    const tableBody = document.getElementById('propertiesTableBody');
    
    if (properties.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--light-text);">
                    No properties found. Click "Add New Property" to get started.
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = properties.map(property => `
        <tr>
            <td><strong>#${property.id}</strong></td>
            <td><img src="${property.images[0]}" alt="${property.title}"></td>
            <td><strong>${property.title}</strong></td>
            <td><span style="text-transform: capitalize;">${property.type}</span></td>
            <td><span class="status-badge ${property.status}">${property.status}</span></td>
            <td><strong>${formatPrice(property.price)}</strong></td>
            <td>${property.location}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editProperty(${property.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" onclick="deletePropertyAdmin(${property.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateAdminStats() {
    const properties = getAllProperties();
    
    document.getElementById('totalPropertiesAdmin').textContent = properties.length;
    document.getElementById('forSaleCount').textContent = properties.filter(p => p.status === 'sale').length;
    document.getElementById('forRentCount').textContent = properties.filter(p => p.status === 'rent').length;
    
    const quarters = new Set(properties.map(p => p.location.split(',')[0]));
    document.getElementById('quartersCount').textContent = quarters.size;
}

function showAddPropertyForm() {
    editingPropertyId = null;
    document.getElementById('modalTitle').textContent = 'Add New Property';
    document.getElementById('propertyForm').reset();
    document.getElementById('propertyId').value = '';
    
    const modal = document.getElementById('propertyModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function editProperty(propertyId) {
    const property = getPropertyById(propertyId);
    
    if (!property) {
        showNotification('Property not found');
        return;
    }
    
    editingPropertyId = propertyId;
    document.getElementById('modalTitle').textContent = 'Edit Property';
    
    document.getElementById('propertyId').value = property.id;
    document.getElementById('title').value = property.title;
    document.getElementById('location').value = property.location;
    document.getElementById('type').value = property.type;
    document.getElementById('status').value = property.status;
    document.getElementById('price').value = property.price;
    document.getElementById('area').value = property.area;
    document.getElementById('bedrooms').value = property.bedrooms;
    document.getElementById('bathrooms').value = property.bathrooms;
    document.getElementById('description').value = property.description;
    document.getElementById('amenities').value = property.amenities.join(', ');
    document.getElementById('images').value = property.images.join(', ');
    
    const modal = document.getElementById('propertyModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function closePropertyModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    editingPropertyId = null;
    document.getElementById('propertyForm').reset();
}

function handlePropertySubmit(event) {
    event.preventDefault();
    
    const propertyData = {
        title: document.getElementById('title').value.trim(),
        location: document.getElementById('location').value.trim(),
        type: document.getElementById('type').value,
        status: document.getElementById('status').value,
        price: parseFloat(document.getElementById('price').value),
        area: parseFloat(document.getElementById('area').value),
        bedrooms: parseInt(document.getElementById('bedrooms').value) || 0,
        bathrooms: parseInt(document.getElementById('bathrooms').value) || 0,
        description: document.getElementById('description').value.trim(),
        amenities: document.getElementById('amenities').value
            .split(',')
            .map(a => a.trim())
            .filter(a => a.length > 0),
        images: document.getElementById('images').value
            .split(',')
            .map(img => img.trim())
            .filter(img => img.length > 0)
    };
    
    if (propertyData.images.length === 0) {
        showNotification('Please provide at least one image URL');
        return;
    }
    
    if (editingPropertyId) {
        propertyData.id = editingPropertyId;
        if (updateProperty(propertyData)) {
            showNotification('Property updated successfully!');
        } else {
            showNotification('Failed to update property');
            return;
        }
    } else {
        addProperty(propertyData);
        showNotification('Property added successfully!');
    }
    
    loadAdminProperties();
    updateAdminStats();
    closePropertyModal();
}

function deletePropertyAdmin(propertyId) {
    const property = getPropertyById(propertyId);
    
    if (!property) {
        showNotification('Property not found');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${property.title}"?`)) {
        if (deleteProperty(propertyId)) {
            showNotification('Property deleted successfully!');
            loadAdminProperties();
            updateAdminStats();
        } else {
            showNotification('Failed to delete property');
        }
    }
}

// TENANTS MANAGEMENT
function loadTenants() {
    const tenants = getTenants();
    const tableBody = document.getElementById('tenantsTableBody');
    
    if (tenants.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--light-text);">
                    No tenants found. Click "Add New Tenant" to get started.
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = tenants.map(tenant => `
        <tr>
            <td><strong>#${tenant.id}</strong></td>
            <td><strong>${tenant.name}</strong></td>
            <td>${tenant.propertyTitle}</td>
            <td>${tenant.phone}</td>
            <td>${tenant.email}</td>
            <td><strong>${formatPrice(tenant.rentAmount)}</strong></td>
            <td>${tenant.moveInDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editTenant(${tenant.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteTenant(${tenant.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddTenantForm() {
    editingTenantId = null;
    document.getElementById('tenantModalTitle').textContent = 'Add New Tenant';
    document.getElementById('tenantForm').reset();
    
    // Populate property dropdown with rental properties
    const properties = getAllProperties().filter(p => p.status === 'rent');
    const propertySelect = document.getElementById('tenantProperty');
    propertySelect.innerHTML = '<option value="">Select Property</option>' + 
        properties.map(p => `<option value="${p.id}">${p.title}</option>`).join('');
    
    const modal = document.getElementById('tenantModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function editTenant(tenantId) {
    const tenant = getTenantById(tenantId);
    if (!tenant) return;
    
    editingTenantId = tenantId;
    document.getElementById('tenantModalTitle').textContent = 'Edit Tenant';
    
    // Populate property dropdown
    const properties = getAllProperties().filter(p => p.status === 'rent');
    const propertySelect = document.getElementById('tenantProperty');
    propertySelect.innerHTML = '<option value="">Select Property</option>' + 
        properties.map(p => `<option value="${p.id}" ${p.id === tenant.propertyId ? 'selected' : ''}>${p.title}</option>`).join('');
    
    document.getElementById('tenantName').value = tenant.name;
    document.getElementById('tenantPhone').value = tenant.phone;
    document.getElementById('tenantEmail').value = tenant.email;
    document.getElementById('tenantRent').value = tenant.rentAmount;
    document.getElementById('tenantMoveIn').value = tenant.moveInDate;
    
    const modal = document.getElementById('tenantModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function closeTenantModal() {
    const modal = document.getElementById('tenantModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    editingTenantId = null;
}

function handleTenantSubmit(event) {
    event.preventDefault();
    
    const propertyId = parseInt(document.getElementById('tenantProperty').value);
    const property = getPropertyById(propertyId);
    
    const tenantData = {
        name: document.getElementById('tenantName').value.trim(),
        propertyId: propertyId,
        propertyTitle: property ? property.title : '',
        phone: document.getElementById('tenantPhone').value.trim(),
        email: document.getElementById('tenantEmail').value.trim(),
        rentAmount: parseFloat(document.getElementById('tenantRent').value),
        moveInDate: document.getElementById('tenantMoveIn').value
    };
    
    if (editingTenantId) {
        tenantData.id = editingTenantId;
        updateTenant(tenantData);
        showNotification('Tenant updated successfully!');
    } else {
        addTenant(tenantData);
        showNotification('Tenant added successfully!');
    }
    
    loadTenants();
    closeTenantModal();
}

function deleteTenant(tenantId) {
    const tenant = getTenantById(tenantId);
    if (!tenant) return;
    
    if (confirm(`Are you sure you want to remove ${tenant.name}?`)) {
        removeTenant(tenantId);
        showNotification('Tenant removed successfully!');
        loadTenants();
    }
}

// OWNERS MANAGEMENT
function loadOwners() {
    const owners = getOwners();
    const tableBody = document.getElementById('ownersTableBody');
    
    if (owners.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--light-text);">
                    No land owners found. Click "Add New Owner" to get started.
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = owners.map(owner => `
        <tr>
            <td><strong>#${owner.id}</strong></td>
            <td><strong>${owner.name}</strong></td>
            <td>${owner.propertyTitle}</td>
            <td>${owner.location}</td>
            <td>${owner.phone}</td>
            <td>${owner.email}</td>
            <td><strong>${owner.area}m²</strong></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editOwner(${owner.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteOwner(${owner.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddOwnerForm() {
    editingOwnerId = null;
    document.getElementById('ownerModalTitle').textContent = 'Add New Land Owner';
    document.getElementById('ownerForm').reset();
    
    // Populate property dropdown with land/property for sale
    const properties = getAllProperties();
    const propertySelect = document.getElementById('ownerProperty');
    propertySelect.innerHTML = '<option value="">Select Property</option>' + 
        properties.map(p => `<option value="${p.id}">${p.title}</option>`).join('');
    
    const modal = document.getElementById('ownerModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function editOwner(ownerId) {
    const owner = getOwnerById(ownerId);
    if (!owner) return;
    
    editingOwnerId = ownerId;
    document.getElementById('ownerModalTitle').textContent = 'Edit Land Owner';
    
    // Populate property dropdown
    const properties = getAllProperties();
    const propertySelect = document.getElementById('ownerProperty');
    propertySelect.innerHTML = '<option value="">Select Property</option>' + 
        properties.map(p => `<option value="${p.id}" ${p.id === owner.propertyId ? 'selected' : ''}>${p.title}</option>`).join('');
    
    document.getElementById('ownerName').value = owner.name;
    document.getElementById('ownerLocation').value = owner.location;
    document.getElementById('ownerArea').value = owner.area;
    document.getElementById('ownerPhone').value = owner.phone;
    document.getElementById('ownerEmail').value = owner.email;
    
    const modal = document.getElementById('ownerModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function closeOwnerModal() {
    const modal = document.getElementById('ownerModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    editingOwnerId = null;
}

function handleOwnerSubmit(event) {
    event.preventDefault();
    
    const propertyId = parseInt(document.getElementById('ownerProperty').value);
    const property = getPropertyById(propertyId);
    
    const ownerData = {
        name: document.getElementById('ownerName').value.trim(),
        propertyId: propertyId,
        propertyTitle: property ? property.title : '',
        location: document.getElementById('ownerLocation').value.trim(),
        area: parseFloat(document.getElementById('ownerArea').value),
        phone: document.getElementById('ownerPhone').value.trim(),
        email: document.getElementById('ownerEmail').value.trim()
    };
    
    if (editingOwnerId) {
        ownerData.id = editingOwnerId;
        updateOwner(ownerData);
        showNotification('Owner updated successfully!');
    } else {
        addOwner(ownerData);
        showNotification('Owner added successfully!');
    }
    
    loadOwners();
    closeOwnerModal();
}

function deleteOwner(ownerId) {
    const owner = getOwnerById(ownerId);
    if (!owner) return;
    
    if (confirm(`Are you sure you want to remove ${owner.name}?`)) {
        removeOwner(ownerId);
        showNotification('Owner removed successfully!');
        loadOwners();
    }
}

// STATISTICS SECTION
function updateStatisticsSection() {
    const properties = getAllProperties();
    
    // Property breakdown
    document.getElementById('housesCount').textContent = properties.filter(p => p.type === 'house').length;
    document.getElementById('apartmentsCount').textContent = properties.filter(p => p.type === 'apartment').length;
    document.getElementById('landCount').textContent = properties.filter(p => p.type === 'land').length;
    
    // Revenue stats
    const totalSales = properties.filter(p => p.status === 'sale').reduce((sum, p) => sum + p.price, 0);
    const monthlyRental = properties.filter(p => p.status === 'rent').reduce((sum, p) => sum + p.price, 0);
    
    document.getElementById('totalSalesValue').textContent = formatPrice(totalSales);
    document.getElementById('monthlyRental').textContent = formatPrice(monthlyRental);
}

// LOGOUT
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        adminLogout();
        showNotification('Logged out successfully!');
        setTimeout(() => {
            window.location.href = 'admin-login.html';
        }, 1000);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = ['propertyModal', 'tenantModal', 'ownerModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    });
}