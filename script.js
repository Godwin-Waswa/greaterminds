// script.js (deferred)
// Initialize year
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Load lucide icons dynamically (deferred)
  const lucideScript = document.createElement('script');
  lucideScript.src = 'https://unpkg.com/lucide@latest';
  lucideScript.defer = true;
  lucideScript.onload = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };
  document.body.appendChild(lucideScript);

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileToggle?.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('hidden');
  });

  // Service panel toggles
  const learnButtons = document.querySelectorAll('.learn-btn');
  learnButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const currentlyOpen = !panel.hasAttribute('hidden');

      // Close any open panels
      document.querySelectorAll('.detail-panel').forEach(p => {
        if (p !== panel) {
          p.setAttribute('hidden', '');
          // set aria-expanded of corresponding button false
          document.querySelectorAll(`.learn-btn[data-target="${p.id}"]`).forEach(b => b.setAttribute('aria-expanded', 'false'));
        }
      });

      if (currentlyOpen) {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Contact form: graceful UI behavior (Formspree or other backend recommended)
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const resetBtn = document.getElementById('reset-btn');

  if (resetBtn) resetBtn.addEventListener('click', () => form.reset());

  form?.addEventListener('submit', (ev) => {
    // Let the form submit normally to Formspree/back-end by default.
    // We provide client-side feedback when possible.
    feedback.className = 'mt-3';
    feedback.textContent = 'Submitting…';
    feedback.classList.remove('sr-only');

    // If you want AJAX submission instead, replace below with fetch to your endpoint.
    // For now, we let the browser handle the POST to the action attribute.
  });

  // IntersectionObserver to highlight nav links when sections are visible
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const obsOptions = { root: null, rootMargin: '0px', threshold: 0.45 };

  const intersectionCallback = (entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = Array.from(navLinks).find(a => a.getAttribute('href') === `#${id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        link.classList.add('text-primary-blue');
        link.classList.remove('text-gray-600');
      } else {
        link.classList.remove('text-primary-blue');
      }
    });
  };

  const observer = new IntersectionObserver(intersectionCallback, obsOptions);
  sections.forEach(s => observer.observe(s));
});
