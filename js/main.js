// Mobile Navigation Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const navIcons = document.querySelector('.nav-icons');
    
    if (navLinks.style.display === 'flex' || navIcons.style.display === 'flex') {
        navLinks.style.display = 'none';
        navIcons.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navIcons.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navIcons.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        
        navIcons.style.position = 'absolute';
        navIcons.style.top = 'calc(70px + 180px)'; // Adjust based on nav links height
        navIcons.style.left = '0';
        navIcons.style.width = '100%';
        navIcons.style.backgroundColor = 'white';
        navIcons.style.padding = '20px';
        navIcons.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    }
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
