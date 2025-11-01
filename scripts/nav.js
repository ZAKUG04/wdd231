const mainnav = document.querySelector(".navigation");
const menuButton = document.querySelector("#menu");

menuButton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  menuButton.classList.toggle("open");
});
