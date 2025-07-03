// Sample product data
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
    }
    
];

// Display featured products
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    
    if (featuredProductsContainer) {
        featuredProductsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        $${product.price.toFixed(2)}
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div class="product-rating">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            featuredProductsContainer.appendChild(productCard);
        });
        
        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show notification
        alert(`${product.title} has been added to your cart!`);
    }
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', displayFeaturedProducts);
