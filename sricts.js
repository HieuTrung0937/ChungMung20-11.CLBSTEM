document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});
const btn = document.getElementById("play-music-btn");
const card = document.getElementById("greeting-card");
const photoSection = document.getElementById("photo-section");
const photos = document.querySelectorAll(".photo");
const audio = document.getElementById("bg-music");
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
document.body.appendChild(lightbox);

const lightboxImg = document.createElement("img");
lightbox.appendChild(lightboxImg);

photos.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

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
  // Ẩn nút
  btn.style.opacity = "0";
  btn.style.pointerEvents = "none";
  setTimeout(() => (btn.style.display = "none"), 500);

  // Hiện thiệp (bật animation slideUp)
  card.classList.remove("hidden");
  card.classList.remove("start-hidden");

  // Hiện khung ảnh
  photoSection.classList.remove("hidden");

  // Hiện từng ảnh với hiệu ứng
  photos.forEach((img, idx) => {
    setTimeout(() => {
      img.classList.remove("hidden");
      img.style.transform = "translateY(0)";
      img.style.opacity = "1";
    }, idx * 300);
  });

  // Sticker rơi vô hạn
  const stickers = document.querySelectorAll(".sticker");
  stickers.forEach((sticker) => {
    // Hàm bật animation
    const startAnimation = () => {
      sticker.style.opacity = "1";
      sticker.style.animation = `fallDown ${sticker.dataset.duration}s linear forwards`;
    };

    // Bật animation lần đầu với delay
    setTimeout(startAnimation, (sticker.dataset.delay || 0) * 1000);

    // Khi animation kết thúc, reset và bật lại
    sticker.addEventListener("animationend", () => {
      sticker.style.opacity = "0";
      sticker.style.animation = "none";
      setTimeout(startAnimation, 200); // delay nhỏ giữa các lần
    });
  });

  // Nhạc
  fadeInAudio(audio);
});
const canvas = document.getElementById("fw-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2; // tốc độ ngang
    this.vy = Math.random() * -3 - 1; // đi lên
    this.alpha = 1;
    this.size = Math.random() * 3 + 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function createParticles() {
  for (let i = 0; i < 5; i++) {
    // ít, nhẹ nhàng
    particles.push(new Particle(Math.random() * canvas.width, canvas.height));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

// Khi bấm nút
btn.addEventListener("click", () => {
  // ...hiển thị card, ảnh, nhạc...

  // Tạo pháo bông nhẹ
  const particleInterval = setInterval(createParticles, 200);
  setTimeout(() => clearInterval(particleInterval), 3600); // chạy 3 giây thôi
});
