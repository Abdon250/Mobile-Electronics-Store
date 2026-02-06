// Get cart


// Render cart items
const checkoutItemsContainer = document.querySelector('.checkout-items');
checkoutItemsContainer.innerHTML = '';

cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'checkout-item';
    div.innerHTML = `
        <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
    `;
    checkoutItemsContainer.appendChild(div);
});

// Render totals
document.getElementById('checkout-total-items').textContent = getCartItemCount();
document.getElementById('checkout-total-amount').textContent = getCartTotal().toFixed(2);

// Handle form submission
const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const formData = new FormData(checkoutForm);
    const order = {
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        items: cart,
        total: getCartTotal()
    };

    console.log('Order placed:', order);

    document.getElementById('order-message').textContent = '✅ Order placed successfully!';

    // Clear cart after order
    clearCart();

    // Optionally, redirect to thank you page
    // window.location.href = 'thankyou.html';
});
