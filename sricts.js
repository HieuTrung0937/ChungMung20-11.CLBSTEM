window.addEventListener("load", () => {
  const card = document.getElementById("greeting-card");
  setTimeout(() => {
    card.classList.add("show");
  }, 500); // chờ load xong
});
const photos = document.querySelectorAll(".photo");

function checkPhotos() {
  photos.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      img.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkPhotos);
checkPhotos();
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

photos.forEach((photo) => {
  const openLightbox = () => {
    lightboxImg.src = photo.src;
    lightbox.style.display = "flex";
  };
  photo.addEventListener("click", openLightbox);
  photo.addEventListener("touchstart", openLightbox); // hỗ trợ điện thoại
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
