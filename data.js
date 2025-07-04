// data.js
const pintrendData = {
    categories: {
        "Electronics": [
            {
                id: "EL001",
                name: "Collapsible Electric Kettle",
                image: "images/collapsible-kettle.jpg",
                price: { inr: "₹1,751", usd: "$24.99" },
                description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection. Perfect for travel and small kitchens!",
                link: "product-detail.html?id=EL001",
                category: "Electronics",
                tags: ["kettle", "electric", "collapsible", "travel", "electronics"],
                rating: 4.5,
                reviews: 1200,
                stock: 50,
                reviewsData: [] // Placeholder for reviews
            },
            {
                id: "EL002",
                name: "Portable Smart Speaker",
                image: "images/smart-speaker.jpg",
                price: { inr: "₹3,499", usd: "$41.99" },
                description: "Water-resistant with voice assistant",
                link: "product-detail.html?id=EL002",
                category: "Electronics",
                tags: ["speaker", "smart", "portable", "electronics"],
                rating: 4.2,
                reviews: 850,
                stock: 30,
                reviewsData: []
            }
        ],
        "Home": [
            {
                id: "HM001",
                name: "Automatic Soap Dispenser Touchless",
                image: "images/soap-dispenser.jpg",
                price: { inr: "₹1,612", usd: "$22.99" },
                description: "Make cleaning hands faster and more hygienic with infrared sensor technology. Waterproof and easy to refill!",
                link: "product-detail.html?id=HM001",
                category: "Home",
                tags: ["soap", "dispenser", "touchless", "hygienic", "home"],
                rating: 4.2,
                reviews: 850,
                stock: 30,
                reviewsData: []
            }
        ],
        "Home & Kitchen": [
            {
                id: "HK001",
                name: "Multi-Purpose Boil Water Kettle",
                image: "images/multi-purpose-kettle.jpg",
                price: { inr: "₹2,499", usd: "$29.99" },
                description: "Versatile kettle to boil water for tea, coffee, or instant meals. Compact design with safety features!",
                link: "product-detail.html?id=HK001",
                category: "Home & Kitchen",
                tags: ["kettle", "multi-purpose", "tea", "coffee", "kitchen"],
                rating: 4.6,
                reviews: 600,
                stock: 40,
                reviewsData: []
            }
        ],
        "Fashion": [
            {
                id: "FS001",
                name: "Wireless Running Shoes",
                image: "images/running-shoes.jpg",
                price: { inr: "₹5,499", usd: "$65.99" },
                description: "Lightweight running shoes with LED lights for style and safety during night runs!",
                link: "product-detail.html?id=FS001",
                category: "Fashion",
                tags: ["shoes", "running", "wireless", "fashion", "led"],
                rating: 4.7,
                reviews: 300,
                stock: 20,
                reviewsData: []
            }
        ]
    },

    searchProducts: function(searchTerm) {
        const results = [];
        searchTerm = searchTerm.toLowerCase();
        Object.values(this.categories).forEach(products => {
            products.forEach(product => {
                if (product.name.toLowerCase().includes(searchTerm) || 
                    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                    results.push(product);
                }
            });
        });
        return results.slice(0, 5);
    },

    getProductById: function(productId) {
        let foundProduct = null;
        Object.values(this.categories).forEach(products => {
            const product = products.find(p => p.id === productId);
            if (product) foundProduct = product;
        });
        return foundProduct;
    },

    getCategories: function() {
        return Object.keys(this.categories);
    },

    getProductsByCategory: function(category) {
        return this.categories[category] || [];
    },

    cart: [],

    addToCart: function(productId) {
        const product = this.getProductById(productId);
        if (product && product.stock > 0) {
            const cartItem = this.cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            product.stock -= 1;
        }
    },

    getCartItems: function() {
        return this.cart;
    },

    removeFromCart: function(productId) {
        const cartItem = this.cart.find(item => item.id === productId);
        if (cartItem) {
            const product = this.getProductById(productId);
            product.stock += cartItem.quantity;
            this.cart = this.cart.filter(item => item.id !== productId);
        }
    },

    updateCartQuantity: function(productId, quantity) {
        const cartItem = this.cart.find(item => item.id === productId);
        if (cartItem) {
            const product = this.getProductById(productId);
            const diff = quantity - cartItem.quantity;
            if (product.stock + diff >= 0) {
                cartItem.quantity = quantity;
                product.stock -= diff;
            }
        }
    }
};

export default pintrendData;
