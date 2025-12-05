// navbar-las li del header

export function initNavbar() {
    const navList = document.getElementById("nav-list");
    const nav = document.getElementById("main-nav");
    const toggle = document.getElementById("nav-toggle");

    // Generate navigation items
    navList.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="machine.html">Machines</a></li>
        <li><a href="form-action.html">Form</a></li>
    `;

    // Mobile toggle
    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute("aria-expanded", String(!isOpen));
        nav.classList.toggle("open");

        // For mobile visibility
        if (!isOpen) {
            navList.style.display = "flex";
        } else {
            navList.style.display = "";
        }
    });
}
