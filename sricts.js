window.addEventListener("load", () => {
  const card = document.getElementById("greeting-card");
  setTimeout(() => {
    card.classList.add("show");
  }, 500); // chờ load xong
});
