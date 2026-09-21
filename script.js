// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loadingScreen');
    loader.classList.add('hidden');
    // Trigger hero animations after load
    setTimeout(() => {
      document.querySelectorAll('.animate-in').forEach(el => {
        observeElement(el);
      });
    }, 200);
  }, 1500);
});

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
function observeElement(el) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  observer.observe(el);
}

// ===== FLOATING PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  const emojis = ['🧋', '💙', '⭐', '🌸', '✨', '💜', '🎮', '🤍', '💫', '🌱', '♡', '☁️'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.fontSize = (14 + Math.random() * 16) + 'px';
    particle.style.animationDuration = (15 + Math.random() * 25) + 's';
    particle.style.animationDelay = (Math.random() * 20) + 's';
    particle.style.opacity = 0.15 + Math.random() * 0.3;
    container.appendChild(particle);
  }
}

createParticles();

// ===== SPARKLE EFFECTS ON HERO =====
function createSparkles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const rect = hero.getBoundingClientRect();
    sparkle.style.left = Math.random() * rect.width + 'px';
    sparkle.style.top = Math.random() * rect.height + 'px';
    hero.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  }, 400);
}

createSparkles();

// ===== CURSOR HEART TRAIL =====
let lastTrail = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTrail < 120) return; // throttle
  lastTrail = now;

  const hearts = ['♡', '✧', '·', '✦', '♥'];
  const heart = document.createElement('div');
  heart.classList.add('cursor-heart');
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  heart.style.color = `hsl(${200 + Math.random() * 80}, 70%, 75%)`;
  heart.style.fontSize = (10 + Math.random() * 10) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
});

// ===== INTERACTIVE AVATAR CLICK =====
const avatar = document.getElementById('heroAvatar');
if (avatar) {
  avatar.addEventListener('click', () => {
    avatar.style.transition = 'transform 0.3s ease';
    avatar.style.transform = 'scale(1.15) rotate(5deg)';

    // Create burst of hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const burst = document.createElement('div');
        burst.classList.add('cursor-heart');
        const rect = avatar.getBoundingClientRect();
        burst.textContent = ['💙', '💜', '🤍', '💕', '✨'][Math.floor(Math.random() * 5)];
        burst.style.left = rect.left + rect.width / 2 + (Math.random() - 0.5) * 80 + 'px';
        burst.style.top = rect.top + rect.height / 2 + (Math.random() - 0.5) * 80 + 'px';
        burst.style.fontSize = '20px';
        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 1000);
      }, i * 80);
    }

    setTimeout(() => {
      avatar.style.transform = '';
    }, 400);
  });
}

// ===== SOCIAL CARD HOVER SOUND EFFECT (visual) =====
document.querySelectorAll('.social-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
});

// ===== INTEREST CARDS TILT EFFECT =====
document.querySelectorAll('.interest-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== MOTTO BANNER TYPING EFFECT =====
const mottoBanner = document.getElementById('mottoBanner');
if (mottoBanner) {
  const mottos = [
    '✨ Small Steps, Big Dreams ✨',
    '🧋 Boba lover & gamer girl 🎮',
    '💙 Play · Chill · Be Happy 💙',
    '🌱 Growing one garden at a time 🌱',
    '✨ Same girl... Different game ✨'
  ];

  let mottoIndex = 0;
  setInterval(() => {
    mottoIndex = (mottoIndex + 1) % mottos.length;
    mottoBanner.style.opacity = '0';
    mottoBanner.style.transform = 'translateY(5px)';
    setTimeout(() => {
      mottoBanner.textContent = mottos[mottoIndex];
      mottoBanner.style.opacity = '1';
      mottoBanner.style.transform = 'translateY(0)';
    }, 300);
  }, 4000);

  mottoBanner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// ===== PARALLAX ON SCROLL (subtle) =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-avatar-wrapper');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});

// ===== KONAMI CODE EASTER EGG =====
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      activateRainbow();
    }
  } else {
    konamiIndex = 0;
  }
});

function activateRainbow() {
  document.body.style.transition = 'filter 1s ease';
  document.body.style.filter = 'hue-rotate(0deg)';

  let hue = 0;
  const interval = setInterval(() => {
    hue += 2;
    document.body.style.filter = `hue-rotate(${hue}deg)`;
    if (hue >= 360) {
      clearInterval(interval);
      document.body.style.filter = '';
    }
  }, 20);

  // Burst of emojis
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.classList.add('cursor-heart');
      emoji.textContent = ['🌈', '✨', '💖', '🧋', '🎮', '⭐'][Math.floor(Math.random() * 6)];
      emoji.style.left = Math.random() * window.innerWidth + 'px';
      emoji.style.top = Math.random() * window.innerHeight + 'px';
      emoji.style.fontSize = '30px';
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 1500);
    }, i * 60);
  }
}
