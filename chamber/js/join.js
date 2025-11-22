
window.addEventListener("DOMContentLoaded", () => {
  // TIMESTAMP
  const timestampField = document.querySelector("#timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
  const form = document.querySelector("#joinForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      const firstName = document.querySelector("input[name='first-name']");
      const lastName = document.querySelector("input[name='last-name']");

      if (!firstName.value.trim() || !lastName.value.trim()) {
        alert("Please fill out your first and last name.");
        e.preventDefault();
      }
    });
  }

  // MODALS
  const infoButtons = document.querySelectorAll(".info-btn");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  infoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalID = btn.parentElement.dataset.modal;
      const modal = document.getElementById(modalID);
      if (modal) modal.style.display = "flex";
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  // cerrar modal haciendo click afuera
  modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
});
