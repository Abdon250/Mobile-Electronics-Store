import { fetchProducts } from "./api.mjs";

export async function initHomePage() {
    const container = document.querySelector("#home-featured");
    if (!container) {
        console.warn("Home featured container not found");
        return;
    }

    try {
        const products = await fetchProducts();

        
        const featured = products["phones"] || []; 
        featured.slice(0, 3).forEach(item => {
            const card = `
                <div class="product-card">
                    <img src="${item.images[0]}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            container.innerHTML += card;
        });

    } catch (err) {
        console.error("Failed to load products", err);
        container.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    }
}
