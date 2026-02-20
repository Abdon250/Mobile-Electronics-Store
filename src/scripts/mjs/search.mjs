/*import { addToCart } from './cart.mjs';

export async function initSearch() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    if (!input || !resultsContainer) return;

    // Fetch products.json from public folder
    const response = await fetch('/json/products.json');
    const data = await response.json();
    const products = data.products; // adjust if your JSON wraps products in a "products" key

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';

        if (!query) return;

        const matches = [];

        for (const cat in products) {
            for (const br in products[cat]) {
                const items = Array.isArray(products[cat][br]) ? products[cat][br] : [];
                items.forEach(p => {
                    if (p.name.toLowerCase().includes(query)) matches.push(p);
                });
            }
        }

        if (!matches.length) {
            resultsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }

        matches.forEach(product => {
            const div = document.createElement('div');
            div.className = 'category-item';
            div.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" style="height:150px; width:150px;">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <input type="number" min="1" value="1" class="quantity-input" />
                <button class="add-cart">Add to Cart</button>
            `;
            const qtyInput = div.querySelector('.quantity-input');
            const addBtn = div.querySelector('.add-cart');

            addBtn.addEventListener('click', () => {
                const qty = parseInt(qtyInput.value) || 1;
                addToCart(product, qty);
                alert(`${product.name} added to cart`);
            });

            resultsContainer.appendChild(div);
        });
    });
}
*/

import { addToCart } from './cart.mjs';
import { fetchStoreData } from './api.mjs';

export async function initSearch() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    if (!input || !resultsContainer) return;

    const data = await fetchStoreData();
    if (!data || !data.products) {
        resultsContainer.innerHTML = '<p>Failed to load products.</p>';
        return;
    }

    const products = data.products; // this is correct for your API

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';

        if (!query) return;

        const matches = [];

        for (const cat in products) {
            for (const br in products[cat]) {
                const items = Array.isArray(products[cat][br]) ? products[cat][br] : [];
                items.forEach(p => {
                    if (p.name.toLowerCase().includes(query)) matches.push(p);
                });
            }
        }

        if (!matches.length) {
            resultsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }

        matches.forEach(product => {
            const div = document.createElement('div');
            div.className = 'category-item';
            div.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" style="height:150px; width:150px;">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <input type="number" min="1" value="1" class="quantity-input" />
                <button class="add-cart">Add to Cart</button>
            `;
            const qtyInput = div.querySelector('.quantity-input');
            const addBtn = div.querySelector('.add-cart');

            addBtn.addEventListener('click', () => {
                const qty = parseInt(qtyInput.value) || 1;
                addToCart(product, qty);
                alert(`${product.name} added to cart`);
            });

            resultsContainer.appendChild(div);
        });
    });
}
