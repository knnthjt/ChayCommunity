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

// ===== INTERACTIVE CARD SPOTLIGHT & MICRO-INTERACTIONS =====
function setupCardSpotlights() {
  const cards = document.querySelectorAll('.social-card, .interest-card, .about-card, .quote-card, .follow-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

setupCardSpotlights();

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

// ===== PASTEL DARK / LIGHT THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleIcon = document.getElementById('themeToggleIcon');
const themeToggleText = document.getElementById('themeToggleText');
const themeMetaTag = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, animate = false) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);

  if (themeToggleIcon && themeToggleText) {
    themeToggleIcon.textContent = isDark ? '☀️' : '🌙';
    themeToggleText.textContent = isDark ? 'Pastel Day' : 'Cozy Dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to Pastel Day mode' : 'Switch to Cozy Dark mode');
  }

  if (themeMetaTag) {
    themeMetaTag.setAttribute('content', isDark ? '#121526' : '#d6e6f5');
  }

  if (animate && themeToggle) {
    const rect = themeToggle.getBoundingClientRect();
    const sparkles = isDark ? ['✨', '⭐', '🌙', '💜', '💫'] : ['🌸', '💖', '☀️', '🧋', '🤍'];
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.classList.add('cursor-heart');
        particle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        particle.style.left = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60 + 'px';
        particle.style.top = rect.top + rect.height / 2 + (Math.random() - 0.5) * 40 + 'px';
        particle.style.fontSize = (14 + Math.random() * 8) + 'px';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
      }, i * 50);
    }
  }
}

// Initialize theme from storage or system preferences
const savedTheme = localStorage.getItem('chuchay_theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
applyTheme(initialTheme, false);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    localStorage.setItem('chuchay_theme', newTheme);
    applyTheme(newTheme, true);
  });
}

// ===== SMOOTH SCROLL & BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (backToTopBtn) {
    if (scrolled > 260) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Cute celebratory burst on smooth scroll to top
    const rect = backToTopBtn.getBoundingClientRect();
    const icons = ['🌸', '✨', '💙', '🧋', '💫'];
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.classList.add('cursor-heart');
        heart.textContent = icons[i % icons.length];
        heart.style.left = rect.left + rect.width / 2 + (Math.random() - 0.5) * 40 + 'px';
        heart.style.top = rect.top + rect.height / 2 + (Math.random() - 0.5) * 40 + 'px';
        heart.style.fontSize = '20px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
      }, i * 60);
    }
  });
}

