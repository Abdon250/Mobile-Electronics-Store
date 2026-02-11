import { loadHeaderFooter } from "./mjs/loadHeaderFooter.mjs";
import { initHeaderFooterFeatures } from "./mjs/headerFooterFeatures.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();           
    initHeaderFooterFeatures();         
});





