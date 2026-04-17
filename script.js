// ===== Scroll Progress Bar =====
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = scrollPercent + '%';
});

// ===== Back to Top Button =====
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Hamburger Menu =====
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
  });
}

// ===== Theme Toggle =====
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
};

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// ===== Active Navigation Link =====
const navLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('section, footer');

const updateActiveNav = () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
};

// Close sidebar when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (sidebar) sidebar.classList.remove('active');
  });
});

window.addEventListener('scroll', updateActiveNav);

// ===== Fade In On Scroll Animation =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Apply fade-in animation to cards and sections
document.querySelectorAll('.feature-card, .testimonial-card, .future-card, .portfolio-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

document.querySelectorAll('.feature-grid, .testimonial-grid, .portfolio-grid').forEach(el => {
  observer.observe(el);
});

// ===== Button Ripple Effect =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('mouseenter', function(e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
  });
});

// ===== Smooth Scroll Link Click Handler =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
  // Trigger animations on load
  document.body.style.animation = 'fadeIn 0.6s ease-out';
});

// ===== Interactive Hero Image Tilt Effect =====
const heroImage = document.querySelector('.hero-image');

if (heroImage) {
  heroImage.addEventListener('mousemove', (e) => {
    const rect = heroImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    heroImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
}

// ===== Add CSS for Ripple Animation =====
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .btn {
    perspective: 1000px;
  }
  
  .hero-image {
    transition: transform 0.2s ease-out;
    transform-style: preserve-3d;
  }
`;
document.head.appendChild(style);

// ===== Stagger Animation for Cards =====
const staggerElements = (selector, delayStep = 0.1) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.animation = `scaleUp 0.6s ease-out ${index * delayStep}s both`;
  });
};

// Apply staggered animations on page load
window.addEventListener('load', () => {
  staggerElements('.feature-card', 0.1);
  staggerElements('.portfolio-card', 0.15);
  staggerElements('.testimonial-card', 0.15);
});

// ===== Scroll Performance Optimization =====
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    updateActiveNav();
  });
}, { passive: true });

console.log('✨ Portfolio animations and interactions loaded successfully!');
