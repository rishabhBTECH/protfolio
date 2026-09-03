// ── NAV ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('solid', window.scrollY > 50));

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => io.observe(s));

// ── MOBILE MENU ──
const burger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── SCROLL FADE-UP ──
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── CONTACT FORM ──
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('form-submit');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const orig = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent ✓';
    submitBtn.style.background = '#4caf7d';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = orig;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      form.reset();
    }, 3500);
  });
}
