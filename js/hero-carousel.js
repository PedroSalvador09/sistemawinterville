(function () {
  "use strict";

  const wrap = document.getElementById("heroCarousel");
  if (!wrap || typeof PRODUCTS === "undefined") return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const TONES = {
    masculinos: ["#1c1c1e", "#3a3a3d"],
    femininos: ["#6d1f2b", "#8f3140"],
    cremes: ["#caa15a", "#e7d6ab"],
    kit: ["#8a6a2e", "#c9a55c"],
    miniaturas: ["#2b2b2d", "#5a4a2a"],
    decants: ["#3d2b1f", "#8a6a2e"],
    outros: ["#0b0b0c", "#3a3a3d"],
  };

  // Curated in-stock showcase: prefer products with a real photo, one per
  // category first, then fill the rest; fall back to no-photo items last.
  const showcase = (() => {
    const inStock = PRODUCTS.filter((p) => p.price > 0);
    const withPhoto = inStock.filter((p) => p.image);
    const withoutPhoto = inStock.filter((p) => !p.image);

    const seen = new Set();
    const picks = [];
    withPhoto.forEach((p) => {
      if (!seen.has(p.category)) {
        picks.push(p);
        seen.add(p.category);
      }
    });
    [...withPhoto, ...withoutPhoto].forEach((p) => {
      if (picks.length >= 10) return;
      if (picks.indexOf(p) === -1) picks.push(p);
    });
    return picks.length ? picks : PRODUCTS.slice(0, 6);
  })();

  function bottleIconSVG() {
    return (
      '<svg viewBox="0 0 100 140" class="hero-card-bottle" aria-hidden="true">' +
      '<rect x="38" y="6" width="24" height="14" rx="3" fill="rgba(11,11,12,0.85)"/>' +
      '<rect x="30" y="20" width="40" height="12" rx="5" fill="rgba(255,255,255,0.35)"/>' +
      '<rect x="20" y="32" width="60" height="100" rx="14" fill="rgba(255,255,255,0.92)" stroke="rgba(11,11,12,0.25)" stroke-width="1.2"/>' +
      '<text x="50" y="88" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="13" font-weight="700" fill="rgba(11,11,12,0.55)">PS</text>' +
      "</svg>"
    );
  }

  const SLOT_COUNT = 16;
  const cards = [];

  for (let i = 0; i < SLOT_COUNT; i++) {
    const el = document.createElement("div");
    el.className = "hero-card";
    el.innerHTML =
      '<div class="hero-card-media"></div>' +
      '<img class="hero-card-photo" alt="" loading="lazy" />' +
      bottleIconSVG() +
      '<div class="hero-card-label"></div>';
    wrap.appendChild(el);
    cards.push({
      el,
      slot: i - SLOT_COUNT / 2,
      media: el.querySelector(".hero-card-media"),
      img: el.querySelector(".hero-card-photo"),
      bottle: el.querySelector(".hero-card-bottle"),
      label: el.querySelector(".hero-card-label"),
      product: null,
    });
  }

  function productForSlot(slot) {
    const n = showcase.length;
    const idx = ((slot % n) + n) % n;
    return showcase[idx];
  }

  function applyProduct(card) {
    const p = productForSlot(card.slot);
    if (card.product === p) return;
    card.product = p;
    const tone = TONES[p.category] || TONES.outros;
    card.media.style.background = `linear-gradient(160deg, ${tone[0]}, ${tone[1]})`;
    card.label.textContent = p.name;
    card.el.classList.toggle("has-photo", Boolean(p.image));
    card.img.src = p.image || "";
    card.img.alt = p.name;
    card.img.style.display = p.image ? "block" : "none";
    card.bottle.style.display = p.image ? "none" : "block";
  }

  let width = 0;
  let scale = 1;
  let pitch = 0;

  function measure() {
    const rect = wrap.getBoundingClientRect();
    width = rect.width || window.innerWidth;
    scale = Math.min(1, Math.max(0.3, width / 1440));
    pitch = 196 * scale;
  }
  measure();

  if (window.ResizeObserver) {
    new ResizeObserver(measure).observe(wrap);
  } else {
    window.addEventListener("resize", measure);
  }

  function layout() {
    const halfW = width / 2;
    cards.forEach((card) => {
      const t = card.slot * pitch;
      const d = Math.min(1.1, Math.abs(t) / Math.max(1, halfW));
      const w = (170 + 48 * d * d) * scale;
      const h = (280 + 92 * Math.pow(d, 2.6)) * scale;
      const pushedT = t * (1 + 0.09 * d * d);
      const lift = -14 * d * d * scale;
      const rot = Math.sign(t) * d * 9;

      applyProduct(card);
      card.el.style.width = w + "px";
      card.el.style.height = h + "px";
      card.el.style.transform = `translate(-50%,-50%) translate(${pushedT}px, ${lift}px) rotate(${rot}deg)`;
      card.el.style.zIndex = String(1000 - Math.round(d * 500));
    });
  }

  if (prefersReduced) {
    layout();
    return;
  }

  let scrollOffset = 0;
  let momentum = 0;
  let dragging = false;
  let lastPointerX = 0;
  let lastT = 0;
  const AUTO_SPEED = 42; // px/s at reference scale

  wrap.addEventListener("pointerdown", (e) => {
    dragging = true;
    wrap.classList.add("dragging");
    lastPointerX = e.clientX;
    lastT = performance.now();
    momentum = 0;
    try {
      wrap.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  wrap.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastPointerX;
    const dt = Math.max(1, now - lastT);
    scrollOffset -= dx;
    momentum = (-dx / dt) * 1000;
    lastPointerX = e.clientX;
    lastT = now;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    wrap.classList.remove("dragging");
    momentum = Math.max(-2200, Math.min(2200, momentum));
  }
  wrap.addEventListener("pointerup", endDrag);
  wrap.addEventListener("pointercancel", endDrag);
  wrap.addEventListener("pointerleave", (e) => {
    if (dragging && e.buttons === 0) endDrag();
  });

  let lastFrame = performance.now();

  function frame(now) {
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;

    if (!dragging) {
      momentum *= Math.pow(0.05, dt);
      if (Math.abs(momentum) < 0.5) momentum = 0;
      scrollOffset += (AUTO_SPEED * scale + momentum) * dt;
    }

    const halfW = width / 2;
    const edgeBuffer = pitch * 2;

    cards.forEach((card) => {
      let t = card.slot * pitch - scrollOffset;
      if (t < -halfW - edgeBuffer) {
        card.slot += SLOT_COUNT;
      } else if (t > halfW + edgeBuffer) {
        card.slot -= SLOT_COUNT;
      }
      t = card.slot * pitch - scrollOffset;

      const d = Math.min(1.1, Math.abs(t) / Math.max(1, halfW));
      const w = (170 + 48 * d * d) * scale;
      const h = (280 + 92 * Math.pow(d, 2.6)) * scale;
      const pushedT = t * (1 + 0.09 * d * d);
      const lift = -14 * d * d * scale;
      const rot = Math.sign(t) * d * 9;

      applyProduct(card);
      card.el.style.width = w + "px";
      card.el.style.height = h + "px";
      card.el.style.transform = `translate(-50%,-50%) translate(${pushedT}px, ${lift}px) rotate(${rot}deg)`;
      card.el.style.zIndex = String(1000 - Math.round(d * 500));
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame((t) => {
    lastFrame = t;
    requestAnimationFrame(frame);
  });
})();
