
/* ---------- small helpers ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------- menu toggle (mobile only) ---------- */
const menuBtn = $('#menuButton');
const navMenu = $('#navMenu');
menuBtn && menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

/* ---------- footer dynamic values ---------- */
const yearSpan = $('#year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
const lastMod = $('#lastModified');
if (lastMod) lastMod.textContent = document.lastModified;

/* ---------- EVENTS (placeholder) ---------- */
const events = [
  "Business Expo – February 12",
  "Local Market Day – February 20",
  "Entrepreneurs Meetup – March 01"
];
const eventsList = $('#eventsList');
if (eventsList) {
  eventsList.innerHTML = events.map(e => `<li>${e}</li>`).join('');
}


const API_KEY = '725a4520522c7cad62c0972bf32bfd16'; 
const LAT = 40.4168;
const LON = -3.7038;

async function fetchWeather() {
  if (!API_KEY) return;

  try {
    // Current weather (FREE)
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const r1 = await fetch(currentURL);
    if (!r1.ok) throw new Error("Weather API error");
    const data = await r1.json();

    // Mostrar clima actual
    $('#weatherTemp').textContent = `${Math.round(data.main.temp)} °C`;
    $('#weatherDesc').textContent = data.weather[0].description;
    $('#weatherExtra').innerHTML = `
      <div>Feels: ${Math.round(data.main.feels_like)}°C</div>
      <div>Humidity: ${data.main.humidity}%</div>
      <div>Wind: ${Math.round(data.wind.speed)} m/s</div>
    `;

    // Forecast (FREE)
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const r2 = await fetch(forecastURL);
    const fdata = await r2.json();

    // Filtrar un pronóstico por día (12:00)
    const days = fdata.list.filter(i => i.dt_txt.includes("12:00:00")).slice(0, 3);
    const forecastList = $('#forecastList');

    if (forecastList) {
      forecastList.innerHTML = days.map(d => {
        const date = new Date(d.dt * 1000);
        const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
        return `
          <li>${dayName}: ${Math.round(d.main.temp)}°C 
          (H:${Math.round(d.main.temp_max)} / L:${Math.round(d.main.temp_min)})</li>
        `;
      }).join('');
    }

  } catch (err) {
    console.error("Weather fetch error", err);
    $('#weatherDesc').textContent = 'Unable to load weather.';
  }
}
fetchWeather();

/* ---------- COMPANY SPOTLIGHT---------- */
async function loadSpotlights() {
  try {
    const resp = await fetch('data/members.json');
    if (!resp.ok) throw new Error('members JSON not found');
    const members = await resp.json();

    // members.json might be array or object; support both
    const list = Array.isArray(members) ? members : (members.members || []);
    const filtered = list.filter(m => (m.membership && (m.membership.toLowerCase() === 'gold' || m.membership.toLowerCase() === 'silver')));

    // shuffle
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, 3); 

    const container = $('#spotlightContainer');
    if (!container) return;

    container.innerHTML = chosen.map(m => {
      const imgSrc = m.image && m.image.startsWith('http') ? m.image : `images/${m.image || 'placeholder.png'}`;
      return `
        <div class="spot-card" role="article">
          <img src="${imgSrc}" alt="${m.name} logo" />
          <h4>${m.name}</h4>
          <p>${m.address || ''}</p>
          <p><a href="${m.website}" target="_blank" rel="noopener">${m.website}</a></p>
          <p><strong>Membership:</strong> ${m.membership}</p>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('Spotlight load error', err);
  }
}
loadSpotlights();
