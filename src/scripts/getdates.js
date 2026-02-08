const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;
document.getElementById("last-modified").textContent = document.lastModified;

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.toggle('show');
    
    if (navLinks.classList.contains("show")){
       menuToggle.textContent = "✖";
    } else {
        menuToggle.textContent = "☰";
    }
});