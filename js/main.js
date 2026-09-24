/* ============================================================
   CSRA PRECISION IMAGING — main.js
   ============================================================ */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var burger = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      // dropdown toggles (Services, Client Login) open their submenu instead of closing the menu
      if (a.classList.contains('ddtoggle')) return;
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        var a = other.nextElementSibling;
        if (a) a.style.maxHeight = null;
      });
      if (!open) {
        q.setAttribute('aria-expanded', 'true');
        var ans = q.nextElementSibling;
        if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* ---- Gallery filter ---- */
  var filters = document.querySelectorAll('.filter');
  var items = document.querySelectorAll('.gallery .item');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.classList.remove('active'); });
      f.classList.add('active');
      var cat = f.getAttribute('data-filter');
      items.forEach(function (item) {
        var show = cat === 'all' || item.getAttribute('data-cat') === cat;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---- Lightbox ---- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    document.querySelectorAll('.gallery .item').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (!img) return;
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = img.alt || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-close')) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLb();
    });
  }

  /* ---- Quote form: friendly success message (works with Netlify Forms) ---- */
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
      // Netlify intercepts the POST and shows its own thank-you page.
      // If you switch to Formspree, it will redirect to your _next URL instead.
    });
  }


  /* ---- Mobile: Services dropdown toggle ---- */
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dd) {
    var toggle = dd.querySelector('.ddtoggle');
    var menu = dd.querySelector('.nav-dropdown-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function(e) {
        // On mobile (small screen or hamburger open), toggle dropdown
        if (window.innerWidth < 768 || (links && links.classList.contains('open'))) {
          e.preventDefault();
          var isOpen = menu.style.opacity === '1';
          menu.style.opacity = isOpen ? '0' : '1';
          menu.style.pointerEvents = isOpen ? 'none' : 'all';
          menu.style.transform = isOpen ? 'translateY(6px)' : 'translateY(0)';
          menu.style.position = 'relative';
          menu.style.top = 'auto';
        }
      });
    }
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
