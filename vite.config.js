import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "src/html/products.html"),
        categories: resolve(__dirname, "src/html/categories.html"),
        cart: resolve(__dirname, "src/html/cart.html"),
        checkout: resolve(__dirname, "src/html/checkout.html"),
        signin: resolve(__dirname, "src/html/signin.html"),
        signup: resolve(__dirname, "src/html/signup.html")
      }
    }
  }
});
