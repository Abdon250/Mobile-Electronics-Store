export function initSearchForm() {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) {
            alert("Please enter a search term");
            return;
        }
        // Dispatch custom event with search term
        const event = new CustomEvent("searchProducts", { detail: query });
        document.dispatchEvent(event);
    });
}
