import { loadHeaderFooter } from "./mjs/loadHeaderFooter.mjs";
import { initHeaderFooterFeatures } from "./mjs/headerFooterFeatures.mjs";
import { initSearch } from "./mjs/search.mjs";



document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();           
    initHeaderFooterFeatures();     
    initSearch();                  
});





