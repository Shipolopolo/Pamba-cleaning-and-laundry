// Injects the shared site footer into <footer id="site-footer-include">
(function () {
  const footerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="brand">
          <span class="brand-mark">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 10c0-1.5 1-3 3-3h10c2 0 3 1.5 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7Z" stroke="#fff" stroke-width="1.6"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" stroke="#fff" stroke-width="1.6"/><circle cx="12" cy="14" r="2.4" stroke="#fff" stroke-width="1.6"/></svg>
          </span>
          <span class="brand-text" style="color:#fff;">Pamba<small style="color:rgba(255,255,255,.5);">Laundry &amp; Cleaning</small></span>
        </a>
        <p>Professional laundry and cleaning services on Kenyatta Road, Juja — wash &amp; fold, carpet, sofa and mattress cleaning with pickup and delivery.</p>
        <div class="footer-social">
          <a href="#" data-wa="Hi Pamba Laundry, I'd like to get in touch." aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z"/></svg></a>
          <a href="mailto:pambalaundry@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none"><path d="M3 6h18v12H3V6Zm0 0 9 7 9-7" stroke="#fff" stroke-width="1.5"/></svg></a>
          <a href="tel:+254715774092" aria-label="Call"><svg viewBox="0 0 24 24" fill="none"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 2 6a2 2 0 0 1 2-2Z" stroke="#fff" stroke-width="1.5"/></svg></a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="book.html">Book Online</a></li>
          <li><a href="reviews.html">Reviews</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="services.html#wash-fold">Wash &amp; Fold</a></li>
          <li><a href="services.html#carpet-cleaning">Carpet Cleaning</a></li>
          <li><a href="services.html#sofa-cleaning">Sofa Cleaning</a></li>
          <li><a href="services.html#mattress-cleaning">Mattress Cleaning</a></li>
          <li><a href="services.html#house-cleaning">House Cleaning</a></li>
        </ul>
      </div>
      <div>
        <h4>Stay Fresh — Newsletter</h4>
        <p>Tips, offers and updates from Pamba, straight to your inbox.</p>
        <form class="newsletter newsletter-form">
          <input type="email" placeholder="Your email address" required aria-label="Email address">
          <button type="submit" class="btn btn-primary btn-sm">Join</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="year"></span> Pamba Laundry &amp; Cleaning. All rights reserved.</span>
      <span>Kenyatta Road, Juja, Kenya · 0715 774 092</span>
    </div>
  </div>`;

  document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('site-footer-include');
    if (target) target.innerHTML = footerHTML;
    // re-run behaviours that depend on footer content
    document.querySelectorAll('[data-wa]').forEach((el) => {
      if (el.getAttribute('href') === '#' || !el.getAttribute('href')) {
        const msg = el.getAttribute('data-wa') || "Hi Pamba Laundry & Cleaning, I'd like to enquire about your services.";
        el.setAttribute('href', `https://wa.me/254715774092?text=${encodeURIComponent(msg)}`);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    });
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const nlForm = document.querySelector('.newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = nlForm.querySelector('button');
        const original = btn.textContent;
        btn.textContent = 'Joined ✓';
        nlForm.querySelector('input').value = '';
        setTimeout(() => (btn.textContent = original), 2500);
      });
    }
  });
})();
