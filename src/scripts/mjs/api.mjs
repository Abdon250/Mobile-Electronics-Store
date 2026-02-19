

/*export async function fetchStoreData() {
    const response = await fetch('/json/products.json');
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Failed to load products.json');
    }

    return data;
}
export async function fetchProducts() {
    const res = await fetch("/json/products.json");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
}
*/

// Load products.json and provide helper functions

export async function fetchStoreData() {
  try {
    const res = await fetch("/json/products.json");
    if (!res.ok) throw new Error("Failed to load products.json");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching store data:", err);
    return null;
  }
}

// Flatten all products into a single array
export async function fetchAllProducts() {
  const data = await fetchStoreData();
  if (!data) return [];

  const all = [];
  for (const category in data) {
    for (const brand in data[category]) {
      const arr = data[category][brand];
      if (Array.isArray(arr)) all.push(...arr);
    }
  }
  return all;

}

export async function fetchProducts() {
    const res = await fetch("/json/products.json");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
}
