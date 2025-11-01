// scripts/nav.js
// Control del menú hamburger y wayfinding (accesibilidad)
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu');
  const mainnav = document.querySelector('.navigation');

  if (!menuButton || !mainnav) return;

  menuButton.addEventListener('click', () => {
    const open = mainnav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  // Cerrar menú al pulsar un enlace (útil en móvil)
  mainnav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (mainnav.classList.contains('open')) {
        mainnav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Wayfinding básico: marcar enlace activo si coincide con la ruta
  const current = location.pathname.split('/').pop() || 'index.html';
  mainnav.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) {
      a.classList.add('active');
    }
  });
});
