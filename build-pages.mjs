import { mkdir, writeFile } from "node:fs/promises";

const site = {
  name: "Pacific Plumbing",
  baseUrl: "https://www.pacificplumbingtulsa.com",
  phone: "918-703-9488",
  phoneHref: "tel:9187039488",
  city: "Tulsa",
  image: "/assets/pacific-truck-mascot.png",
  description:
    "Pacific Plumbing helps Tulsa homeowners with water heaters, re-pipes, fixtures, water lines, leaks, drains, sewer lines, and emergency plumbing service.",
  areas: [
    "Tulsa",
    "Broken Arrow",
    "Bixby",
    "Jenks",
    "Owasso",
    "Sand Springs",
    "Glenpool",
    "Claremore",
  ],
};

const scriptVersion = "site-motion-8";

const services = [
  {
    slug: "water-heaters",
    name: "Water Heater Repair & Installation",
    shortName: "Water Heaters",
    keyword: "water heater repair Tulsa",
    title: "Water Heater Repair & Installation in Tulsa | Pacific Plumbing",
    description:
      "Need water heater repair or installation in Tulsa? Pacific Plumbing handles tank and tankless water heaters with clear options and clean work.",
    image: "assets/water-heater-service.png",
    imageAlt: "Pacific Plumbing mascot servicing a branded water heater",
    h1: "Water heater repair and installation in Tulsa.",
    intro:
      "No hot water can derail the whole house. Pacific Plumbing helps Tulsa homeowners diagnose water heater problems, compare repair and replacement options, and get hot water moving again without muddy explanations.",
    bulletsTitle: "Call Pacific when you notice",
    bullets: [
      "No hot water or water that runs cold too quickly",
      "Rust-colored water, popping sounds, or leaking around the tank",
      "A pilot light or ignition issue that keeps returning",
      "A water heater that is aging out and costing more to run",
    ],
    process: [
      "Inspect the heater, connections, venting, and visible plumbing.",
      "Explain whether repair, flushing, or replacement makes the most sense.",
      "Complete the work cleanly and review maintenance steps before leaving.",
    ],
    faqs: [
      ["Should I repair or replace my water heater?", "It depends on age, leak location, performance, and repair cost. Pacific explains both paths so you can choose the practical option."],
      ["Do you work on tankless water heaters?", "Yes. The page is structured for both tank and tankless service, including diagnostics, flushing, repair, and replacement."],
      ["Is no hot water an emergency?", "It can be urgent, especially for families or businesses. Call Pacific and the team can help prioritize timing."],
    ],
  },
  {
    slug: "re-piping",
    name: "Re-Piping Services",
    shortName: "Re-Pipes",
    keyword: "repiping Tulsa",
    title: "Re-Piping Services in Tulsa | Pacific Plumbing",
    description:
      "Pacific Plumbing provides whole-home and partial re-piping services in Tulsa with careful planning, clear communication, and quality work.",
    image: "assets/re-piping-service.png",
    imageAlt: "Pacific Plumbing mascot tightening copper re-piping at a home",
    h1: "Re-piping services planned around your home.",
    intro:
      "Old or failing pipes can create low pressure, discolored water, recurring leaks, and expensive repairs that never quite end. Pacific Plumbing plans partial and whole-home re-pipes with clean communication and careful sequencing.",
    bulletsTitle: "Re-piping may be worth discussing if you have",
    bullets: [
      "Frequent leaks in different parts of the home",
      "Low water pressure that keeps getting worse",
      "Rusty, cloudy, or metallic-tasting water",
      "Older pipe materials that are near the end of their service life",
    ],
    process: [
      "Review visible plumbing, symptoms, home layout, and project goals.",
      "Map the work and explain disruption, access points, and timing.",
      "Replace the affected piping and test the system before wrap-up.",
    ],
    faqs: [
      ["Do I need a whole-home re-pipe?", "Not always. Some homes only need targeted replacement. Pacific scopes the issue before recommending the size of the project."],
      ["How disruptive is re-piping?", "It depends on access and home layout. A good plan reduces surprises and keeps the work as orderly as possible."],
      ["Can re-piping improve water pressure?", "Yes, when pressure issues are tied to corroded, undersized, or failing supply lines."],
    ],
  },
  {
    slug: "fixtures",
    name: "Fixture Repair & Installation",
    shortName: "Fixtures",
    keyword: "fixture repair Tulsa",
    title: "Fixture Repair & Installation in Tulsa | Pacific Plumbing",
    description:
      "Pacific Plumbing repairs and installs faucets, toilets, sinks, showers, disposals, and other plumbing fixtures for Tulsa homes.",
    image: "assets/fixtures-service.png",
    imageAlt: "Pacific Plumbing mascot installing a bathroom faucet fixture",
    h1: "Fixture repair and installation that feels finished.",
    intro:
      "Small fixture problems can waste water, damage cabinets, and make a room feel unfinished. Pacific Plumbing repairs and installs faucets, toilets, sinks, showers, disposals, and other fixtures with clean work and practical recommendations.",
    bulletsTitle: "We help with",
    bullets: [
      "Leaking faucets, running toilets, and loose connections",
      "New fixture installation for remodels and replacements",
      "Kitchen sinks, bathroom sinks, showers, tubs, and disposals",
      "Fixture upgrades that need reliable shutoff and supply connections",
    ],
    process: [
      "Confirm the fixture issue, shutoffs, water supply, and drain connection.",
      "Recommend repair or replacement based on condition and fit.",
      "Install or repair the fixture, test it, and clean the work area.",
    ],
    faqs: [
      ["Can you install customer-supplied fixtures?", "Yes, as long as the fixture is appropriate for the space and compatible with existing plumbing."],
      ["Why does my toilet keep running?", "Common causes include flapper, fill valve, chain, or flush valve issues. A quick inspection usually identifies the fix."],
      ["Do fixture leaks matter if they are small?", "Yes. Small leaks can waste water, damage finishes, and become larger problems over time."],
    ],
  },
  {
    slug: "water-lines",
    name: "Water Line Repair",
    shortName: "Water Lines",
    keyword: "water line repair Tulsa",
    title: "Water Line Repair in Tulsa | Pacific Plumbing",
    description:
      "Pacific Plumbing diagnoses and repairs water line issues in Tulsa, including service line leaks, yard leaks, and pressure problems.",
    image: "assets/water-lines-service.png",
    imageAlt: "Pacific Plumbing mascot repairing an underground water line",
    h1: "Water line repair for pressure, leaks, and peace of mind.",
    intro:
      "A water line issue can show up as a soggy yard, rising water bill, weak pressure, or water where it does not belong. Pacific Plumbing helps locate the problem and explain the best repair path.",
    bulletsTitle: "Signs of a possible water line problem",
    bullets: [
      "Wet spots in the yard or around the foundation",
      "A sudden increase in your water bill",
      "Reduced water pressure throughout the home",
      "Sounds of running water when fixtures are off",
    ],
    process: [
      "Check symptoms, shutoffs, meter behavior, and visible plumbing.",
      "Determine whether the issue points to the service line or interior plumbing.",
      "Repair or replace the affected line and test for reliable flow.",
    ],
    faqs: [
      ["How do I know if my main water line is leaking?", "Meter movement when fixtures are off, soggy ground, and pressure changes can all point to a leak."],
      ["Can a water line leak damage my foundation?", "It can, depending on location and duration. Prompt diagnosis helps reduce risk."],
      ["Do all water line leaks require replacement?", "No. Some can be repaired, while aging or repeatedly failing lines may justify replacement."],
    ],
  },
  {
    slug: "leak-detection",
    name: "Leak Detection & Slab Leak Repair",
    shortName: "Leak Detection",
    keyword: "leak detection Tulsa",
    title: "Leak Detection & Slab Leak Repair in Tulsa | Pacific Plumbing",
    description:
      "Pacific Plumbing helps Tulsa homeowners find hidden leaks, slab leaks, and water damage risks before they become bigger plumbing problems.",
    image: "assets/leak-detection-service.png",
    imageAlt: "Pacific Plumbing mascot using a flashlight to find an under-sink leak",
    h1: "Leak detection for hidden plumbing problems.",
    intro:
      "Hidden leaks are stressful because the damage can spread before the source is obvious. Pacific Plumbing helps Tulsa homeowners narrow down leak sources, protect the home, and choose the right repair.",
    bulletsTitle: "Do not ignore",
    bullets: [
      "Warm spots on floors or unexplained damp areas",
      "Moldy smells, warped flooring, or stained drywall",
      "Running water sounds when everything is off",
      "A water bill that jumps without a clear reason",
    ],
    process: [
      "Listen to symptoms and inspect visible plumbing and water-use clues.",
      "Isolate likely leak zones and explain repair options.",
      "Repair the leak or plan the next step if specialty access is needed.",
    ],
    faqs: [
      ["What is a slab leak?", "A slab leak is a leak in piping located under or within the concrete slab foundation."],
      ["Are slab leaks urgent?", "Yes. They can damage flooring, foundations, and finishes if ignored."],
      ["Can leak detection prevent bigger repairs?", "Often, yes. Finding a leak earlier can reduce water damage and limit repair scope."],
    ],
  },
  {
    slug: "drain-sewer",
    name: "Drain & Sewer Services",
    shortName: "Drains & Sewer",
    keyword: "drain cleaning Tulsa",
    title: "Drain Cleaning & Sewer Services in Tulsa | Pacific Plumbing",
    description:
      "Pacific Plumbing provides drain cleaning, camera inspection planning, sewer line repair support, and clog help for Tulsa homes.",
    h1: "Drain and sewer help when the line will not clear.",
    intro:
      "Slow drains, recurring clogs, and sewer smells can signal more than a simple blockage. Pacific Plumbing helps identify whether you need clearing, inspection, repair, or a bigger sewer conversation.",
    bulletsTitle: "Call for drain or sewer help when you have",
    bullets: [
      "Multiple slow drains or backups at the same time",
      "Sewer odors near drains or outside cleanouts",
      "A clog that returns soon after clearing",
      "Gurgling drains, toilet bubbling, or standing water",
    ],
    process: [
      "Identify which fixtures are affected and how often the issue returns.",
      "Clear the blockage when appropriate and recommend inspection when needed.",
      "Explain repair options for damaged or failing drain and sewer lines.",
    ],
    faqs: [
      ["Why do my drains keep clogging?", "Recurring clogs can come from buildup, roots, pipe damage, slope problems, or foreign material in the line."],
      ["When is a camera inspection useful?", "Camera inspection is useful when clogs repeat, multiple fixtures are affected, or sewer-line damage is suspected."],
      ["Is a sewer backup an emergency?", "Yes. Stop using water where possible and call for help quickly."],
    ],
  },
  {
    slug: "emergency-plumbing",
    name: "Emergency Plumbing",
    shortName: "Emergency Plumbing",
    keyword: "emergency plumber Tulsa",
    title: "Emergency Plumber in Tulsa | Pacific Plumbing",
    description:
      "Need an emergency plumber in Tulsa? Pacific Plumbing helps with urgent leaks, backups, water heater problems, and plumbing failures.",
    h1: "Emergency plumbing help for urgent home problems.",
    intro:
      "Burst pipes, backups, and sudden leaks need clear next steps. Pacific Plumbing helps Tulsa homeowners stabilize the situation, understand the problem, and get a practical fix underway.",
    bulletsTitle: "Urgent plumbing situations include",
    bullets: [
      "Burst or actively leaking pipes",
      "Sewer backups or wastewater coming up through drains",
      "No hot water when the household depends on it",
      "Water line leaks, fixture failures, or shutoff problems",
    ],
    process: [
      "Help you identify immediate shutoff or safety steps.",
      "Prioritize the problem and inspect the source.",
      "Make the repair or provide a clear plan for the permanent fix.",
    ],
    faqs: [
      ["What should I do before the plumber arrives?", "If safe, shut off the water at the fixture or main valve and avoid using affected drains."],
      ["Can a small leak be an emergency?", "Yes, if water is spreading, damaging finishes, or cannot be shut off."],
      ["Do emergency repairs still include options?", "Pacific still explains the situation and practical repair path whenever possible."],
    ],
  },
  {
    slug: "bathroom-kitchen",
    name: "Bathroom & Kitchen Plumbing",
    shortName: "Bathroom & Kitchen",
    keyword: "bathroom plumbing Tulsa",
    title: "Bathroom & Kitchen Plumbing in Tulsa | Pacific Plumbing",
    description:
      "Pacific Plumbing helps Tulsa homeowners with bathroom and kitchen plumbing repairs, fixture installs, drains, disposals, sinks, and supply lines.",
    h1: "Bathroom and kitchen plumbing done right.",
    intro:
      "Kitchens and bathrooms carry the busiest plumbing in the home. Pacific Plumbing helps with repairs, replacements, remodel tie-ins, and everyday issues that make these rooms harder to use.",
    bulletsTitle: "Common projects include",
    bullets: [
      "Kitchen sinks, disposals, faucets, and supply lines",
      "Bathroom sinks, toilets, tubs, showers, and valves",
      "Drain problems, leaks, and fixture upgrades",
      "Plumbing support for remodels and room updates",
    ],
    process: [
      "Review the fixture, drain, supply, or remodel need.",
      "Confirm compatibility and the cleanest repair or install path.",
      "Complete the work and test every connection before finishing.",
    ],
    faqs: [
      ["Can you help during a remodel?", "Yes. Pacific can support fixture changes, drain adjustments, and supply-line needs."],
      ["Do you repair garbage disposals?", "Yes, when repair makes sense. Replacement may be recommended for older or failed units."],
      ["Can one visit cover multiple fixtures?", "Often, yes. Mention all issues when booking so the visit can be planned well."],
    ],
  },
  {
    slug: "gas-lines",
    name: "Gas Line Plumbing",
    shortName: "Gas Lines",
    keyword: "gas line plumber Tulsa",
    title: "Gas Line Plumbing in Tulsa | Pacific Plumbing",
    description:
      "Pacific Plumbing provides gas line plumbing support in Tulsa for safe appliance connections, repairs, and planned gas-line work.",
    h1: "Gas line plumbing handled with care.",
    intro:
      "Gas line work needs caution, clarity, and the right process. Pacific Plumbing helps with planned gas-line plumbing needs and can guide homeowners when a gas concern needs immediate attention.",
    bulletsTitle: "Gas line service may be needed for",
    bullets: [
      "Appliance changes or new appliance connections",
      "Gas line repairs or replacement planning",
      "Outdoor living, kitchen, or laundry updates",
      "Suspected issues that need professional evaluation",
    ],
    process: [
      "Discuss the project or concern and identify safety considerations.",
      "Inspect accessible gas piping and appliance connection needs.",
      "Complete approved work following applicable safety requirements.",
    ],
    faqs: [
      ["What should I do if I smell gas?", "Leave the area, avoid switches or flames, and contact the gas utility or emergency services. Do not wait on a website form."],
      ["Can Pacific connect gas appliances?", "The site is structured to support gas appliance connection inquiries where appropriate and permitted."],
      ["Why does gas line work need a specialist?", "Gas line work carries safety risk and must be handled with proper materials, testing, and code awareness."],
    ],
  },
];

