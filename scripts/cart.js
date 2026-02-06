const CART_KEY = 'tech_cart';

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

//console.log('cart.js loaded');

function addToCart(product, quantity = 1) {
    //get the latest cart
    let cart = getCart();
    //check if product already in cart
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
    console.log((`${product.name} added to cart.`));
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function removeFromCart(productName) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== productName);
    saveCart(cart);
    console.log((`${productName} removed from cart.`));
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    console.log('Cart cleared.');
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

const totalItemsEl = document.querySelector('.total-items');
const totalAmountEl = document.querySelector('.total-amount');

if (totalItemsEl) {
    totalItemsEl.textContent = `Total Items: ${getCartItemCount()}`;
}

if (totalAmountEl) {
    totalAmountEl.textContent = `Total Amount: $${getCartTotal().toFixed(2)}`;
}

const checkoutBtn = document.querySelector('.checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (getCartItemCount() === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }
        window.location.href = 'checkout.html';
    });

}


const cartContainer = document.querySelector('.cart-items');

cartContainer.innerHTML = '';
cart.forEach(product => {

    const imgSrc = product.images && product.images.length > 0 ? product.images[0] : 'images/default-image.jpg';
    

    const price = product.price || 0;  // Fallback to 0 if product.price is undefined
    const quantity = product.quantity || 1;  // Fallback to 1 if quantity is undefined
     
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        
        <div class="item-details">
            <img src="${imgSrc}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Price: $${price.toFixed(2)}</p>  <!-- Use 'price' variable here -->
            <p>Quantity: ${quantity}</p>  <!-- Use 'quantity' variable here -->
            <p>Total: $${(price * quantity).toFixed(2)}</p>  <!-- Use 'price' and 'quantity' here -->
            <button class="remove-btn" data-product-name="${product.name}">Remove</button>
        </div>
    `;
    cartContainer.appendChild(div);

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.productName;
            removeFromCart(name);
            location.reload(); // Refresh to update cart display
        });
    });
});
