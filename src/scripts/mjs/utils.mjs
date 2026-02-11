
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
