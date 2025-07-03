// Homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Render trending products on homepage
    const trendingGrid = document.getElementById('trending-products');
    if(trendingGrid) {
        fetch('/assets/data/products.json')
            .then(res => res.json())
            .then(data => {
                const trending = Object.values(data)
                    .flat()
                    .filter(p => p.trending)
                    .slice(0, 6);
                
                trending.forEach(product => {
                    trendingGrid.innerHTML += `
                        <div class="product-card">
                            <a href="/products/${product.id}.html">
                                <img src="${product.image}" alt="${product.title}">
                                <h3>${product.title}</h3>
                                <div class="price">${product.price}</div>
                                <div class="rating">${product.rating} ★</div>
                            </a>
                        </div>
                    `;
                });
            });
    }

    // Render featured posts
    const postsGrid = document.getElementById('featured-posts');
    if(postsGrid) {
        fetch('/assets/data/blog.json')
            .then(res => res.json())
            .then(data => {
                data.slice(0, 3).forEach(post => {
                    postsGrid.innerHTML += `
                        <article class="post-card">
                            <a href="/blog/${post.id}.html">
                                <img src="${post.image}" alt="${post.title}">
                                <h3>${post.title}</h3>
                                <p>${post.excerpt}</p>
                                <span class="read-more">Read More →</span>
                            </a>
                        </article>
                    `;
                });
            });
    }
});
