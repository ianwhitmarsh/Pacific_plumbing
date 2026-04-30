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
    ".area-list a",
    ".area-card",
    ".service-link-grid a",
    ".location-meta span",
    ".location-image",
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
    } else if (element.matches(".service-card, .area-list span, .area-list a, .area-card, .service-link-grid a, .process-grid article, .location-meta span")) {
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
  const magneticTargets = document.querySelectorAll(".button, .service-card, .related-links a, .area-card, .area-list a, .service-link-grid a, .social-links a");

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

function normalizeZip(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 5);
}

function showBookingStep(form, stepName) {
  form.querySelectorAll("[data-form-step]").forEach((step) => {
    const isActive = step.dataset.formStep === stepName;
    step.hidden = !isActive;
    step.classList.toggle("form-step-active", isActive);
  });
}

function runBookingZipCheck(form) {
  const zipInput = form.querySelector("[data-zip-input]");
  const zipMessage = form.querySelector("[data-zip-message]");
  const zipSuccess = form.querySelector("[data-zip-success]");
  const supportedZips = new Set((form.dataset.serviceZips || "").split(",").filter(Boolean));
  const zip = normalizeZip(zipInput?.value);

  if (zipInput) {
    zipInput.value = zip;
  }

  if (!zip || zip.length !== 5) {
    form.dataset.zipQualified = "false";
    zipMessage.textContent = "Please enter a 5-digit ZIP code.";
    zipMessage.className = "form-message form-message-error";
    zipInput?.focus();
    return false;
  }

  if (!supportedZips.has(zip)) {
    form.dataset.zipQualified = "false";
    zipMessage.textContent = `That ZIP is outside the current online booking area. Call ${document.querySelector(".phone-link")?.textContent || "Pacific Plumbing"} and we can check options.`;
    zipMessage.className = "form-message form-message-error";
    zipInput?.focus();
    trackConversion("zip_outside_service_area", {
      zip,
      form: form.dataset.trackForm || "booking",
    });
    return false;
  }

  form.dataset.zipQualified = "true";
  zipMessage.textContent = "Good news, this ZIP is in our service area.";
  zipMessage.className = "form-message form-message-success";
  if (zipSuccess) {
    zipSuccess.textContent = `Good news, ${zip} is in our service area.`;
  }
  showBookingStep(form, "details");
  form.querySelector('[name="first_name"]')?.focus();
  trackConversion("zip_service_area_match", {
    zip,
    form: form.dataset.trackForm || "booking",
  });
  return true;
}

function setupBookingFlows() {
  document.querySelectorAll(".booking-flow").forEach((form) => {
    const zipInput = form.querySelector("[data-zip-input]");
    const zipCheck = form.querySelector("[data-zip-check]");
    const zipEdit = form.querySelector("[data-zip-edit]");

    form.dataset.zipQualified = "false";

    zipInput?.addEventListener("input", () => {
      zipInput.value = normalizeZip(zipInput.value);
      form.dataset.zipQualified = "false";
    });

    zipInput?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      runBookingZipCheck(form);
    });

    zipCheck?.addEventListener("click", () => {
      runBookingZipCheck(form);
    });

    zipEdit?.addEventListener("click", () => {
      showBookingStep(form, "zip");
      form.dataset.zipQualified = "false";
      zipInput?.focus();
    });
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
    if (form.classList.contains("booking-flow")) {
      if (form.dataset.zipQualified !== "true" && !runBookingZipCheck(form)) {
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
    }

    trackConversion("form_submit", {
      form: form.dataset.trackForm,
      action: form.getAttribute("action") || "",
      zip: form.querySelector("[data-zip-input]")?.value || "",
      service: form.querySelector('[name="service"]')?.value || "",
    });
    const button = form.querySelector('button[type="submit"]') || form.querySelector("button");
    if (button) {
      button.textContent = "Request Received";
      button.disabled = true;
    }
    window.setTimeout(() => {
      window.location.href = form.getAttribute("action") || "thank-you.html";
    }, 500);
  });
});

document.querySelectorAll(".button:not([data-track]), .service-card, .related-links a, .area-card, .area-list a, .service-link-grid a, .social-links a, .mobile-cta a:not([data-track])").forEach((element) => {
  element.addEventListener("click", addRipple);
});

prepareScrollReveals();
addMagneticHover();
addServicePeekers();
setupBookingFlows();
