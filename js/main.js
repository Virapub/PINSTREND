// main.js
// Central JavaScript file for PINSTREND website functionality

import pintrendData from './data.js';

// Global cart update function
export function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = pintrendData.getCartItems().length;
    });
}

// Search functionality
export function setupSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search products...';

    searchIcon.addEventListener('click', () => {
        if (!document.querySelector('.search-input')) {
            searchIcon.parentElement.appendChild(searchInput);
            searchInput.focus();
        } else {
            searchInput.remove();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';

        if (searchTerm.length > 2) {
            const results = pintrendData.searchProducts(searchTerm);
            resultsContainer.innerHTML = results.map(product => `
                <a href="${product.link}" class="search-result">
                    <img src="${product.image}" alt="${product.name}" class="search-result-img">
                    <div class="search-result-info">
                        <h4>${product.name}</h4>
                        <p>${product.price.inr} • ${product.category}</p>
                    </div>
                </a>
            `).join('');
            document.body.appendChild(resultsContainer);
        } else if (document.querySelector('.search-results')) {
            document.querySelector('.search-results').remove();
        }

        document.addEventListener('click', (event) => {
            if (!searchIcon.contains(event.target) && !searchInput.contains(event.target)) {
                searchInput.remove();
                if (document.querySelector('.search-results')) {
                    document.querySelector('.search-results').remove();
                }
            }
        });
    });
}

// Hamburger menu toggle
export function setupHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Initialize main functionality
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupSearch();
    setupHamburger();

    // Add event listeners for Add to Cart buttons globally
    document.querySelectorAll('.add-to-cart').forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', () => {
                pintrendData.addToCart(button.dataset.productId);
                updateCartCount();
                const product = pintrendData.getProductById(button.dataset.productId);
                alert(`${product.name} added to cart!`);
            });
        }
    });
});
