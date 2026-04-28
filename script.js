const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function trackConversion(eventName, details = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...details });
  window.dispatchEvent(new CustomEvent("pacific:conversion", { detail: { eventName, ...details } }));
}

function addRipple(event) {
  if (prefersReducedMotion) return;
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.6;
  const ripple = document.createElement("span");
  ripple.className = "fx-ripple";
  ripple.style.setProperty("--ripple-size", `${size}px`);
  ripple.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
  ripple.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
  target.append(ripple);
  target.classList.remove("is-clicking");
  void target.offsetWidth;
  target.classList.add("is-clicking");
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  target.addEventListener("animationend", () => target.classList.remove("is-clicking"), { once: true });
}

function prepareScrollReveals() {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  document.body.classList.add("motion-ready");
  const revealTargets = document.querySelectorAll([
    ".quick-proof article",
    ".section-heading",
    ".section-kicker",
    ".split > *",
    ".service-card",
    ".why-card",
    ".why-list > div",
    ".process-grid article",
    ".review-copy",
    ".reviews > *",
    ".campaign-image",
    ".campaign-copy",
    ".areas-section > *",
    ".area-list span",
    ".content-panel",
    ".sidebar-card",
    ".booking-form",
    ".footer-columns > *",
  ].join(","));

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${(index % 6) * 55}ms`);
    if (element.matches(".campaign-image, .reviews > *, .sidebar-card")) {
      element.dataset.reveal = "right";
    } else if (element.matches(".campaign-copy, .review-copy, .split > *:first-child")) {
      element.dataset.reveal = "left";
    } else if (element.matches(".service-card, .area-list span, .process-grid article")) {
      element.dataset.reveal = "scale";
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
  );

  revealTargets.forEach((element) => observer.observe(element));
}

function addMagneticHover() {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
  const magneticTargets = document.querySelectorAll(".button, .service-card, .related-links a");

  magneticTargets.forEach((target) => {
    target.addEventListener("mousemove", (event) => {
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      target.style.setProperty("--hover-x", `${x}px`);
      target.style.setProperty("--hover-y", `${y}px`);
    });

    target.addEventListener("mouseleave", () => {
      target.style.removeProperty("--hover-x");
      target.style.removeProperty("--hover-y");
    });
  });
}

function addServicePeekers() {
  if (prefersReducedMotion) return;
  document.querySelectorAll(".service-card-wrap").forEach((wrapper) => {
    wrapper.addEventListener("pointerenter", () => wrapper.classList.add("is-peeking"));
    wrapper.addEventListener("pointerleave", () => wrapper.classList.remove("is-peeking"));
    wrapper.addEventListener("focusin", () => wrapper.classList.add("is-peeking"));
    wrapper.addEventListener("focusout", () => wrapper.classList.remove("is-peeking"));
  });
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", (event) => {
    addRipple(event);
    trackConversion(element.dataset.track, {
      location: element.dataset.trackLocation || "unknown",
      href: element.getAttribute("href") || "",
    });
  });
});

document.querySelectorAll("form[data-track-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    trackConversion("form_submit", {
      form: form.dataset.trackForm,
      action: form.getAttribute("action") || "",
    });
    const button = form.querySelector("button");
    if (button) {
      button.textContent = "Request Received";
      button.disabled = true;
    }
    window.setTimeout(() => {
      window.location.href = form.getAttribute("action") || "thank-you.html";
    }, 500);
  });
});

document.querySelectorAll(".button:not([data-track]), .service-card, .related-links a, .mobile-cta a:not([data-track])").forEach((element) => {
  element.addEventListener("click", addRipple);
});

prepareScrollReveals();
addMagneticHover();
addServicePeekers();