// ===== FLOATING LO-FI MUSIC PLAYER WIDGET =====
(function initLofiPlayer() {
  const lofiPlayer = document.getElementById('lofiPlayer');
  if (!lofiPlayer) return;

  const lofiExpanded = document.getElementById('lofiExpanded');
  const compactTrackName = document.getElementById('compactTrackName');
  const compactPlayBtn = document.getElementById('compactPlayBtn');
  const compactPlayIcon = document.getElementById('compactPlayIcon');
  const expandPlayerBtn = document.getElementById('expandPlayerBtn');
  const expandIcon = document.getElementById('expandIcon');
  const closeExpandedBtn = document.getElementById('closeExpandedBtn');
  const lofiDisc = document.getElementById('lofiDisc');
  const lofiMetaToggle = document.getElementById('lofiMetaToggle');
  const lofiStatusText = document.getElementById('lofiStatusText');
  const expandedTrackTitle = document.getElementById('expandedTrackTitle');
  const expandedTrackSub = document.getElementById('expandedTrackSub');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const mainPlayBtn = document.getElementById('mainPlayBtn');
  const mainPlayIcon = document.getElementById('mainPlayIcon');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const volMuteBtn = document.getElementById('volMuteBtn');
  const volIcon = document.getElementById('volIcon');
  const lofiVolSlider = document.getElementById('lofiVolSlider');
  const volValText = document.getElementById('volValText');
  const lofiAudio = document.getElementById('lofiAudio');

  const lofiStations = [
    {
      title: 'Chillhop Cozy Radio',
      sub: 'Live 24/7 Chill Beats 🧋',
      src: 'https://streams.fluxfm.de/Chillhop/mp3-128/'
    },
    {
      title: 'Pastel Dreams Lofi',
      sub: 'Relax & Play Obby 🌸',
      src: 'https://icecast.radiofrance.fr/fip-lofi.mp3'
    },
    {
      title: 'Cozy Rain & Rhodes',
      sub: 'Procedural Chill Beats 🎧',
      src: 'procedural'
    }
  ];

  let currentStationIndex = 0;
  let isPlaying = false;
  let currentVolume = 0.7;
  let previousVolume = 0.7;
  let isMuted = false;

  // Web Audio Procedural Fallback Engine
  let audioCtx = null;
  let synthMasterGain = null;
  let isSynthPlaying = false;
  let synthInterval = null;
  let step = 0;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      synthMasterGain = audioCtx.createGain();
      synthMasterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume * 0.4, audioCtx.currentTime);
      synthMasterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthChord(freqs, duration) {
    if (!audioCtx || !synthMasterGain || !isSynthPlaying) return;
    const now = audioCtx.currentTime;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, now);
    filter.connect(synthMasterGain);

    freqs.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // Gentle detune for vinyl flutter
      osc.detune.setValueAtTime((Math.random() - 0.5) * 12, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  function playLoFiBeat(type) {
    if (!audioCtx || !synthMasterGain || !isSynthPlaying) return;
    const now = audioCtx.currentTime;

    if (type === 'kick') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(synthMasterGain);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'snare') {
      // Soft filtered noise/snare
      const bufferSize = audioCtx.sampleRate * 0.12;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.08;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(synthMasterGain);
      noise.start(now);
    }
  }

  function startProceduralEngine() {
    initAudioContext();
    isSynthPlaying = true;
    if (synthMasterGain) {
      synthMasterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume * 0.35, audioCtx.currentTime);
    }

    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [164.81, 196.00, 246.94, 293.66], // Em7
      [146.83, 174.61, 220.00, 261.63], // Dm7
      [130.81, 164.81, 196.00, 246.94]  // Cmaj7
    ];

    step = 0;
    playSynthChord(chords[0], 2.8);
    playLoFiBeat('kick');

    clearInterval(synthInterval);
    synthInterval = setInterval(() => {
      step++;
      const beat = step % 4;
      const chordIdx = Math.floor((step % 16) / 4);

      if (beat === 0) {
        playSynthChord(chords[chordIdx], 2.8);
        playLoFiBeat('kick');
      } else if (beat === 2) {
        playLoFiBeat('snare');
      } else if (beat === 1 && Math.random() > 0.5) {
        playLoFiBeat('kick');
      }
    }, 700);
  }

  function stopProceduralEngine() {
    isSynthPlaying = false;
    clearInterval(synthInterval);
  }

  function updateStationUI() {
    const station = lofiStations[currentStationIndex];
    if (compactTrackName) compactTrackName.textContent = station.title;
    if (expandedTrackTitle) expandedTrackTitle.textContent = station.title;
    if (expandedTrackSub) expandedTrackSub.textContent = station.sub;
  }

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      lofiPlayer.classList.add('playing');
      if (compactPlayIcon) compactPlayIcon.textContent = '❚❚';
      if (mainPlayIcon) mainPlayIcon.textContent = '❚❚';
      if (lofiStatusText) lofiStatusText.textContent = 'Playing';
    } else {
      lofiPlayer.classList.remove('playing');
      if (compactPlayIcon) compactPlayIcon.textContent = '▶';
      if (mainPlayIcon) mainPlayIcon.textContent = '▶';
      if (lofiStatusText) lofiStatusText.textContent = 'Paused';
    }
  }

  function playCurrentStation() {
    const station = lofiStations[currentStationIndex];
    updateStationUI();

    if (station.src === 'procedural') {
      lofiAudio.pause();
      startProceduralEngine();
      setPlayingState(true);
    } else {
      stopProceduralEngine();
      lofiAudio.src = station.src;
      lofiAudio.volume = isMuted ? 0 : currentVolume;
      const playPromise = lofiAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingState(true);
          })
          .catch(() => {
            // Stream blocked or failed, fallback to soothing procedural synthesizer
            console.log('Stream unavailable, switching to procedural lo-fi generator');
            startProceduralEngine();
            setPlayingState(true);
            if (lofiStatusText) lofiStatusText.textContent = 'Offline Mode';
          });
      }
    }
  }

  function pauseMusic() {
    lofiAudio.pause();
    stopProceduralEngine();
    setPlayingState(false);
  }

  function togglePlay() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playCurrentStation();
    }
  }

  function switchStation(direction) {
    currentStationIndex = (currentStationIndex + direction + lofiStations.length) % lofiStations.length;
    updateStationUI();
    if (isPlaying) {
      playCurrentStation();
    }
  }

  function updateVolume(val) {
    currentVolume = Math.max(0, Math.min(1, val));
    isMuted = currentVolume === 0;

    if (lofiAudio) {
      lofiAudio.volume = currentVolume;
    }
    if (synthMasterGain && audioCtx) {
      synthMasterGain.gain.setValueAtTime(currentVolume * 0.35, audioCtx.currentTime);
    }

    const pct = Math.round(currentVolume * 100);
    if (volValText) volValText.textContent = `${pct}%`;
    if (lofiVolSlider) lofiVolSlider.value = pct;

    // Update speaker icon
    if (volIcon) {
      if (pct === 0) volIcon.textContent = '🔇';
      else if (pct < 45) volIcon.textContent = '🔈';
      else volIcon.textContent = '🔊';
    }
  }

  function toggleMute() {
    if (isMuted) {
      isMuted = false;
      updateVolume(previousVolume > 0 ? previousVolume : 0.7);
    } else {
      previousVolume = currentVolume;
      isMuted = true;
      updateVolume(0);
    }
  }

  // Toggle expanded card
  function toggleExpanded(forceState) {
    const shouldExpand = forceState !== undefined ? forceState : !lofiPlayer.classList.contains('expanded');
    lofiPlayer.classList.toggle('expanded', shouldExpand);
    if (lofiExpanded) {
      lofiExpanded.setAttribute('aria-hidden', String(!shouldExpand));
    }
    if (expandIcon) {
      expandIcon.textContent = shouldExpand ? '▼' : '▲';
    }
  }

  // Event Listeners
  if (compactPlayBtn) compactPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
  if (mainPlayBtn) mainPlayBtn.addEventListener('click', togglePlay);

  if (expandPlayerBtn) expandPlayerBtn.addEventListener('click', () => toggleExpanded());
  if (closeExpandedBtn) closeExpandedBtn.addEventListener('click', () => toggleExpanded(false));
  if (lofiDisc) lofiDisc.addEventListener('click', () => toggleExpanded());
  if (lofiMetaToggle) lofiMetaToggle.addEventListener('click', () => toggleExpanded());

  if (prevTrackBtn) prevTrackBtn.addEventListener('click', () => switchStation(-1));
  if (nextTrackBtn) nextTrackBtn.addEventListener('click', () => switchStation(1));

  if (lofiVolSlider) {
    lofiVolSlider.addEventListener('input', (e) => {
      updateVolume(parseFloat(e.target.value) / 100);
    });
  }

  if (volMuteBtn) volMuteBtn.addEventListener('click', toggleMute);

  // Audio element events
  lofiAudio.addEventListener('playing', () => setPlayingState(true));
  lofiAudio.addEventListener('pause', () => { if (!isSynthPlaying) setPlayingState(false); });
  lofiAudio.addEventListener('error', () => {
    if (isPlaying) {
      console.log('Audio stream error, switching to procedural lo-fi generator');
      startProceduralEngine();
      setPlayingState(true);
    }
  });

  // Initialize
  updateStationUI();
  updateVolume(0.7);
})();


