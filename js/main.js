// ============ NAVBAR SCROLL ============
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ============ MOBILE MENU ============
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  hamburger?.classList.remove('active');
  navMenu.classList.remove('open');
}));

// ============ SCROLL REVEAL ============
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ============ SKILL CLOUD FILTER ============
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPills = document.querySelectorAll('.skill-pill');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;
    skillPills.forEach(pill => {
      if (category === 'all' || pill.dataset.category === category) {
        pill.classList.add('show');
      } else {
        pill.classList.remove('show');
      }
    });
  });
});

// ============ TYPING EFFECT ============
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const phrases = [
    'Cloud Infrastructure Specialist',
    'Data Analytics Enthusiast',
    'Product-Minded Engineer'
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;
  function typeEffect() {
    const current = phrases[phraseIdx];
    typingEl.textContent = current.substring(0, charIdx);
    if (!isDeleting) {
      charIdx++;
      if (charIdx > current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }
  setTimeout(typeEffect, 800);
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 2500);
});

// ============ SMOOTH SCROLL FOR CTA BUTTONS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
