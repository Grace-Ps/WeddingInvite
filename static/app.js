const opening = document.querySelector('#opening');
const invitation = document.querySelector('#invitation');
const openButton = document.querySelector('#open-button');
const audio = document.querySelector('#background-audio');
const musicToggle = document.querySelector('#music-toggle');
const musicLabel = document.querySelector('#music-label');

openButton.addEventListener('click', () => {
  opening.classList.add('is-open');
  invitation.classList.add('is-visible');
  invitation.setAttribute('aria-hidden', 'false');
  openButton.setAttribute('aria-expanded', 'true');
  setTimeout(() => document.querySelector('.hero .reveal')?.classList.add('visible'), 700);
  createPetals();
});

musicToggle.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicToggle.classList.add('is-playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'Playing';
    } catch {
      musicLabel.textContent = 'Open music';
      window.open('https://www.youtube.com/watch?v=IWOPRFRNj3ga', '_blank', 'noopener');
    }
  } else {
    audio.pause();
    musicToggle.classList.remove('is-playing');
    musicToggle.setAttribute('aria-pressed', 'false');
    musicLabel.textContent = 'Music';
  }
});

document.querySelectorAll('img[data-fallback]').forEach((image) => {
  image.addEventListener('error', () => {
    if (image.src !== image.dataset.fallback) image.src = image.dataset.fallback;
  }, { once: true });
});

const targetDate = new Date(window.WEDDING_DATE).getTime();
function updateCountdown() {
  const distance = Math.max(0, targetDate - Date.now());
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor(distance / 3600000) % 24,
    minutes: Math.floor(distance / 60000) % 60,
    seconds: Math.floor(distance / 1000) % 60,
  };
  Object.entries(values).forEach(([key, value]) => {
    const element = document.querySelector(`#${key}`);
    element.textContent = key === 'days' ? String(value).padStart(3, '0') : String(value).padStart(2, '0');
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function createPetals() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 24; index += 1) {
    const petal = document.createElement('i');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 1.5}s`;
    petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 150}px`);
    fragment.appendChild(petal);
  }
  document.body.appendChild(fragment);
  setTimeout(() => document.querySelectorAll('.petal').forEach((petal) => petal.remove()), 5200);
}
