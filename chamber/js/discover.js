// discover.js - carga JSON, muestra mensaje con localStorage y actualiza año

// -> Mensaje de última visita
function showVisitMessage() {
  const visitDisplay = document.querySelector("#visitMessage");
  const lastVisit = localStorage.getItem("lastVisitDiscover");
  const now = Date.now();

  if (!lastVisit) {
    visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysPassed < 1) {
      visitDisplay.textContent = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
      visitDisplay.textContent = "You last visited 1 day ago.";
    } else {
      visitDisplay.textContent = `You last visited ${daysPassed} days ago.`;
    }
  }

  localStorage.setItem("lastVisitDiscover", now.toString());
}

// -> Cargar lugares desde JSON y crear cards
async function loadPlaces() {
  const grid = document.querySelector("#discoverGrid");
  grid.innerHTML = ""; // limpiar si hay algo

  try {
    const res = await fetch("data/discover.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const places = await res.json();

    places.forEach(place => {
      const card = document.createElement("article");
      card.className = "spot-card";

      card.innerHTML = `
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <h4>${place.name}</h4>
        <p>${place.description}</p>
        <button class="learn-btn" type="button">Learn More</button>
      `;

      grid.appendChild(card);
    });

  } catch (err) {
    console.error("Error fetching discover.json:", err);
    grid.innerHTML = `<div class="card">There was an error loading the Discover content.</div>`;
  }
}

// -> Actualizar año y lastModified (if present)
function updateFooterInfo() {
  const y = new Date().getFullYear();
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = y;

  const lastModEl = document.querySelector("#lastModified");
  if (lastModEl) {
    // intenta usar document.lastModified; en GitHub Pages esto puede no reflejar commits.
    lastModEl.textContent = document.lastModified || "N/A";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showVisitMessage();
  loadPlaces();
  updateFooterInfo();
});

// Hamburger menu
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});