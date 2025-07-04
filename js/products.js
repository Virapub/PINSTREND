// products.js
// Handles product-specific functionality for PINSTREND website using original product data

const products = [
    {
        id: "collapsible-electric-kettle",
        title: "Collapsible Electric Kettle",
        description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection",
        price: 17.51,
        originalPrice: 24.99,
        priceINR: 1499,
        image: "https://m.media-amazon.com/images/I/61WQVNM0LCL._SL1500_.jpg",
        rating: 4.5,
        category: "Appliances",
        features: ["Collapsible design", "800W power", "BPA-free materials"],
        link: "https://amzn.to/448SSZx",
        page: "products.html#collapsible-electric-kettle",
        stock: 50 // Added stock for cart functionality
    },
    {
        id: "automatic-soap-dispenser",
        title: "Automatic Soap Dispenser",
        description: "Touchless soap dispenser with infrared sensor for hygienic use",
        price: 16.21,
        originalPrice: 22.99,
        priceINR: 1388,
        image: "https://m.media-amazon.com/images/I/61Vqx4KEHuL._SL1024_.jpg",
        rating: 4.2,
        category: "Smart Gadgets",
        features: ["Touchless operation", "Battery powered", "Adjustable soap volume"],
        link: "https://amzn.to/46sLIRc",
        page: "products.html#automatic-soap-dispenser",
        stock: 30 // Added stock for cart functionality
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display featured products
export function displayFeaturedProducts(containerId = 'featuredProducts') {
    const featuredProductsContainer = document.getElementById(containerId);
    if (!featuredProductsContainer) return;

    featuredProductsContainer.innerHTML = '';

    products.forEach(product => {
        if (product.stock > 0) {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
                <div class="product-details">
                    <h3>${product.title}</h3>
                    <p class="price">INR ${product.priceINR} / USD $${product.price.toFixed(2)}</p>
                    <p class="original-price">Original: $${product.originalPrice.toFixed(2)}</p>
                    <p class="rating">⭐ ${product.rating} (N/A reviews)</p> <!-- Reviews placeholder -->
                    <p class="description">${product.description.substring(0, 100)}...</p>
                    <a href="product-detail.html?id=${product.id}" class="view-details">View Details</a>
                    <button class="add-to-cart" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            `;
            featuredProductsContainer.appendChild(productCard);
        }
    });

    // Add event listeners for Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', () => {
                addToCart(button.dataset.productId);
                displayFeaturedProducts(containerId); // Refresh to update stock
                updateCartCount();
                const product = products.find(p => p.id === button.dataset.productId);
                alert(`${product.title} added to cart!`);
            });
        }
    });
}

// Add product to cart
export function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                priceINR: product.priceINR,
                image: product.image,
                quantity: 1
            });
        }
        product.stock -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Update cart count
export function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    });
}

// Get product by ID
export function getProductById(productId) {
    return products.find(p => p.id === productId);
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    updateCartCount();
});
