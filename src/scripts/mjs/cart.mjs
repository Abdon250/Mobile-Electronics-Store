
const CART_KEY = 'tech_cart';

// Get cart from localStorage
export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Save cart to localStorage
export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add product to cart
export function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
    // Notify user
    alert(`${product.name} added to cart!`);
    console.log(`${product.name} added to cart.`);
    updateCartUI();
}

// Remove product from cart
export function removeFromCart(productName) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== productName);
    saveCart(cart);
    console.log(`${productName} removed from cart.`);
}

// Clear cart completely
export function clearCart() {
    localStorage.removeItem(CART_KEY);
    console.log('Cart cleared.');
}

// Total amount in cart
export function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Total items in cart
export function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Initialize and render the cart page
export function initCartPage() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(product => {
            const imgSrc = product.images?.[0] || '/images/default-image.jpg';
            const price = product.price || 0;
            const quantity = product.quantity || 1;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="item-details">
                    <img src="${imgSrc}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>Price: $${price.toFixed(2)}</p>
                    <p>Quantity: ${quantity}</p>
                    <p>Total: $${(price * quantity).toFixed(2)}</p>
                    <button class="remove-btn" data-product-name="${product.name}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(div);
        });
    }

    // Add remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.productName;
            removeFromCart(name);
            initCartPage(); // re-render
        });
    });

    // Update totals
    const totalItemsEl = document.querySelector('.total-items');
    const totalAmountEl = document.querySelector('.total-amount');
    if (totalItemsEl) totalItemsEl.textContent = `Total Items: ${getCartItemCount()}`;
    if (totalAmountEl) totalAmountEl.textContent = `Total Amount: $${getCartTotal().toFixed(2)}`;

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (getCartItemCount() === 0) {
                alert('Your cart is empty. Add products before checking out.');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
}
export function updateCartUI() {
    const totalItemsEl = document.querySelector('.total-items');
    const totalAmountEl = document.querySelector('.total-amount');

    if (totalItemsEl) totalItemsEl.textContent = `Total Items: ${getCartItemCount()}`;
    if (totalAmountEl) totalAmountEl.textContent = `Total Amount: $${getCartTotal().toFixed(2)}`;
}