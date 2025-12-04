// machines.js (ES Module)

async function loadMachines() {
    try {
        const response = await fetch("data/machine.json");
        const machines = await response.json();

        const container = document.getElementById("machinesGrid");

        machines.forEach(machine => {
            const card = document.createElement("div");
            card.classList.add("machine-card");

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
    }
}

loadMachines();

// Update year in footer
document.getElementById("year").textContent = new Date().getFullYear();
