// data.js
// Yeh file PINSTREND website ke liye products aur categories ka data store karta hai

const pintrendData = {
    categories: {
        "Trending Electronics": [
            {
                id: "TE001",
                name: "Smart Wireless Earbuds",
                image: "images/wireless-earbuds.jpg",
                price: { inr: "₹4,999", usd: "$59.99" },
                description: "Noise-canceling with 24-hour battery life",
                link: "product-detail.html?id=TE001",
                category: "Trending Electronics",
                tags: ["earbuds", "wireless", "noise-canceling", "electronics"],
                rating: 4.5,
                reviews: 1200
            },
            {
                id: "TE002",
                name: "Portable Smart Speaker",
                image: "images/smart-speaker.jpg",
                price: { inr: "₹3,499", usd: "$41.99" },
                description: "Water-resistant with voice assistant",
                link: "product-detail.html?id=TE002",
                category: "Trending Electronics",
                tags: ["speaker", "smart", "portable", "electronics"],
                rating: 4.2,
                reviews: 850
            }
        ],
        "Home Essentials": [
            {
                id: "HE001",
                name: "Smart LED Bulb",
                image: "images/led-bulb.jpg",
                price: { inr: "₹1,299", usd: "$15.59" },
                description: "Color-changing with app control",
                link: "product-detail.html?id=HE001",
                category: "Home Essentials",
                tags: ["bulb", "led", "smart", "home"],
                rating: 4.7,
                reviews: 600
            },
            {
                id: "HE002",
                name: "Automatic Vacuum Cleaner",
                image: "images/vacuum-cleaner.jpg",
                price: { inr: "₹12,999", usd: "$155.99" },
                description: "Robotic cleaning with scheduling",
                link: "product-detail.html?id=HE002",
                category: "Home Essentials",
                tags: ["vacuum", "cleaner", "robotic", "home"],
                rating: 4.3,
                reviews: 450
            }
        ],
        "Fashion Trends": [
            {
                id: "FT001",
                name: "Wireless Running Shoes",
                image: "images/running-shoes.jpg",
                price: { inr: "₹5,499", usd: "$65.99" },
                description: "Lightweight with LED lights",
                link: "product-detail.html?id=FT001",
                category: "Fashion Trends",
                tags: ["shoes", "running", "wireless", "fashion"],
                rating: 4.6,
                reviews: 300
            }
        ]
    },

    // Search function for products
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

        return results;
    },

    // Get product by ID
    getProductById: function(productId) {
        let foundProduct = null;
        Object.values(this.categories).forEach(products => {
            const product = products.find(p => p.id === productId);
            if (product) foundProduct = product;
        });
        return foundProduct;
    },

    // Get all category names
    getCategories: function() {
        return Object.keys(this.categories);
    },

    // Get products by category
    getProductsByCategory: function(category) {
        return this.categories[category] || [];
    },

    // Cart data (initially empty, can be updated dynamically)
    cart: [],

    // Add to cart function
    addToCart: function(productId) {
        const product = this.getProductById(productId);
        if (product) {
            this.cart.push({ ...product, quantity: 1 });
        }
    },

    // Get cart items
    getCartItems: function() {
        return this.cart;
    },

    // Remove from cart
    removeFromCart: function(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
    }
};

// Export data for use in other files
export default pintrendData;
// data.js
// Yeh file e-commerce website ke liye products aur categories ka data store karta hai

const ecommerceData = {
    categories: {
        "Kitchen Appliances": [
            {
                id: "KA001",
                name: "Smart Coffee Maker",
                image: "images/coffee-maker.jpg",
                price: { inr: "₹3,499", usd: "$41.99" },
                description: "Programmable timer with auto shut-off",
                link: "products/kitchen-appliances/smart-coffee-maker.html",
                category: "Kitchen Appliances",
                tags: ["coffee", "smart", "kitchen", "appliance"]
            },
            {
                id: "KA002",
                name: "Electric Kettle",
                image: "images/electric-kettle.jpg",
                price: { inr: "₹2,199", usd: "$26.39" },
                description: "1.7L capacity with quick boil",
                link: "products/kitchen-appliances/electric-kettle.html",
                category: "Kitchen Appliances",
                tags: ["kettle", "electric", "kitchen", "boil"]
            }
        ],
        "Bathroom Essentials": [
            {
                id: "BE001",
                name: "Electric Toothbrush",
                image: "images/toothbrush.jpg",
                price: { inr: "₹1,599", usd: "$19.19" },
                description: "3 cleaning modes with 2-week battery",
                link: "products/bathroom-essentials/electric-toothbrush.html",
                category: "Bathroom Essentials",
                tags: ["toothbrush", "electric", "bathroom", "hygiene"]
            },
            {
                id: "BE002",
                name: "Waterproof Shower Speaker",
                image: "images/shower-speaker.jpg",
                price: { inr: "₹2,999", usd: "$35.99" },
                description: "Bluetooth speaker with 10-hour battery",
                link: "products/bathroom-essentials/shower-speaker.html",
                category: "Bathroom Essentials",
                tags: ["speaker", "waterproof", "bathroom", "bluetooth"]
            }
        ],
        "Home Decor": [
            {
                id: "HD001",
                name: "LED Table Lamp",
                image: "images/table-lamp.jpg",
                price: { inr: "₹1,999", usd: "$23.99" },
                description: "Adjustable brightness with touch control",
                link: "products/home-decor/led-table-lamp.html",
                category: "Home Decor",
                tags: ["lamp", "led", "decor", "lighting"]
            }
        ]
    },

    // Yeh function search ke liye products ko return karta hai
    searchProducts: function(searchTerm) {
        const results = [];
        searchTerm = searchTerm.toLowerCase();

        // Saare categories ke products ko loop karke search
        Object.values(this.categories).forEach(products => {
            products.forEach(product => {
                // Check if product name ya tags mein search term match hota hai
                if (product.name.toLowerCase().includes(searchTerm) || 
                    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                    results.push(product);
                }
            });
        });

        return results;
    },

    // Yeh function product ko ID se find karta hai
    getProductById: function(productId) {
        let foundProduct = null;
        Object.values(this.categories).forEach(products => {
            const product = products.find(p => p.id === productId);
            if (product) foundProduct = product;
        });
        return foundProduct;
    },

    // Yeh function saare categories ke names return karta hai
    getCategories: function() {
        return Object.keys(this.categories);
    },

    // Yeh function ek specific category ke products return karta hai
    getProductsByCategory: function(category) {
        return this.categories[category] || [];
    }
};

// Export data for use in other files
export default ecommerceData;
