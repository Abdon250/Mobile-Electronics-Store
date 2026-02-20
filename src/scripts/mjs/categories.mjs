
/*export async function initCategoriesPage() {
    try {
        const res = await fetch('/json/products.json');
        if (!res.ok) throw new Error(`Failed to fetch products.json: ${res.status}`);
        const data = await res.json();

        const categoryBrands = data.categoryBrands;

        // Home page container
        const homeCategoryContainer = document.getElementById('home-category-list');
        if (homeCategoryContainer) {
            homeCategoryContainer.innerHTML = '';
            for (const category in categoryBrands) {
                const div = document.createElement('div');
                div.className = 'category-item';
                div.innerHTML = `
                    <a href="categories.html?category=${category}">
                        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <img src="${categoryBrands[category][0].image}" alt="${category}" loading="lazy">
                    </a>
                `;
                homeCategoryContainer.appendChild(div);
            }
        }

        // Categories page
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category');

        const titleEl = document.getElementById('category-title');
        const brandListEl = document.getElementById('brand-list');

        if (brandListEl && titleEl) {
            brandListEl.innerHTML = '';

            if (!categoryParam) {
                titleEl.textContent = 'Categories';
                for (const cat in categoryBrands) {
                    const div = document.createElement('div');
                    div.className = 'category-item';
                    div.innerHTML = `
                        <img src="${categoryBrands[cat][0].image}" alt="${cat}" loading="lazy">
                        <p>${cat}</p>
                    `;
                    div.addEventListener('click', () => {
                        window.location.href = `categories.html?category=${cat}`;
                    });
                    brandListEl.appendChild(div);
                }
            } else {
                if (!categoryBrands[categoryParam]) {
                    brandListEl.innerHTML = '<p>No brands available for this category.</p>';
                } else {
                    titleEl.textContent = categoryParam.toUpperCase();
                    categoryBrands[categoryParam].forEach(brand => {
                        const div = document.createElement('div');
                        div.className = 'category-item';
                        div.innerHTML = `
                            <img src="${brand.image}" alt="${brand.name}" loading="lazy">
                            <p>${brand.name}</p>
                        `;
                        div.addEventListener('click', () => {
                            window.location.href = `products.html?category=${categoryParam}&brand=${encodeURIComponent(brand.name)}`;
                        });
                        brandListEl.appendChild(div);
                    });
                }
            }
        }

    } catch (err) {
        console.error('Error initializing categories page:', err);
    }
}

*/
// src/scripts/mjs/categories.mjs
import { fetchStoreData } from './api.mjs';

export async function initCategoriesPage() {
    try {
        // Fetch live API
        const data = await fetchStoreData();
        if (!data || !data.categoryBrands) throw new Error("Failed to load categories");

        const categoryBrands = data.categoryBrands;

        // --- Home page container ---
        const homeCategoryContainer = document.getElementById('home-category-list');
        if (homeCategoryContainer) {
            homeCategoryContainer.innerHTML = '';
            for (const category in categoryBrands) {
                const firstBrand = categoryBrands[category][0];
                const div = document.createElement('div');
                div.className = 'category-item';
                div.innerHTML = `
                    <a href="categories.html?category=${category}">
                        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <img src="${firstBrand.image}" alt="${category}" loading="lazy">
                    </a>
                `;
                homeCategoryContainer.appendChild(div);
            }
        }

        // --- Categories page ---
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category');

        const titleEl = document.getElementById('category-title');
        const brandListEl = document.getElementById('brand-list');

        if (brandListEl && titleEl) {
            brandListEl.innerHTML = '';

            if (!categoryParam) {
                // Show all categories as cards
                titleEl.textContent = 'Categories';
                for (const cat in categoryBrands) {
                    const div = document.createElement('div');
                    div.className = 'category-item';
                    const firstBrand = categoryBrands[cat][0];
                    div.innerHTML = `
                        <img src="${firstBrand.image}" alt="${cat}" loading="lazy">
                        <p>${cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
                    `;
                    div.addEventListener('click', () => {
                        window.location.href = `categories.html?category=${cat}`;
                    });
                    brandListEl.appendChild(div);
                }
            } else {
                // Show brands in selected category
                const brands = categoryBrands[categoryParam];
                if (!brands || !brands.length) {
                    brandListEl.innerHTML = '<p>No brands available for this category.</p>';
                } else {
                    titleEl.textContent = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
                    brands.forEach(brand => {
                        const div = document.createElement('div');
                        div.className = 'category-item';
                        div.innerHTML = `
                            <img src="${brand.image}" alt="${brand.name}" loading="lazy">
                            <p>${brand.name}</p>
                        `;
                        div.addEventListener('click', () => {
                            window.location.href = `products.html?category=${categoryParam}&brand=${encodeURIComponent(brand.name)}`;
                        });
                        brandListEl.appendChild(div);
                    });
                }
            }
        }
    } catch (err) {
        console.error('Error initializing categories page:', err);
        const brandListEl = document.getElementById('brand-list');
        if (brandListEl) brandListEl.innerHTML = '<p>Failed to load categories. Please try again later.</p>';
    }
}