const supportPages = [
  {
    path: "service-areas.html",
    title: "Pacific Plumbing Service Areas | Tulsa Metro Plumber",
    description:
      "Pacific Plumbing serves Tulsa, Broken Arrow, Bixby, Jenks, Owasso, Sand Springs, Glenpool, Claremore, and nearby communities.",
    h1: "Tulsa metro plumbing service with local accountability.",
    eyebrow: "Service areas",
    copy:
      "Pacific Plumbing is built for homeowners across the Tulsa metro who want plumbing help that is clear, prompt, and easy to understand. The site should eventually support dedicated city pages once real service volume and content justify them.",
    type: "areas",
  },
  {
    path: "about.html",
    title: "About Pacific Plumbing | Honest Service, Quality Work, Tulsa Proud",
    description:
      "Meet Pacific Plumbing, a Tulsa-proud plumbing brand built around honest service, quality work, and memorable local trust.",
    h1: "A plumbing brand Tulsa can remember and trust.",
    eyebrow: "About Pacific",
    copy:
      "Pacific Plumbing pairs a memorable wave-driven brand with a serious service promise: clear options, careful work, and local accountability. The personality gets attention, but the customer experience is what earns the call back.",
    type: "about",
  },
  {
    path: "reviews.html",
    title: "Pacific Plumbing Reviews | Tulsa Plumbing Trust Signals",
    description:
      "Review highlights and trust signals for Pacific Plumbing, including clear communication, clean work, and practical repair options.",
    h1: "Reviews should prove the promise.",
    eyebrow: "Reviews",
    copy:
      "Real customer reviews should be added here as soon as they are available. Until then, this page is structured to explain what the review strategy needs to show: clear communication, clean work, fair options, and reliable results.",
    type: "reviews",
  },
  {
    path: "contact.html",
    title: "Contact Pacific Plumbing | Book Tulsa Plumbing Service",
    description:
      "Contact Pacific Plumbing to schedule Tulsa plumbing service for water heaters, leaks, drains, re-pipes, fixtures, water lines, and emergencies.",
    h1: "Tell us what plumbing problem you need solved.",
    eyebrow: "Contact",
    copy:
      "Call Pacific Plumbing or request a service window. For urgent water damage, shut off the water if you can do so safely and call instead of waiting on a form response.",
    type: "contact",
  },
  {
    path: "thank-you.html",
    title: "Thank You | Pacific Plumbing",
    description:
      "Thank you for contacting Pacific Plumbing. For urgent plumbing issues in Tulsa, call 918-703-9488.",
    h1: "Thanks. We received your request.",
    eyebrow: "Thank you",
    copy:
      "This concept page gives the site a measurable conversion destination. In production, connect the form to the booking system and fire a form-submit conversion event here.",
    type: "thankyou",
    noindex: true,
  },
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function absolute(path = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${clean}`;
}

function relativePrefix(path) {
  return path.includes("/") ? "../" : "";
}

function nav(prefix = "") {
  return `
    <header class="site-header" data-header>
      <a class="brand" href="${prefix}index.html" aria-label="Pacific Plumbing home">
        <span class="brand-logo header-logo">
          <img src="${prefix}assets/pacific-new-logo.png" alt="">
        </span>
      </a>
      <nav class="desktop-nav" aria-label="Main navigation">
        <a href="${prefix}services/">Services</a>
        <a href="${prefix}about.html">Why Pacific</a>
        <a href="${prefix}reviews.html">Reviews</a>
        <a href="${prefix}service-areas.html">Service Area</a>
      </nav>
      <div class="header-actions">
        <a class="phone-link" href="${site.phoneHref}" data-track="phone_click" data-track-location="header">${site.phone}</a>
        <a class="button button-primary" href="${prefix}contact.html" data-track="booking_click" data-track-location="header">Book Online</a>
        <button class="menu-button" type="button" data-menu-button aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span><span></span><span class="sr-only">Open menu</span>
        </button>
      </div>
    </header>
    <nav class="mobile-menu" id="mobile-menu" data-mobile-menu aria-label="Mobile navigation">
      <a href="${prefix}services/">Services</a>
      <a href="${prefix}about.html">Why Pacific</a>
      <a href="${prefix}reviews.html">Reviews</a>
      <a href="${prefix}service-areas.html">Service Area</a>
      <a href="${prefix}contact.html">Book Online</a>
    </nav>`;
}

function footer(prefix = "") {
  return `
    <footer class="site-footer">
      <div class="footer-columns">
        <div>
          <div class="brand footer-brand">
            <span class="brand-logo footer-logo">
              <img src="${prefix}assets/pacific-new-logo.png" alt="Pacific Plumbing">
            </span>
          </div>
          <p>Ready for slippery situations. Honest service. Quality work. Tulsa proud.</p>
          <a href="${site.phoneHref}">${site.phone}</a>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            ${services.slice(0, 6).map((service) => `<li><a href="${prefix}services/${service.slug}.html">${esc(service.shortName)}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>More</h3>
          <ul>
            <li><a href="${prefix}services/">All Services</a></li>
            <li><a href="${prefix}service-areas.html">Service Areas</a></li>
            <li><a href="${prefix}about.html">About</a></li>
            <li><a href="${prefix}reviews.html">Reviews</a></li>
            <li><a href="${prefix}contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
    <div class="mobile-cta" aria-label="Mobile quick actions">
      <a href="${site.phoneHref}" data-track="phone_click" data-track-location="mobile_sticky">Call Now</a>
      <a href="${prefix}contact.html" data-track="booking_click" data-track-location="mobile_sticky">Book Online</a>
    </div>`;
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2).replaceAll("</", "<\\/")}</script>`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PlumbingContractor",
    "@id": `${site.baseUrl}/#business`,
    name: site.name,
    url: site.baseUrl,
    telephone: site.phone,
    logo: absolute("assets/pacific-new-logo.png"),
    image: absolute("assets/pacific-truck-mascot.png"),
    priceRange: "$$",
    slogan: "Ready for slippery situations.",
    areaServed: site.areas.map((area) => ({ "@type": "City", name: area })),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        areaServed: "Tulsa, OK",
      },
    })),
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

