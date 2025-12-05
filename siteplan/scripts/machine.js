// lo que hace real la pagina mcchine

async function loadMachines() {
    try {
        const response = await fetch("data/machine.json");
        const machines = await response.json();

        const container = document.getElementById("machinesGrid");

        machines.forEach(machine => {
            const card = document.createElement("div");
            card.classList.add("machine-card");

            // lateral dinamico
            card.innerHTML = `
                <img 
                    src="${machine.image}" 
                    alt="${machine.name}" 
                    loading="lazy"
                >
                <h3>${machine.name}</h3>
                <p class="category">${machine.category}</p>
                <p class="desc">${machine.description}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading machines:", error);
        // Mensaje visible para el usuario en caso de fallo
        const container = document.getElementById("machinesGrid");
        container.innerHTML = "<p>Unable to load machines at this time.</p>";
    }
}

// Cargar las máquinas al inicio
loadMachines();

// ===== Contrast / yellow mode toggle =====
const contrastToggle = document.getElementById('contrast-toggle');
const contrastState = localStorage.getItem('slg_contrast') === 'on';
setContrast(contrastState);

contrastToggle.addEventListener('click', () => {
    const state = localStorage.getItem('slg_contrast') !== 'on';
    setContrast(state);
});

function setContrast(on) {
    if (on) {
        // High contrast mode
        document.documentElement.style.setProperty('--brand-yellow', '#ffea00');
        document.documentElement.style.setProperty('--brand-black', '#000000');
        document.body.classList.add("alt-contrast");
    } else {
        // Normal mode
        document.documentElement.style.setProperty('--brand-yellow', '#FFD447');
        document.documentElement.style.setProperty('--brand-black', '#0b0b0b');
        document.body.classList.remove("alt-contrast");
    }

    contrastToggle.setAttribute('aria-pressed', String(on));
    localStorage.setItem('slg_contrast', on ? 'on' : 'off');
}

// ===== Update year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();
