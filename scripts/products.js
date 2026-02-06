const params = new URLSearchParams(window.location.search);
const categoryParam = params.get('category');
const brandParam = params.get('brand');

const productContainer = document.getElementById('product-list');


// Shuffle helper for random display
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Add to cart
/*addBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product, qty);
});*/

// Render products
function renderProducts(category, brand) {
    let productArray = [];

    if (category && brand && products[category] && products[category][brand]) {
        productArray = products[category][brand];
    } else if (category && products[category]) {
        // All brands in category
        for (const br in products[category]) {
            productArray = productArray.concat(products[category][br]);
        }
    } else {
        // All products
        for (const cat in products) {
            for (const br in products[cat]) {
                productArray = productArray.concat(products[cat][br]);
            }
        }
        productArray = shuffleArray(productArray); // random order
    }

    productContainer.innerHTML = '';
    if (!productArray.length) {
        productContainer.innerHTML = '<p>No products available.</p>';
        return;
    }

    productArray.forEach(product => {
        const div = document.createElement('div');
        div.className = 'category-item';

        // Image slider for multiple images
        let imgIndex = 0;
        const imgEl = document.createElement('img');
        imgEl.src = product.images[imgIndex];
        imgEl.alt = product.name;
        imgEl.style.cursor = 'pointer';
        imgEl.style.height = '200px';
        imgEl.style.width = '200px';

        imgEl.addEventListener('click', () => {
            imgIndex = (imgIndex + 1) % product.images.length;
            imgEl.src = product.images[imgIndex];
            
        });

        div.innerHTML = `
            
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <input type="number" min="1" value="1" class="quantity-input" />
            <button class="add-cart">Add to Cart</button>
        `;

        div.insertBefore(imgEl, div.firstChild);

        // Add to cart
        const qtyInput = div.querySelector('.quantity-input');
        const addBtn = div.querySelector('.add-cart');
        addBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;
            addToCart(product, qty);
        });

        productContainer.appendChild(div);
    });
}

// Initial render
renderProducts(categoryParam, brandParam);