function head({ title, description, path, prefix = "", schema = [], noindex = false, ogImage = "assets/pacific-truck-mascot.png" }) {
  const canonical = absolute(path);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    ${noindex ? '<meta name="robots" content="noindex,follow">' : ""}
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${absolute(ogImage)}">
    <link rel="stylesheet" href="${prefix}styles.css?v=${scriptVersion}">
    ${schema.map(jsonLd).join("\n    ")}
  </head>`;
}

function serviceIcon() {
  return `<span class="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2s7 7 7 13a7 7 0 0 1-14 0C5 9 12 2 12 2Zm-2 13a2 2 0 0 0 4 0h3a5 5 0 0 1-10 0h3Z"></path></svg></span>`;
}

function ctaBand(prefix = "") {
  return `
    <section class="book-section" id="book">
      <div>
        <p class="eyebrow">Ready when you are</p>
        <h2>Get out of a slippery situation today.</h2>
        <p>Call now or request a service window. Pacific Plumbing will help you understand the problem and choose the right fix.</p>
      </div>
      <form class="booking-form" action="${prefix}thank-you.html" method="post" data-track-form="service_request">
        <label>Name<input type="text" name="name" autocomplete="name" placeholder="Your name"></label>
        <label>Phone<input type="tel" name="phone" autocomplete="tel" placeholder="${site.phone}"></label>
        <label>What do you need help with?
          <select name="service">
            ${services.map((service) => `<option>${esc(service.shortName)}</option>`).join("")}
          </select>
        </label>
        <button class="button button-primary button-large" type="submit" data-track="form_submit" data-track-location="cta_band">Request Service</button>
        <p class="form-note">Demo form for the website concept. Connect this to the booking system before launch.</p>
      </form>
    </section>`;
}

function serviceCards(prefix = "", limit = services.length) {
  return services.slice(0, limit).map((service) => `
    <div class="service-card-wrap">
      <span class="service-peeker" aria-hidden="true"><img src="${prefix}assets/banana-look-over.png" alt=""></span>
      <a class="service-card" href="${prefix}services/${service.slug}.html">
        ${serviceIcon()}
        <strong>${esc(service.shortName)}</strong>
        <span>${esc(service.description.replace(/^Pacific Plumbing (provides|repairs|diagnoses and repairs|helps Tulsa homeowners with|helps Tulsa homeowners find|handles|helps with|provides gas line plumbing support in Tulsa for)/, "").replace(/\.$/, "."))}</span>
      </a>
    </div>`).join("");
}

function relatedServices(current, prefix = "../") {
  return services
    .filter((service) => service.slug !== current.slug)
    .slice(0, 3)
    .map((service) => `<a href="${prefix}services/${service.slug}.html">${esc(service.shortName)}</a>`)
    .join("");
}

function homepage() {
  const schema = [
    localBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${site.baseUrl}/services/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
  return `${head({ title: "Pacific Plumbing | Tulsa Plumbers Ready for Slippery Situations", description: site.description, path: "/", schema })}
  <body>
    ${nav("")}
    <main id="top">
      <section class="hero">
        <div class="hero-overlay" aria-hidden="true"></div>
        <div class="hero-inner">
          <div class="hero-content">
            <p class="eyebrow">Tulsa proud plumbing service</p>
            <h1>Ready for slippery situations.</h1>
            <p class="hero-copy">Water heaters, re-pipes, fixtures, water lines, and emergency plumbing handled by a local team that keeps things clear, clean, and calm.</p>
            <div class="hero-actions">
              <a class="button button-primary button-large" href="${site.phoneHref}" data-track="phone_click" data-track-location="home_hero">Call ${site.phone}</a>
              <a class="button button-light button-large" href="contact.html" data-track="booking_click" data-track-location="home_hero">Book Online</a>
            </div>
            <div class="trust-row" aria-label="Pacific Plumbing promises">
              <span>Honest service</span><span>Quality work</span><span>Tulsa proud</span>
            </div>
          </div>
          <div class="hero-image">
            <img src="assets/pacific-truck-mascot.png" alt="Pacific Plumbing mascot standing beside a branded plumbing truck">
          </div>
        </div>
      </section>
      <section class="quick-proof" aria-label="Service highlights">
        <article><strong>Same-day help</strong><span>Fast dispatch for urgent leaks, clogs, and no-hot-water calls.</span></article>
        <article><strong>Clear options</strong><span>Know what is happening, what it costs, and what your choices are.</span></article>
        <article><strong>Clean finish</strong><span>Respectful technicians, tidy work areas, and repairs built to last.</span></article>
      </section>
      <section class="section intro-section">
        <div class="section-kicker">Plumbing without the panic</div>
        <div class="split">
          <div><h2>Tulsa plumbers who make the next step obvious.</h2></div>
          <div><p>Plumbing problems can make a normal day feel expensive in a hurry. Pacific Plumbing helps homeowners understand the issue, choose the right fix, and get back to normal without surprise pressure or muddy explanations.</p></div>
        </div>
      </section>
      <section class="section services-section" id="services">
        <div class="section-heading">
          <p class="eyebrow">Our services</p>
          <h2>Permanent solutions for everyday plumbing problems.</h2>
          <p>Pacific now has dedicated service pages built for homeowners and search engines, with unique local copy, FAQs, and schema for each priority plumbing need.</p>
          <a class="text-link" href="services/">View all services</a>
        </div>
        <div class="service-grid">${serviceCards("", 6)}</div>
      </section>
      <section class="section why-section" id="why">
        <div class="why-card">
          <div><p class="eyebrow">Why Pacific</p><h2>Clear answers before the wrench turns.</h2><p>A good plumbing visit should leave you more confident, not more confused. Pacific technicians explain what they find, give practical options, and keep the job site treated like home.</p></div>
          <div class="why-list">
            <div><strong>Up-front guidance</strong><span>No mystery work. No vague next steps.</span></div>
            <div><strong>Respectful technicians</strong><span>Clean uniforms, clear communication, and careful work.</span></div>
            <div><strong>Local accountability</strong><span>A Tulsa-area company building its name one home at a time.</span></div>
          </div>
        </div>
      </section>
      <section class="section process-section">
        <div class="section-heading"><p class="eyebrow">How it works</p><h2>Back to normal in three simple steps.</h2></div>
        <div class="process-grid">
          <article><span>01</span><h3>Call or book</h3><p>Tell us what is going on and we will help you choose the right timing.</p></article>
          <article><span>02</span><h3>Get clear options</h3><p>We inspect the issue, explain what we found, and walk through practical fixes.</p></article>
          <article><span>03</span><h3>Enjoy dry floors</h3><p>We complete the work carefully, clean up, and leave you with confidence.</p></article>
        </div>
      </section>
      <section class="section reviews-section" id="reviews">
        <div class="review-copy"><p class="eyebrow">Trust signals</p><h2>The kind of plumbing visit people remember for the right reasons.</h2><p>Real reviews should be connected before launch. The site is structured to feature trust proof without inventing review ratings.</p></div>
        <div class="reviews">
          <blockquote><p>"They explained the issue clearly, gave us options, and had hot water back the same day."</p><cite>Water heater customer</cite></blockquote>
          <blockquote><p>"The crew was clean, quick, and honest about what needed to be fixed now versus later."</p><cite>Re-pipe customer</cite></blockquote>
        </div>
      </section>
      <section class="section campaign-section">
        <div class="campaign-image"><img src="assets/pacific-billboard.png" alt="Pacific Plumbing billboard with Ready for Slippery Situations campaign"></div>
        <div class="campaign-copy"><p class="eyebrow">A brand Tulsa will remember</p><h2>Memorable on the road. Reliable in your home.</h2><p>The campaign gets attention. The website turns that attention into confidence by pairing the playful billboard with grounded proof: service clarity, local pride, and practical plumbing expertise.</p><a class="text-link" href="contact.html">Schedule service</a></div>
      </section>
      <section class="section areas-section" id="areas">
        <div><p class="eyebrow">Service area</p><h2>Serving Tulsa and nearby communities.</h2><p>Pacific Plumbing is built for homeowners across the Tulsa metro who want service that feels fast, fair, and easy to understand.</p><a class="text-link" href="service-areas.html">Explore service areas</a></div>
        <div class="area-list" aria-label="Service area cities">${site.areas.map((area) => `<span>${esc(area)}</span>`).join("")}</div>
      </section>
      ${ctaBand("")}
    </main>
    ${footer("")}
    <script src="script.js?v=${scriptVersion}"></script>
  </body>
</html>`;
}

function servicesIndex() {
  const path = "services/";
  const schema = [
    localBusinessSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path }]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Pacific Plumbing services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(`services/${service.slug}.html`),
        name: service.name,
      })),
    },
  ];
  return `${head({ title: "Plumbing Services in Tulsa | Pacific Plumbing", description: "Explore Pacific Plumbing services for Tulsa homes, including water heaters, re-pipes, fixtures, water lines, leaks, drains, sewer, emergencies, and gas lines.", path, prefix: "../", schema })}
  <body>
    ${nav("../")}
    <main>
      <section class="page-hero">
        <div><p class="eyebrow">Plumbing services</p><h1>Tulsa plumbing services built around clear answers.</h1><p>From urgent leaks to planned upgrades, Pacific Plumbing helps homeowners understand the problem, compare practical options, and get the work handled cleanly.</p></div>
      </section>
      <section class="section services-section">
        <div class="service-grid">${serviceCards("../", services.length)}</div>
      </section>
      ${ctaBand("../")}
    </main>
    ${footer("../")}
    <script src="../script.js?v=${scriptVersion}"></script>
  </body>
</html>`;
}

function servicePage(service) {
  const path = `services/${service.slug}.html`;
  const heroImage = service.image ?? "assets/pacific-truck-mascot.png";
  const heroImageAlt = service.imageAlt ?? "Pacific Plumbing service truck and mascot";
  const schema = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "services/" },
      { name: service.shortName, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absolute(path)}#service`,
      name: service.name,
      serviceType: service.name,
      description: service.description,
      provider: { "@id": `${site.baseUrl}/#business` },
      areaServed: site.areas.map((area) => ({ "@type": "City", name: area })),
      url: absolute(path),
    },
    faqSchema(service.faqs),
  ];
  return `${head({ title: service.title, description: service.description, path, prefix: "../", schema, ogImage: heroImage })}
  <body>
    ${nav("../")}
    <main>
      <section class="page-hero service-page-hero">
        <div>
          <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Services</a><span>/</span><span>${esc(service.shortName)}</span></nav>
          <p class="eyebrow">${esc(service.keyword)}</p>
          <h1>${esc(service.h1)}</h1>
          <p>${esc(service.intro)}</p>
          <div class="hero-actions">
            <a class="button button-primary button-large" href="${site.phoneHref}" data-track="phone_click" data-track-location="service_hero">Call ${site.phone}</a>
            <a class="button button-light button-large" href="../contact.html" data-track="booking_click" data-track-location="service_hero">Book Online</a>
          </div>
        </div>
        <div class="page-hero-image"><img src="../${heroImage}" alt="${esc(heroImageAlt)}"></div>
      </section>
      <section class="section detail-section">
        <div class="detail-main">
          <article class="content-panel">
            <h2>${esc(service.bulletsTitle)}</h2>
            <ul class="check-list">${service.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          </article>
          <article class="content-panel">
            <h2>How Pacific handles it</h2>
            <ol class="number-list">${service.process.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
          </article>
          <article class="content-panel">
            <h2>Frequently asked questions</h2>
            <div class="faq-list">${service.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
          </article>
        </div>
        <aside class="sidebar-card">
          <p class="eyebrow">Related services</p>
          <h3>Keep exploring</h3>
          <div class="related-links">${relatedServices(service, "../")}</div>
          <a class="button button-primary" href="../contact.html" data-track="booking_click" data-track-location="service_sidebar">Request Service</a>
        </aside>
      </section>
      ${ctaBand("../")}
    </main>
    ${footer("../")}
    <script src="../script.js?v=${scriptVersion}"></script>
  </body>
</html>`;
}

