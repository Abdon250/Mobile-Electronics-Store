
export async function loadTemplate(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`Failed to load template: ${path}`);
        return await res.text();
    } catch (err) {
        console.error(err);
        return "";
    }
}

export function renderWithTemplate(templateString, element) {
    if (!element) return;
    element.innerHTML = templateString;
}


// Generic JSON fetch with error handling
export async function fetchJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}


// Cart management utilities
export const CART_KEY = 'tech_cart';

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

export function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}
