/* ================================================================
   ABU SUFYAN — PORTFOLIO SCRIPT
   ================================================================ */

/* ============================================================
   1. THEME TOGGLE (dark / light)
   Also swaps the logo image so it stays visible on both
   backgrounds (black logo on light bg, white logo on dark bg).
   No localStorage is used — theme resets each time the page loads.
   ============================================================ */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const logoImgs = document.querySelectorAll('.logo-img');

function setThemeIcon(theme){
  themeToggle.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}
function setLogoForTheme(theme){
  logoImgs.forEach(img => {
    img.src = theme === 'dark' ? 'assets/logo-white.png' : 'assets/logo-black.png';
  });
}
setThemeIcon(root.getAttribute('data-theme'));
setLogoForTheme(root.getAttribute('data-theme'));

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  setThemeIcon(next);
  setLogoForTheme(next);
});

/* ============================================================
   2. MOBILE MENU TOGGLE
   ============================================================ */
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  burgerBtn.innerHTML = mobileMenu.classList.contains('open')
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

/* ============================================================
   3. ACTIVE NAV TAB HIGHLIGHT ON SCROLL
   ============================================================ */
const navTabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('section[id]');

function highlightNav(){
  let current = '';
  const scrollPos = window.scrollY + 140;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) current = sec.getAttribute('id');
  });
  navTabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', highlightNav);

/* ============================================================
   4. TYPING ANIMATION IN THE HERO TERMINAL
   ============================================================ */
const typedOutput = document.getElementById('typedOutput');
const linesToType = [
  "Abu Sufyan — BS Student & Web Developer",
  "Building clean, responsive interfaces.",
  "Currently learning: JavaScript & UI Design.",
  "Open to internships and freelance work."
];
let lineIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const currentLine = linesToType[lineIndex];

  if (!deleting){
    typedOutput.textContent = currentLine.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentLine.length){
      deleting = true;
      setTimeout(typeLoop, 1600); // pause at full line
      return;
    }
  } else {
    typedOutput.textContent = currentLine.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0){
      deleting = false;
      lineIndex = (lineIndex + 1) % linesToType.length;
    }
  }
  setTimeout(typeLoop, deleting ? 30 : 55);
}
typeLoop();

/* ============================================================
   5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   6. ANIMATED SKILL PROGRESS BARS (fill once visible)
   ============================================================ */
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const bar = entry.target;
      bar.style.width = bar.getAttribute('data-width') + '%';
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });
bars.forEach(bar => barObserver.observe(bar));

/* ============================================================
   7. PROJECT FILTER BUTTONS
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-cat') === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

/* ============================================================
   8. CONTACT FORM (front-end only demo)
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = '> Message ready to send — connect a backend (e.g. EmailJS/Formspree) to deliver it.';
  contactForm.reset();
});

/* ============================================================
   9. BACK-TO-TOP BUTTON
   ============================================================ */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
