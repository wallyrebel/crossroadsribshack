/* ===================================================
   CROSSROADS RIB SHACK — Main JavaScript
   =================================================== */

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 800);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Menu tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all
    menuTabs.forEach(t => t.classList.remove('active'));
    menuPanels.forEach(p => p.classList.remove('active'));

    // Activate clicked
    tab.classList.add('active');
    const targetPanel = document.getElementById(tab.dataset.tab);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  '.section-header, .about-content, .about-images, .menu-item, .location-card, .review-card, .cta-content, .menu-sauces'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Duplicate marquee content for seamless loop
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
  const content = marqueeContent.innerHTML;
  marqueeContent.innerHTML = content + content;
}

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#8B1A1A';
    }
  });
});

// Dynamic open/closed status
function updateOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, etc.
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  let openTime = 11 * 60; // 11:00 AM
  let closeTime;

  if (day === 0) { // Sunday
    closeTime = 15 * 60; // 3:00 PM
  } else if (day === 5 || day === 6) { // Fri/Sat
    closeTime = 21 * 60 + 30; // 9:30 PM
  } else { // Mon-Thu
    closeTime = 21 * 60; // 9:00 PM
  }

  const isOpen = currentTime >= openTime && currentTime < closeTime;

  // Update any open/closed indicators on the page
  document.querySelectorAll('.hours-row').forEach(row => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const rowDay = row.querySelector('span:first-child').textContent.trim();
    if (rowDay === dayNames[day]) {
      row.style.background = 'rgba(212,69,26,0.08)';
      row.style.borderRadius = '4px';
      row.style.padding = '4px 8px';
      row.style.marginLeft = '-8px';
      row.style.marginRight = '-8px';
      const statusBadge = document.createElement('span');
      statusBadge.textContent = isOpen ? ' (Open Now)' : ' (Closed)';
      statusBadge.style.color = isOpen ? '#4CAF50' : '#8B1A1A';
      statusBadge.style.fontSize = '12px';
      statusBadge.style.fontWeight = '600';
      // Only add once
      if (!row.querySelector('.status-badge')) {
        statusBadge.className = 'status-badge';
        row.querySelector('span:last-child').appendChild(statusBadge);
      }
    }
  });
}

updateOpenStatus();

// Parallax effect on hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSmoke = document.querySelector('.hero-smoke');
  if (heroSmoke && scrolled < window.innerHeight) {
    heroSmoke.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

console.log('🔥 Crossroads Rib Shack — Slow smoked, bone suckin\' good.');
