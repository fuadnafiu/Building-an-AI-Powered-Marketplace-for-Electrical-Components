// Marketplace Page Functionality

let allProducts = [];
let filteredProducts = [];

// Fetch products from API
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (data.success) {
            allProducts = data.products;
            filteredProducts = allProducts;
            displayProducts(filteredProducts);
            updateResultsCount(filteredProducts.length);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('partsGrid').innerHTML = 
            '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Failed to load products. Please try again.</p>';
    }
}

// Display products in grid
function displayProducts(products) {
    const grid = document.getElementById('partsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found.</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="marketplace-card">
            <div class="card-badges">
                ${product.stock > 50 ? '<span class="badge new">In Stock</span>' : ''}
                ${product.stock < 10 ? '<span class="badge trending">Low Stock</span>' : ''}
            </div>
            <div class="card-image">
                ${product.image_url ? 
                    `<img src="${product.image_url}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: contain; background: #fff; border-radius: 8px; padding: 10px;">` 
                    : '<i class="fas fa-microchip fa-4x"></i>'}
            </div>
            <div class="card-content">
                <h3>${product.name}</h3>
                <p class="part-description">${product.description}</p>
                <div class="part-meta">
                    <span><i class="fas fa-tag"></i> ${product.category}</span>
                    <span><i class="fas fa-box"></i> Stock: ${product.stock}</span>
                </div>
                <div class="vendor-info">
                    <span class="vendor-name">${product.vendor.name}</span>
                    <div class="rating">
                        ${generateStars(product.vendor.rating)}
                        <span>${product.vendor.rating}</span>
                    </div>
                </div>
                <div class="price-section">
                    <div class="price">৳${product.price.toFixed(2)}</div>
                </div>
                <div class="stock-info">
                    <i class="fas ${product.stock > 20 ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> 
                    ${product.stock > 20 ? 'In Stock • Ready to Ship' : `Only ${product.stock} left!`}
                </div>
                <button class="btn-primary card-btn" onclick="viewProductDetails(${product.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

// Generate star ratings
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// Update results count
function updateResultsCount(count) {
    const resultsInfo = document.querySelector('.results-info');
    if (resultsInfo) {
        resultsInfo.innerHTML = `<strong>${count}</strong> products found`;
    }
}

// View product details
function viewProductDetails(productId) {
    alert(`Product ID: ${productId}\nFull product details page coming soon!`);
}

// Toggle filters sidebar on mobile
function toggleFilters() {
    const sidebar = document.getElementById('filtersSidebar');
    sidebar.classList.toggle('active');
}

// Filter by category
document.addEventListener('change', (e) => {
    if (e.target.closest('.filter-checkbox input[type="checkbox"]')) {
        applyFilters();
    }
});

function applyFilters() {
    const checkedCategories = Array.from(document.querySelectorAll('.filter-checkbox input:checked'))
        .map(cb => cb.closest('label').querySelector('span').textContent.trim());
    
    if (checkedCategories.length === 0) {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(product => 
            checkedCategories.some(cat => product.category.includes(cat) || cat.includes(product.category))
        );
    }
    
    displayProducts(filteredProducts);
    updateResultsCount(filteredProducts.length);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load products first
    loadProducts();
    
    // Setup search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        // Real-time search as user types
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.manufacturer.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
            updateResultsCount(filteredProducts.length);
        });
        
        // Enter key support
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchInput.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // Search button click handler
    const searchBtn = document.querySelector('.search-bar .btn-primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) {
                searchInput.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // Clear filters button
    const clearFiltersBtn = document.querySelector('.clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('.price-input').forEach(input => {
                input.value = '';
            });
            filteredProducts = allProducts;
            displayProducts(filteredProducts);
            updateResultsCount(filteredProducts.length);
        });
    }
    
    // View toggle buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    const partsGrid = document.getElementById('partsGrid');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (view === 'list') {
                partsGrid.style.gridTemplateColumns = '1fr';
            } else {
                partsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
            }
        });
    });
    
    // Sort select handler
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            console.log('Sort changed to:', e.target.value);
            // Future: implement sorting logic
        });
    }
    
    // Pagination buttons
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.disabled && !btn.querySelector('i')) {
                pageButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});

// Close filters sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('filtersSidebar');
    const filterBtn = document.querySelector('[onclick="toggleFilters()"]');
    
    if (sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target) && e.target !== filterBtn) {
            sidebar.classList.remove('active');
        }
    }
});
