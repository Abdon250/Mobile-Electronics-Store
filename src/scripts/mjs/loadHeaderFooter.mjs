
import { loadTemplate, renderWithTemplate } from "./utils.mjs";

export async function loadHeaderFooter() {
    const headerElement = document.querySelector("#header");
    const footerElement = document.querySelector("#footer");

    if (!headerElement || !footerElement) return; // safety check

    const [headerTemplate, footerTemplate] = await Promise.all([
        loadTemplate("/templates/header.html"),
        loadTemplate("/templates/footer.html")
    ]);

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    document.dispatchEvent(new Event("headerLoaded"));
}