function supportPage(page) {
  const schema = [
    localBusinessSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.h1, path: page.path }]),
  ];
  const heroImage =
    page.type === "contact"
      ? `<div class="contact-hero-image"><img src="assets/banana-contact.png" alt="Pacific Plumbing mascot giving a thumbs up"></div>`
      : "";
  const extra = {
    areas: `<div class="area-list large">${site.areas.map((area) => `<span>${esc(area)}</span>`).join("")}</div>`,
    about: `<div class="process-grid"><article><span>01</span><h3>Memorable brand</h3><p>The campaign helps Pacific stand out in a crowded local service market.</p></article><article><span>02</span><h3>Serious service</h3><p>The site balances personality with trust, process, and practical homeowner guidance.</p></article><article><span>03</span><h3>Local growth</h3><p>The SEO structure gives Pacific room to grow into more service and city pages.</p></article></div>`,
    reviews: `<div class="reviews-widget-panel"><script type='text/javascript' src='https://reputationhub.site/reputation/assets/review-widget.js'></script><iframe class='lc_reviews_widget' src='https://reputationhub.site/reputation/widgets/review_widget/4mPRHVXqYPl9T4aDVlLP?widgetId=69f0df14597a8fdefb7e82b1' frameborder='0' scrolling='no' style='min-width: 100%; width: 100%;'></iframe></div>`,
    contact: `<form class="booking-form support-form" action="thank-you.html" method="post" data-track-form="contact_request"><label>Name<input type="text" name="name" autocomplete="name" placeholder="Your name"></label><label>Phone<input type="tel" name="phone" autocomplete="tel" placeholder="${site.phone}"></label><label>Service needed<select name="service">${services.map((service) => `<option>${esc(service.shortName)}</option>`).join("")}</select></label><button class="button button-primary button-large" type="submit" data-track="form_submit" data-track-location="contact_page">Request Service</button><p class="form-note">Demo form for the website concept. Connect this to the booking system before launch.</p></form>`,
    thankyou: `<div class="content-panel thank-you-panel"><h2>Next step</h2><p>For urgent leaks, sewer backups, or active water damage, call now instead of waiting on a form response.</p><div class="hero-actions"><a class="button button-primary button-large" href="${site.phoneHref}" data-track="phone_click" data-track-location="thank_you">Call ${site.phone}</a><a class="button button-light button-large" href="services/">View Services</a></div></div>`,
  };
  return `${head({ title: page.title, description: page.description, path: page.path, schema, noindex: page.noindex })}
  <body>
    ${nav("")}
    <main>
      <section class="page-hero">
        <div><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>${esc(page.eyebrow)}</span></nav><p class="eyebrow">${esc(page.eyebrow)}</p><h1>${esc(page.h1)}</h1><p>${esc(page.copy)}</p></div>
        ${heroImage}
      </section>
      <section class="section support-section">${extra[page.type]}</section>
      ${page.type === "contact" ? "" : ctaBand("")}
    </main>
    ${footer("")}
    <script src="script.js?v=${scriptVersion}"></script>
  </body>
</html>`;
}

