// script.js
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

// Load categories on home page

const homeCategoryCotainer = document.getElementById('home-category-list');
homeCategoryCotainer.innerHTML = '';
    
    for (const category in categoryBrands) {
        const div = document.createElement('div');
        div.className = 'category-item';
        div.innerHTML = `
            <a href="html-files/categories.html?category=${category}">
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <img src="${categoryBrands[category][0].image}" alt="${category}">
                <p>${category}</p>
            </a>
        `;
        homeCategoryCotainer.appendChild(div);
    }





