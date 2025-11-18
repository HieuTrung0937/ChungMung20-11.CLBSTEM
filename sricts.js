const btn = document.getElementById("play-music-btn");
const card = document.getElementById("greeting-card");
const photos = document.querySelectorAll(".photo");
const audio = document.getElementById("bg-music");

function fadeInAudio(audio, duration = 3000) {
  audio.volume = 0;
  audio.play();
  const step = 0.05;
  const intervalTime = duration / (1 / step);
  const fade = setInterval(() => {
    if (audio.volume < 1) audio.volume = Math.min(audio.volume + step, 1);
    else clearInterval(fade);
  }, intervalTime);
}

btn.addEventListener("click", () => {
  // Hiện thiệp
  card.classList.add("show");

  // Hiện từng ảnh
  photos.forEach((img, idx) => {
    setTimeout(() => img.classList.add("show"), idx * 300);
  });

  // Bật nhạc
  fadeInAudio(audio);

  // Nút vẫn hiện
});
