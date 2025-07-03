const fs = require('fs-extra');
const Handlebars = require('handlebars');

// Register helper to stringify JSON
Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

// Load templates
const templates = {
    index: Handlebars.compile(fs.readFileSync('./src/templates/index.html', 'utf8')),
    product: Handlebars.compile(fs.readFileSync('./src/templates/product.html', 'utf8')),
    post: Handlebars.compile(fs.readFileSync('./src/templates/post.html', 'utf8'))
};

// Load data
const products = require('./src/data/products.js');
const blogs = require('./src/data/blog.js');

// Create output directory
fs.ensureDirSync('./docs');
fs.ensureDirSync('./docs/products');
fs.ensureDirSync('./docs/blog');

// Generate homepage
const trendingProducts = Object.values(products)
    .flat()
    .filter(p => p.trending)
    .slice(0, 6);

const featuredPosts = blogs.slice(0, 3);

fs.writeFileSync('./docs/index.html', templates.index({
    trendingProducts,
    featuredPosts,
    categories: Object.keys(products)
}));

// Generate product pages
Object.entries(products).forEach(([category, items]) => {
    items.forEach(product => {
        const html = templates.product({
            ...product,
            category,
            pageTitle: `${product.title} - TRENDSUNG`,
            pinImage: `https://yourdomain.com/images/pins/${product.id}-pin.jpg`,
            url: `https://yourdomain.com/products/${product.id}.html`
        });
        fs.writeFileSync(`./docs/products/${product.id}.html`, html);
    });
});

// Generate blog pages
blogs.forEach(post => {
    const html = templates.post({
        ...post,
        pageTitle: `${post.title} - TRENDSUNG Blog`,
        formattedDate: new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    });
    fs.writeFileSync(`./docs/blog/${post.id}.html`, html);
});

// Copy data files for client-side use
fs.copySync('./src/data', './docs/assets/data');

console.log('✅ All pages generated successfully!');
