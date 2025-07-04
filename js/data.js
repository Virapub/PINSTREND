// data.js
// Product data for PINSTREND website

const pintrendData = {
    // Cart to store added items, loaded from localStorage
    cart: JSON.parse(localStorage.getItem("cart")) || [],

    // Products array with provided details
    products: [
        {
            id: "collapsible-electric-kettle",
            name: "Collapsible Electric Kettle",
            description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection",
            price: { inr: 1499, usd: 17.51 },
            image: "https://m.media-amazon.com/images/I/61WQVNM0LCL._SL1500_.jpg",
            link: "https://amzn.to/448SSZx",
            page: "products.html#collapsible-electric-kettle",
            category: "Appliances",
            rating: 4.5,
            features: ["Collapsible design", "800W power", "BPA-free materials"],
            stock: 50
        },
        {
            id: "automatic-soap-dispenser",
            name: "Automatic Soap Dispenser",
            description: "Touchless soap dispenser with infrared sensor for hygienic use",
            price: { inr: 1388, usd: 16.21 },
            image: "https://m.media-amazon.com/images/I/61Vqx4KEHuL._SL1024_.jpg",
            link: "https://amzn.to/46sLIRc",
            page: "products.html#automatic-soap-dispenser",
            category: "Smart Gadgets",
            rating: 4.2,
            features: ["Touchless operation", "Battery powered", "Adjustable soap volume"],
            stock: 30
        },
        {
            id: "magnetic-fridge-shelf",
            name: "Magnetic Fridge Shelf Rack",
            description: "Extra storage space that attaches magnetically to your fridge",
            price: { inr: 1199, usd: 14.00 },
            image: "https://m.media-amazon.com/images/I/81gCEjDOpSL._SL1500_.jpg",
            link: "https://amzn.to/44rEZEO",
            page: "products.html#magnetic-fridge-shelf",
            category: "Storage",
            rating: 4.3,
            features: ["Strong magnets", "Adjustable width", "Easy to clean"],
            stock: 40
        }
    ],

    // Method to get cart items
    getCartItems() {
        return this.cart;
    },

    // Method to search products by name or category
    searchProducts(term) {
        return this.products.filter(product => 
            product.name.toLowerCase().includes(term.toLowerCase()) || 
            product.category.toLowerCase().includes(term.toLowerCase())
        );
    },

    // Method to add product to cart with stock check
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product && product.stock > 0) {
            this.cart.push(product);
            product.stock -= 1; // Reduce stock
            localStorage.setItem("cart", JSON.stringify(this.cart));
        } else if (product && product.stock === 0) {
            alert("Sorry, yeh product out of stock hai!");
        }
    },

    // Method to get product by ID
    getProductById(productId) {
        return this.products.find(p => p.id === productId);
    }
};

// Export pintrendData as default
export default pintrendData;
