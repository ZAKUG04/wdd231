// main.js (entry module)
import { initNavbar } from './navbar.js';
import { initModal } from './modals.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModal();

  // set footer year (template literal + DOM)
  document.getElementById('year').textContent = new Date().getFullYear();

  // populate form with localStorage if exists
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const levelSelect = document.getElementById('level');
  const goalInput = document.getElementById('goal');
  const form = document.getElementById('signup-form');

  const saved = JSON.parse(localStorage.getItem('slg_user') || '{}');
  if (saved.name) nameInput.value = saved.name;
  if (saved.email) emailInput.value = saved.email;
  if (saved.level) levelSelect.value = saved.level;
  if (saved.goal) goalInput.value = saved.goal;

  form.addEventListener('submit', (e) => {
    // allow normal submit (GET) but save to localStorage first
    const payload = {
      name: nameInput.value,
      email: emailInput.value,
      level: levelSelect.value,
      goal: goalInput.value
    };
    localStorage.setItem('slg_user', JSON.stringify(payload));
    // form will submit normally to form-action.html
  });

  // contrast / yellow mode toggle
  const contrastToggle = document.getElementById('contrast-toggle');
  const contrastState = localStorage.getItem('slg_contrast') === 'on';
  setContrast(contrastState);
  contrastToggle.addEventListener('click', () => {
    const state = localStorage.getItem('slg_contrast') !== 'on';
    setContrast(state);
  });

function setContrast(on) {
  if (on) {
    // Modo contraste ALTO
    document.documentElement.style.setProperty('--brand-yellow', '#ffea00');
    document.documentElement.style.setProperty('--brand-black', '#000000');
    document.body.classList.add("alt-contrast");
  } else {
    // Modo normal
    document.documentElement.style.setProperty('--brand-yellow', '#FFD447');
    document.documentElement.style.setProperty('--brand-black', '#0b0b0b');
    document.body.classList.remove("alt-contrast");
  }

  contrastToggle.setAttribute('aria-pressed', String(on));
  localStorage.setItem('slg_contrast', on ? 'on' : 'off');
}
});
