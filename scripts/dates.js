// scripts/dates.js
// Pone el año actual y la fecha de última modificación en el footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentyear');
  const lastEl = document.getElementById('lastModified');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (lastEl) {
    // document.lastModified entrega una cadena; la mostramos tal cual (requisito del curso)
    lastEl.textContent = `Last modified: ${document.lastModified}`;
  }
});
