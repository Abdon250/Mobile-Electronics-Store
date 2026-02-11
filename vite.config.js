import { defineConfig } from "vite";


export default defineConfig({
  root: ".", 
  publicDir: "public", 
  build: {
    outDir: "dist",  
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
        products: "src/html/products.html",
        categories: "src/html/categories.html",
        cart: "src/html/cart.html",
        checkout: "src/html/checkout.html",
        login: "src/html/login.html",
        signup: "src/html/signup.html"
      }
    }
  }
});
