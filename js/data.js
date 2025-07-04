// data.js
// Product data and utility methods for PINSTREND website

const pintrendData = {
  // Cart: loaded from localStorage if available
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  // Product List (you can expand this)
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
      stock: 50
    },
    {
      id: "magnetic-fridge-shelf",
      name: "Magnetic Fridge Shelf Rack",
      description: "Extra storage space that attaches magnetically to your fridge",
      price: { inr: 1199, usd: 14.0 },
      image: "https://m.media-amazon.com/images/I/81gCEjDOpSL._SL1500_.jpg",
      link: "https://amzn.to/44rEZEO",
      page: "products.html#magnetic-fridge-shelf",
      category: "Storage",
      rating: 4.3,
      features: ["Strong magnets", "Adjustable width", "Easy to clean"],
      stock: 50
    }
  ],

  // Method: Get cart items
  getCartItems() {
    return this.cart;
  },

  // Method: Get product by ID
  getProductById(productId) {
    return this.products.find(p => p.id === productId);
  },

  // Method: Search products
  searchProducts(term) {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );
  },

  // Method: Add product to cart
  addToCart(productId) {
    const product = this.getProductById(productId);
    if (!product) return;

    if (product.stock > 0) {
      const existing = this.cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1
        });
      }
      product.stock -= 1;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    } else {
      alert("Sorry, this product is out of stock!");
    }
  }
};

export default pintrendData;
