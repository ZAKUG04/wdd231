// Fetch member data
async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

// Display members in grid or list
function displayMembers(members) {
  const container = document.getElementById("memberContainer");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>📞 ${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

// View toggle
const gridButton = document.getElementById("gridView");
const listButton = document.getElementById("listView");
const container = document.getElementById("memberContainer");

gridButton.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});

// Hamburger menu
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Footer dynamic info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Load members
getMembers();
