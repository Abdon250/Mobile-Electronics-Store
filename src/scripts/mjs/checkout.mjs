
import { getCart, getCartItemCount, getCartTotal, clearCart } from './cart.mjs';

export function initCheckoutPage() {
    const cartContainer = document.querySelector('.checkout-items');
    const totalItemsEl = document.getElementById('checkout-total-items');
    const totalAmountEl = document.getElementById('checkout-total-amount');
    const checkoutForm = document.getElementById('checkout-form');
    const orderMessage = document.getElementById('order-message');

    if (!cartContainer || !checkoutForm) return;

    const cart = getCart();

    // --- Render cart items ---
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'checkout-item';
            const imgSrc = item.images && item.images.length ? item.images[0] : 'images/default-image.jpg';
            div.innerHTML = `
                <p><strong>${item.name}</strong> x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartContainer.appendChild(div);
        });
    }

    // --- Render totals ---
    if (totalItemsEl) totalItemsEl.textContent = getCartItemCount();
    if (totalAmountEl) totalAmountEl.textContent = getCartTotal().toFixed(2);

    // --- Form validation ---
    const inputs = checkoutForm.querySelectorAll('input[required]');
    inputs.forEach(input => {
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.style.color = 'red';
        errorEl.style.fontSize = '0.9em';
        errorEl.style.marginTop = '2px';
        input.parentNode.insertBefore(errorEl, input.nextSibling);

        input.addEventListener('input', () => {
            if (!input.checkValidity()) {
                errorEl.textContent = input.validationMessage;
            } else {
                errorEl.textContent = '';
            }
        });
    });

    // --- Form submission ---
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();

        // Trigger validation on all inputs
        let valid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valid = false;
                input.nextSibling.textContent = input.validationMessage;
            }
        });
        if (!valid) return;

        if (cart.length === 0) {
            alert('Your cart is empty.');
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

        orderMessage.textContent = '✅ Order placed successfully!';
        orderMessage.style.color = 'green';

        clearCart();

        // Update totals after clearing cart
        if (totalItemsEl) totalItemsEl.textContent = 0;
        if (totalAmountEl) totalAmountEl.textContent = '0.00';
        cartContainer.innerHTML = '';
        checkoutForm.reset();
        inputs.forEach(input => input.nextSibling.textContent = '');
    });
}
