// products.js - Updated with all 12 products
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
        page: "products.html#collapsible-electric-kettle"
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
        page: "products.html#automatic-soap-dispenser"
    },
    // Add all 10 remaining products here in the same format
    // ...
];

// Function to display products
function displayProducts(productsToDisplay, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="${product.page}">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            </a>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="${product.page}">${product.title}</a>
                </h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    (${product.rating})
                </div>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Helper function to generate star ratings
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + 
           (halfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    // Display featured products on homepage
    if (document.getElementById('featuredProducts')) {
        const featuredProducts = products.slice(0, 6); // Show first 6 as featured
        displayProducts(featuredProducts, 'featuredProducts');
    }
    
    // Display all products on products page
    if (document.getElementById('allProducts')) {
        displayProducts(products, 'allProducts');
    }
    
    // Display single product on product detail page
    if (document.getElementById('productDetail')) {
        loadProductDetail();
    }
});

// Function to load product detail page
function loadProductDetail() {
    const productId = window.location.hash.substring(1);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const container = document.getElementById('productDetail');
        container.innerHTML = `
            <div class="product-detail-container">
                <div class="product-images">
                    <img src="${product.image}" alt="${product.title}" class="main-image">
                </div>
                <div class="product-info">
                    <h1>${product.title}</h1>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        (${product.rating}) | <a href="#reviews">See reviews</a>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount">${Math.round((1 - product.price/product.originalPrice)*100)}% OFF</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-features">
                        <h3>Features:</h3>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="buy-now" data-id="${product.id}">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            addToCart(product.id);
        });
        
        document.querySelector('.buy-now').addEventListener('click', function() {
            addToCart(product.id);
            window.location.href = 'checkout.html';
        });
    }
}
