// ── Scroll progress bar ──
const bar = document.getElementById('progress-bar');
function updateProgress() {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
}

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateProgress();
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Fade-in on scroll ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Quote form submission ──
document.getElementById('quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  e.target.reset();
  setTimeout(() => success.classList.remove('show'), 6000);
});

// ── File drop label ──
const fileDrop = document.getElementById('fileDrop');
if (fileDrop) {
  const input = fileDrop.querySelector('input[type="file"]');
  input.addEventListener('change', () => {
    const names = Array.from(input.files).map(f => f.name).join(', ');
    fileDrop.querySelector('span').textContent = names || '📎 Drag & drop files here, or browse';
  });
  fileDrop.addEventListener('dragover', e => { e.preventDefault(); fileDrop.style.borderColor = 'var(--orange)'; });
  fileDrop.addEventListener('dragleave', ()  => { fileDrop.style.borderColor = ''; });
  fileDrop.addEventListener('drop', e => {
    e.preventDefault(); fileDrop.style.borderColor = '';
    const names = Array.from(e.dataTransfer.files).map(f => f.name).join(', ');
    fileDrop.querySelector('span').textContent = names;
  });
}

// ── Back to top & floating CTA ──
const backToTop = document.getElementById('back-to-top');
const floatCta  = document.getElementById('float-cta');
window.addEventListener('scroll', () => {
  const show = window.scrollY > 400;
  backToTop.classList.toggle('show', show);
  floatCta.classList.toggle('show', show);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Cookie bar ──
const cookieBar = document.getElementById('cookie-bar');
if (!localStorage.getItem('cookieChoice')) {
  setTimeout(() => cookieBar.classList.add('show'), 1500);
}
document.getElementById('cookie-accept').addEventListener('click', () => {
  localStorage.setItem('cookieChoice', 'accepted');
  cookieBar.classList.remove('show');
});
document.getElementById('cookie-decline').addEventListener('click', () => {
  localStorage.setItem('cookieChoice', 'declined');
  cookieBar.classList.remove('show');
});

// ── Animated counters ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const fmt    = el.dataset.format === 'comma';
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    const display = fmt
      ? Math.floor(current).toLocaleString()
      : Math.floor(current);
    el.textContent = display + suffix;
  }, step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ── Product filter tabs ──
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 130;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    link.style.color = (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight)
      ? 'var(--orange)' : '';
  });
});
