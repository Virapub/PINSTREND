
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
