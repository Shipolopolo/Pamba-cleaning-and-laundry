// Pamba Laundry & Cleaning — shared site behaviour
(function () {
  const WHATSAPP_NUMBER = '254715774092'; // 0715 774 092 in international format

  // Run each init in isolation: if one throws (missing element, a browser
  // quirk, whatever), the rest still run. Content visibility never depends
  // on any of this succeeding — see initReveal() and the CSS it drives.
  function safe(fn, name) {
    try {
      fn();
    } catch (err) {
      console.error(`[Pamba] ${name} failed:`, err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    safe(initLoader, 'initLoader');
    safe(initNav, 'initNav');
    safe(initTheme, 'initTheme');
    safe(initReveal, 'initReveal');
    safe(initBackToTop, 'initBackToTop');
    safe(initWhatsAppLinks, 'initWhatsAppLinks');
    safe(initFAQ, 'initFAQ');
    safe(initBookingForm, 'initBookingForm');
    safe(initContactForm, 'initContactForm');
    safe(initQuoteCalculator, 'initQuoteCalculator');
    safe(initBeforeAfter, 'initBeforeAfter');
    safe(initNewsletter, 'initNewsletter');
    safe(markActiveNav, 'markActiveNav');
    safe(initYear, 'initYear');
  });

  function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hide'), 250);
    });
    // fallback in case load already fired
    setTimeout(() => loader.classList.add('hide'), 1800);
  }

  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      })
    );
  }

  function initTheme() {
    const btn = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    // In-memory only (no persistent storage) — defaults to light each visit.
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });
  }

  function initReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-stagger');
    if (targets.length === 0) return;

    // Content is fully visible by default in CSS (no .anim-ready on <html>).
    // Only turn the fade/slide-in animation ON once we're certain we can
    // finish it — i.e. IntersectionObserver exists and every target will
    // eventually get its .in class.
    if (!('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('anim-ready');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((t) => io.observe(t));

    // Hard safety net: if for any reason an element never crosses the
    // observer threshold (e.g. it's already off-screen below a very short
    // page, or a browser quirk), force it visible after 2.5s so nothing is
    // ever permanently stuck at opacity 0.
    setTimeout(() => {
      targets.forEach((t) => t.classList.add('in'));
    }, 2500);
  }

  function initBackToTop() {
    const btn = document.querySelector('.fab-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 480);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initWhatsAppLinks() {
    document.querySelectorAll('[data-wa]').forEach((el) => {
      const msg = el.getAttribute('data-wa') || "Hi Pamba Laundry & Cleaning, I'd like to enquire about your services.";
      el.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.closest('.faq-list')?.querySelectorAll('.faq-item.open').forEach((other) => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-a').style.maxHeight = null;
          }
        });
        item.classList.toggle('open', !isOpen);
        a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      });
    });
  }

  function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    const success = document.getElementById('booking-success');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      form.style.display = 'none';
      success.classList.add('show');
      const summary = document.getElementById('booking-summary');
      if (summary) {
        summary.textContent = `${data.service || 'Service'} · ${data.date || ''} ${data.time || ''} · ${data.pickup === 'yes' ? 'Pickup requested' : 'Drop-off'}`;
      }
      const waBtn = document.getElementById('booking-wa-btn');
      if (waBtn) {
        const msg = `New booking request:\nService: ${data.service}\nPickup required: ${data.pickup}\nDate: ${data.date}\nTime: ${data.time}\nName: ${data.name}\nPhone: ${data.phone}\nLocation: ${data.location}\nNotes: ${data.notes || 'None'}`;
        waBtn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
      }
    });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const success = document.getElementById('contact-success');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.style.display = 'none';
      success.classList.add('show');
    });
  }

  function initQuoteCalculator() {
    const serviceSel = document.getElementById('quote-service');
    const qtyInput = document.getElementById('quote-qty');
    const totalEl = document.getElementById('quote-total');
    if (!serviceSel || !totalEl) return;

    // Prices match Pamba's official WhatsApp catalogue.
    const rates = {
      laundry: 100, // Wash, Dry & Fold — per kg
      carpet: 1000, // Carpet cleaning — per carpet
      sofa: 500, // Sofa Set Cleaning — per set
    };

    function render() {
      const rate = rates[serviceSel.value] || 0;
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      const total = rate * qty;
      totalEl.textContent = `KES ${total.toLocaleString('en-KE')}`;
    }
    [serviceSel, qtyInput].forEach((el) => el.addEventListener('input', render));
    render();
  }

  function initBeforeAfter() {
    const slider = document.querySelector('.ba-slider');
    if (!slider) return;
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    let dragging = false;

    function setPos(clientX) {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.min(96, Math.max(4, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
    }
    handle.addEventListener('pointerdown', () => (dragging = true));
    window.addEventListener('pointerup', () => (dragging = false));
    window.addEventListener('pointermove', (e) => {
      if (dragging) setPos(e.clientX);
    });
    slider.addEventListener('click', (e) => setPos(e.clientX));
  }

  function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      form.querySelector('input').value = '';
      setTimeout(() => (btn.textContent = original), 2500);
    });
  }

  function markActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();
