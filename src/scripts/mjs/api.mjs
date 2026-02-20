/*
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
*/




const API_URL = "https://abdon250.github.io/Electronics-API/products.json";


export async function fetchStoreData() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load API data");
    return await res.json();
  } catch (err) {
    console.error("Error fetching store data:", err);
    return null;
  }
}


export async function fetchAllProducts() {
  const data = await fetchStoreData();
  if (!data) return [];

  const all = [];

  for (const category in data) {
    data[category].forEach(brand => {
      if (Array.isArray(brand.products)) {
        all.push(...brand.products);
      }
    });
  }

  return all;
}


export async function fetchProducts() {
  return await fetchStoreData();
}