function notFoundPage() {
  const schema = [
    localBusinessSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Page not found", path: "404.html" }]),
  ];
  return `${head({ title: "Page Not Found | Pacific Plumbing", description: "The Pacific Plumbing page you requested was not found. Visit our Tulsa plumbing services or contact the team for help.", path: "404.html", schema, noindex: true })}
  <body>
    ${nav("")}
    <main>
      <section class="page-hero">
        <div><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>404</span></nav><p class="eyebrow">Page not found</p><h1>This page slipped away.</h1><p>The plumbing help is still here. Head back to the service pages or contact Pacific Plumbing for the fastest next step.</p><div class="hero-actions"><a class="button button-primary button-large" href="services/">View Services</a><a class="button button-light button-large" href="contact.html">Book Online</a></div></div>
      </section>
    </main>
    ${footer("")}
    <script src="script.js?v=${scriptVersion}"></script>
  </body>
</html>`;
}

function sitemap() {
  const paths = [
    "",
    "services/",
    ...services.map((service) => `services/${service.slug}.html`),
    ...supportPages.filter((page) => !page.noindex).map((page) => page.path),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${absolute(path)}</loc><changefreq>monthly</changefreq><priority>${path === "" ? "1.0" : path.startsWith("services/") ? "0.9" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`;
}

async function main() {
  await mkdir("services", { recursive: true });
  await writeFile("index.html", homepage());
  await writeFile("services/index.html", servicesIndex());
  for (const service of services) {
    await writeFile(`services/${service.slug}.html`, servicePage(service));
  }
  for (const page of supportPages) {
    await writeFile(page.path, supportPage(page));
  }
  await writeFile("sitemap.xml", sitemap());
  await writeFile("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${absolute("sitemap.xml")}\n`);
  await writeFile("404.html", notFoundPage());
}

main();
