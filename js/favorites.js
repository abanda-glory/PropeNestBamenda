// Favorites Page Logic

// Load favorites on page load
window.addEventListener('DOMContentLoaded', function() {
    loadFavoriteProperties();
});

// Load and display favorite properties
function loadFavoriteProperties() {
    const favoriteProperties = getFavoriteProperties();
    const favoritesGrid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyState');
    const favoritesCount = document.getElementById('favoritesCount');
    
    // Update count
    favoritesCount.textContent = favoriteProperties.length;
    
    if (favoriteProperties.length === 0) {
        // Show empty state
        favoritesGrid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        // Show favorites
        favoritesGrid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        favoritesGrid.innerHTML = favoriteProperties.map(property => 
            createPropertyCard(property)
        ).join('');
    }
}

// Clear all favorites
function clearAllFavorites() {
    if (getFavorites().length === 0) {
        showNotification('No favorites to clear');
        return;
    }
    
    if (confirm('Are you sure you want to remove all favorites?')) {
        saveFavorites([]);
        loadFavoriteProperties();
        showNotification('All favorites cleared');
        updateFavoritesCount();
    }
}