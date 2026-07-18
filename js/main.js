/* La Conchiglia — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate) + codice-firma: le tre anime
   in stagger + la conchiglia dell'intro che si disegna.
   GSAP registrato SUBITO; reveal once; watchdog 1,5s; orari cross-midnight. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'la-conchiglia',
    whatsapp: { number: '', message: '', ids: [] },
    hours: {
      0: [['11:00', '15:00'], ['18:00', '24:00']],
      1: [['11:00', '15:00'], ['18:00', '24:00']],
      2: [['11:00', '15:00'], ['18:00', '24:00']],
      3: [['11:00', '15:00'], ['18:00', '24:00']],
      4: [['11:00', '15:00'], ['18:00', '24:00']],
      5: [['11:00', '15:00'], ['18:00', '24:00']],
      6: [['11:00', '15:00'], ['18:00', '24:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'nav.anime': 'The three souls', 'nav.porzioni': 'The portions', 'nav.gallery': 'On the table',
      'nav.recensioni': 'Reviews', 'nav.dove': 'Where & when', 'nav.prenota': 'Book',
      'hero.rec': '1,927 reviews',
      'hero.sub': 'A trattoria and pizzeria in <strong>San Siro</strong>, a stone’s throw from the Meazza — from the sea, from the oven, from the grill. Huge portions, open every day until midnight.',
      'hero.cta1': 'Book: +39 02 3946 4148', 'hero.cta2': 'The three souls',
      'tk.1': 'pizza', 'tk.2': 'seafood', 'tk.3': 'grill', 'tk.4': 'open 7/7 until midnight', 'tk.5': 'steps from the Meazza', 'tk.6': 'takeaway & delivery',
      'tk.1b': 'pizza', 'tk.2b': 'seafood', 'tk.3b': 'grill', 'tk.4b': 'open 7/7 until midnight', 'tk.5b': 'steps from the Meazza', 'tk.6b': 'takeaway & delivery',
      'anime.kicker': 'The menu', 'anime.t1': 'Three souls,', 'anime.t2': 'one shell',
      'anime.lead': 'Not just one place: here you eat fish like at the harbour, pizza done right and meat on the grill. Choose the soul of the evening.',
      'a1.t': 'From the sea', 'a1.p': 'Seafood spaghetti allo scoglio, mixed fry, scampi and clams: the catch that reaches the table generous, the old way.',
      'a2.t': 'From the oven', 'a2.p': 'Pizza with a tall crust, baked as it should be: from the margherita to the tastiest white ones. «Great pizzas», they say.',
      'a3.t': 'From the grill', 'a3.p': 'T-bone and rib steak over the coals, with grilled vegetables. Real meat, right cooking, stadium-size portions.',
      'porz.kicker': 'The portions', 'porz.t1': 'You don’t leave here', 'porz.t2': 'hungry',
      'porz.p1': 'The portions are the ones of old: generous, honest, at prices that feel from another decade. This is where San Siro families have always come back, and where fans stop before and after the match.',
      'porz.pull': '«Big smiles and big portions. Prices are insanely low for the quality of food you get.» — Joël, Google review',
      'gal.kicker': 'On the table', 'gal.t1': 'A tour', 'gal.t2': 'through the dishes',
      'rec.kicker': 'What people say', 'rec.t2': 'from 1,927 reviews',
      'rec.r1': '«A genuinely local restaurant: it feels like being in a small, faraway town. Empty before 8pm, then all the families arrive.»',
      'rec.r2': '«Big smiles and big portions. Prices are insanely low for the quality of food you get. Highly recommend the place.»',
      'rec.r3': '«Great place that serves delicious food in Milan. Generous portions at reasonable prices, friendly and helpful staff!»',
      'rec.r4': '«Great pizzas, great service, lovely owners. A wide choice of desserts with generous portions.»',
      'dove.kicker': 'Where & when', 'dove.t1': 'On Via Novara,', 'dove.t2': 'under the Meazza',
      'dove.metro': 'Via Novara 64, 20147 Milan · San Siro, steps from the stadium',
      'dove.nota': 'Open every day · takeaway and home delivery',
      'dove.chiama': 'Call +39 02 3946 4148', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday',
      'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'What kind of cuisine do you serve?', 'faq.a1': 'Three souls in one place: seafood (spaghetti allo scoglio, mixed fry), oven-baked pizza and grilled meat (T-bone, rib steak), with generous portions.',
      'faq.q2': 'What are your opening hours?', 'faq.a2': 'Open every day, lunch 11am–3pm and dinner 6pm–midnight.',
      'faq.q3': 'Do you do takeaway and delivery?', 'faq.a3': 'Yes: besides dining in, we do takeaway and home delivery. Call +39 02 3946 4148.',
      'faq.q4': 'Do you take bookings?', 'faq.a4': 'Yes — especially on match nights at the Meazza we recommend calling to book a table.',
      'faq.q5': 'Where are you?', 'faq.a5': 'Via Novara 64 in Milan, San Siro area, a stone’s throw from the Meazza stadium.',
      'foot.dove': 'Via Novara 64, 20147 Milan · +39 02 3946 4148',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.prenota': 'Book', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { if (hasST) { els.forEach(function (el) { ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el && !st.progress) st.kill(); }); }); } gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    /* GESTO-FIRMA: le tre anime entrano in stagger */
    gsap.fromTo('.anima', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: .7, stagger: .14, ease: 'power2.out',
      scrollTrigger: { trigger: '.anime-grid', start: 'top 78%', once: true },
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero-badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8 }, .15)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .5)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, .7);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 700); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1, con scavalco mezzanotte) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    var prev = (now.day + 6) % 7, pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) { var pe = toMin(pw[j][1]); if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
