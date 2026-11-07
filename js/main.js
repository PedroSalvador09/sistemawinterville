(function () {
  "use strict";

  const fmtBRL = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const waLink = (text) =>
    `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;

  const TONES = {
    masculinos: ["#1c1c1e", "#3a3a3d"],
    femininos: ["#6d1f2b", "#8f3140"],
    cremes: ["#caa15a", "#e7d6ab"],
    kit: ["#8a6a2e", "#c9a55c"],
    miniaturas: ["#2b2b2d", "#5a4a2a"],
    decants: ["#3d2b1f", "#8a6a2e"],
    outros: ["#0b0b0c", "#3a3a3d"],
  };

  /* ---------------- Header scroll state ---------------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.classList.remove("open");
    })
  );

  /* ---------------- WhatsApp links ---------------- */
  const baseMsg = `Olá! Vim pelo catálogo online da ${STORE.name} e gostaria de fazer um pedido.`;
  [
    "headerWaLink",
    "heroWaLink",
    "aboutWaLink",
    "footerWaLink",
    "footerWaBtn",
    "floatWa",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = waLink(baseMsg);
  });

  document.getElementById("footerWaText").textContent = STORE.whatsappDisplay;
  const igLink = document.getElementById("footerIgLink");
  igLink.href = STORE.instagramUrl;
  document.getElementById("footerIgText").textContent = STORE.instagram;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- Hero particles ---------------- */
  const particlesWrap = document.getElementById("heroParticles");
  const N_PARTICLES = 26;
  for (let i = 0; i < N_PARTICLES; i++) {
    const p = document.createElement("span");
    const size = (Math.random() * 3 + 1.5).toFixed(1);
    p.style.setProperty("--s", `${size}px`);
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--dur", `${8 + Math.random() * 10}s`);
    p.style.setProperty("--del", `${Math.random() * 12}s`);
    particlesWrap.appendChild(p);
  }

  /* ---------------- Filter tabs ---------------- */
  const filterTabs = document.getElementById("filterTabs");
  const footerCats = document.getElementById("footerCats");
  let activeCategory = "todos";
  let searchTerm = "";

  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-tab" + (cat.slug === "todos" ? " active" : "");
    btn.textContent = cat.label;
    btn.dataset.slug = cat.slug;
    btn.setAttribute("role", "tab");
    btn.addEventListener("click", () => {
      activeCategory = cat.slug;
      filterTabs
        .querySelectorAll(".filter-tab")
        .forEach((t) => t.classList.toggle("active", t === btn));
      renderProducts();
    });
    filterTabs.appendChild(btn);

    if (cat.slug !== "todos") {
      const link = document.createElement("a");
      link.href = "#catalogo";
      link.textContent = cat.label;
      link.addEventListener("click", () => {
        activeCategory = cat.slug;
        filterTabs.querySelectorAll(".filter-tab").forEach((t) =>
          t.classList.toggle("active", t.dataset.slug === cat.slug)
        );
        renderProducts();
      });
      footerCats.appendChild(link);
    }
  });

  /* ---------------- Search ---------------- */
  const searchInput = document.getElementById("searchInput");
  let searchDebounce;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchTerm = e.target.value.trim().toLowerCase();
      renderProducts();
    }, 150);
  });

  /* ---------------- Product card builder ---------------- */
  function bottleSVG() {
    return `
      <svg class="bottle" viewBox="0 0 100 140" aria-hidden="true">
        <rect x="38" y="6" width="24" height="14" rx="3" fill="rgba(11,11,12,0.85)"/>
        <rect x="30" y="20" width="40" height="12" rx="5" fill="rgba(255,255,255,0.35)"/>
        <rect x="20" y="32" width="60" height="100" rx="14" fill="rgba(255,255,255,0.92)" stroke="rgba(11,11,12,0.25)" stroke-width="1.2"/>
        <rect x="28" y="46" width="44" height="72" rx="7" fill="none" stroke="rgba(11,11,12,0.18)" stroke-width="0.8"/>
        <text x="50" y="88" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="13" font-weight="700" fill="rgba(11,11,12,0.55)">PS</text>
      </svg>`;
  }

  function mediaMarkup(product) {
    return product.image
      ? `<img class="card-photo" src="${product.image}" alt="${product.name}" loading="lazy" />`
      : bottleSVG();
  }

  function createCard(product, index) {
    const isOut = product.price === 0;
    const tone = TONES[product.category] || TONES.outros;
    const catLabel =
      CATEGORIES.find((c) => c.slug === product.category)?.label || "";

    const card = document.createElement("article");
    card.className = "product-card" + (isOut ? " is-out" : "") + (product.image ? " has-photo" : "");
    card.style.animationDelay = `${Math.min(index, 12) * 45}ms`;

    card.innerHTML = `
      <div class="card-media" style="--tone-a:${tone[0]};--tone-b:${tone[1]}">
        ${product.code ? `<span class="badge badge-code">Cód. ${product.code}</span>` : ""}
        ${isOut ? `<div class="soldout-ribbon">Esgotado</div>` : ""}
        ${mediaMarkup(product)}
      </div>
      <div class="card-body">
        <p class="card-cat">${catLabel}</p>
        <h3 class="card-name">${product.name}</h3>
        <div class="card-footer">
          <div class="card-price ${isOut ? "is-out" : ""}">
            ${isOut ? "Esgotado" : fmtBRL(product.price)}
            ${!isOut ? "<small>à vista</small>" : ""}
          </div>
          <span class="card-buy ${isOut ? "disabled" : ""}" aria-label="Comprar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L4 2H1"/><circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="21" r="1.4" fill="currentColor" stroke="none"/></svg>
          </span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openModal(product));
    return card;
  }

  /* ---------------- Render ---------------- */
  const grid = document.getElementById("productGrid");
  const resultsCount = document.getElementById("resultsCount");
  const noResults = document.getElementById("noResults");

  function getFiltered() {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "todos" || p.category === activeCategory;
      const haystack = `${p.name} ${p.code || ""}`.toLowerCase();
      const matchSearch = !searchTerm || haystack.includes(searchTerm);
      return matchCat && matchSearch;
    });
  }

  function renderProducts() {
    const list = getFiltered();
    grid.innerHTML = "";
    list.forEach((p, i) => grid.appendChild(createCard(p, i)));

    const total = PRODUCTS.length;
    const available = PRODUCTS.filter((p) => p.price > 0).length;
    resultsCount.textContent =
      activeCategory === "todos" && !searchTerm
        ? `${total} produtos no catálogo · ${available} disponíveis agora`
        : `${list.length} produto${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;

    noResults.hidden = list.length !== 0;
  }

  /* ---------------- Modal ---------------- */
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalMedia = document.getElementById("modalMedia");
  const modalCat = document.getElementById("modalCat");
  const modalName = document.getElementById("modalName");
  const modalCode = document.getElementById("modalCode");
  const modalPrice = document.getElementById("modalPrice");
  const modalWaLink = document.getElementById("modalWaLink");
  const modalClose = document.getElementById("modalClose");

  function openModal(product) {
    const isOut = product.price === 0;
    const tone = TONES[product.category] || TONES.outros;
    modalMedia.style.background = `linear-gradient(160deg, ${tone[0]}, ${tone[1]})`;
    modalMedia.classList.toggle("has-photo", Boolean(product.image));
    modalMedia.innerHTML = mediaMarkup(product);
    modalCat.textContent =
      CATEGORIES.find((c) => c.slug === product.category)?.label || "";
    modalName.textContent = product.name;
    modalCode.textContent = product.code ? `Código: ${product.code}` : "";
    modalPrice.textContent = isOut ? "Esgotado no momento" : fmtBRL(product.price);
    modalPrice.classList.toggle("is-out", isOut);

    if (isOut) {
      modalWaLink.textContent = "Avise-me quando chegar";
      modalWaLink.href = waLink(
        `Olá! Gostaria de saber quando "${product.name}"${product.code ? ` (cód. ${product.code})` : ""} volta ao estoque.`
      );
    } else {
      modalWaLink.textContent = "Comprar pelo WhatsApp";
      modalWaLink.href = waLink(
        `Olá! Tenho interesse em comprar "${product.name}"${product.code ? ` (cód. ${product.code})` : ""} — ${fmtBRL(product.price)}.`
      );
    }

    modalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------------- Counters ---------------- */
  const counters = document.querySelectorAll("[data-counter]");
  function animateCounters() {
    counters.forEach((el) => {
      let target = Number(el.dataset.counter);
      if (el === counters[1]) target = PRODUCTS.length;
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          if (entry.target.closest(".hero")) animateCounters();
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------------- Hero parallax (continuous-scroll feel) ---------------- */
  const heroGlowEl = document.querySelector(".hero-glow");
  const heroParticlesEl = document.querySelector(".hero-particles");
  const heroInnerEl = document.querySelector(".hero-inner");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    let parallaxTicking = false;
    const updateParallax = () => {
      const y = window.scrollY;
      if (heroGlowEl) heroGlowEl.style.transform = `translateY(${y * 0.15}px)`;
      if (heroParticlesEl)
        heroParticlesEl.style.transform = `translateY(${y * 0.08}px)`;
      if (heroInnerEl) {
        heroInnerEl.style.opacity = String(Math.max(0, 1 - y / 560));
        heroInnerEl.style.transform = `translateY(${Math.min(y * 0.18, 70)}px)`;
      }
      parallaxTicking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!parallaxTicking) {
          parallaxTicking = true;
          requestAnimationFrame(updateParallax);
        }
      },
      { passive: true }
    );
  }

  /* ---------------- Init ---------------- */
  renderProducts();
})();
