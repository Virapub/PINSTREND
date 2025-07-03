// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 99.99,
        originalPrice: 129.99,
        image: "images/headphones.jpg",
        rating: 4.5,
        category: "Electronics"
    },
    {
        id: 2,
        title: "Smart Watch Fitness Tracker",
        price: 79.99,
        originalPrice: 99.99,
        image: "images/smartwatch.jpg",
        rating: 4.2,
        category: "Electronics"
    },
    {
        id: 3,
        title: "Cotton T-Shirt",
        price: 24.99,
        originalPrice: 29.99,
        image: "images/tshirt.jpg",
        rating: 4.0,
        category: "Fashion"
    },
    {
        id: 4,
        title: "Stainless Steel Water Bottle",
        price: 19.99,
        originalPrice: 24.99,
        image: "images/waterbottle.jpg",
        rating: 4.7,
        category: "Home"
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
