// toogle sidebar
document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    this.parentElement.classList.toggle("active");
  });
});
// end
