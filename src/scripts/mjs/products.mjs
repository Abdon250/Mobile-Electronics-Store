


import { fetchStoreData } from './api.mjs';
import { addToCart } from './cart.mjs';

export async function initProductsPage() {
    const container = document.getElementById('product-list');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const brandParam = params.get('brand');
    const searchParam = params.get('search');

    const data = await fetchStoreData();
    let productsArray = [];

    
    if (searchParam) {
        const query = searchParam.toLowerCase();

        for (const category in data.products) {
            for (const brand in data.products[category]) {
                data.products[category][brand].forEach(product => {
                    if (
                        product.name.toLowerCase().includes(query) ||
                        product.description.toLowerCase().includes(query) ||
                        brand.toLowerCase().includes(query) ||
                        category.toLowerCase().includes(query)
                    ) {
                        productsArray.push(product);
                    }
                });
            }
        }
    }

    
    else if (categoryParam && brandParam) {
        productsArray =
            data.products?.[categoryParam]?.[brandParam] || [];
    }

    
    else if (categoryParam) {
        const brands = data.products?.[categoryParam];
        if (brands) {
            for (const brand in brands) {
                productsArray.push(...brands[brand]);
            }
        }
    }

   
    else {
        for (const category in data.products) {
            for (const brand in data.products[category]) {
                productsArray.push(...data.products[category][brand]);
            }
        }
    }

   
    container.innerHTML = '';

    if (productsArray.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    productsArray.forEach(product => {
        const div = document.createElement('div');
        div.className = 'category-item';

        /* Image slider */
        let imgIndex = 0;
        const img = document.createElement('img');
        img.src = product.images[imgIndex];
        img.alt = product.name;
        img.style.cursor = 'pointer';
        img.style.width = '200px';
        img.style.height = '200px';

        img.addEventListener('click', () => {
            imgIndex = (imgIndex + 1) % product.images.length;
            img.src = product.images[imgIndex];
        });

        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <input type="number" min="1" value="1" class="quantity-input" />
            <button class="add-cart">Add to Cart</button>
        `;

        div.insertBefore(img, div.firstChild);

        /* Add to cart */
        const qtyInput = div.querySelector('.quantity-input');
        const addBtn = div.querySelector('.add-cart');

        addBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;
            addToCart(product, qty);
            alert(`✅ ${product.name} added to cart`);
        });

        container.appendChild(div);
    });
}
