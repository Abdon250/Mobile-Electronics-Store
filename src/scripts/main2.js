
import { initCategoriesPage } from './mjs/categories.mjs';
import { initProductsPage } from './mjs/products.mjs';
import { initCartPage } from './mjs/cart.mjs';
import { initCheckoutPage } from './mjs/checkout.mjs';
import { initSearch } from "./mjs/search.mjs";
import { initSearchForm } from "./mjs/searchForm.mjs";
import { initLogin } from './mjs/login.mjs';
import { initSignup } from './mjs/signup.mjs';
import { initHomePage } from './mjs/home-page.mjs';

document.addEventListener("DOMContentLoaded", () => {
    initCartPage();
    initCategoriesPage();
    initProductsPage();
    initLogin();
    initSignup();
    initHomePage();
});



document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.cart-items')) {
        initCartPage();
    }
    if (document.querySelector('.checkout-items')) {
        initCheckoutPage();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    initSearchForm(); 
    initSearch();     
});