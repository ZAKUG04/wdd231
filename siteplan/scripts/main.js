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
    document.documentElement.style.setProperty('--brand-yellow', on ? '#FFD447' : '#FFD447');
    document.documentElement.style.setProperty('--brand-black', on ? '#0b0b0b' : '#0b0b0b');
    // add a body class to flip backgrounds if you want more contrast changes
    document.body.classList.toggle('alt-contrast', on);
    contrastToggle.setAttribute('aria-pressed', String(on));
    localStorage.setItem('slg_contrast', on ? 'on' : 'off');
  }
});
