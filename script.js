/ --- Centralized Config ---
const CONFIG = {
  businessName: "MoM & PoP",
  phone: "18135551234",
  address: "Tampa, FL",
  email: 'hello@yourbusiness.com',
  linkedin: '#https://www.linkedin.com',
  instagram: '#https://www.instagram.com',
  facebook: '#https://www.facebook.com',
  mapQuery: "Tampa",
  themeDefault: "light",

};

// --- DOM Elements ---
const toggleBtn = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("themeToggle");

const htmlElement = document.documentElement;

const hero = document.querySelector(".hero");
const glow = document.querySelector(".hero-glow");

const contactForm = document.querySelector(".contact-form");

const currentYear = document.getElementById(".current-year");

// Auto Year Update
document.getElementById("current-year").textContent = new Date().getFullYear();

// --- Theme Logic ---
const savedTheme =
  localStorage.getItem("theme") || CONFIG.themeDefault;

htmlElement.setAttribute("data-theme", savedTheme);

updateToggleIcon(savedTheme);

// Prevent transition flash on load
window.addEventListener("load", () => {
  document.body.classList.add("theme-loaded");
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme =
      htmlElement.getAttribute("data-theme");

    const newTheme =
      currentTheme === "light" ? "dark" : "light";

    htmlElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    updateToggleIcon(newTheme);
  });
}

function updateToggleIcon(theme) {
  const dot = document.querySelector(".theme-dot");

  if (!dot) return;

  dot.style.transform =
    theme === "dark" ? "scale(1.6)" : "scale(1)";
}

// --- Mobile Menu ---
if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    toggleBtn.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      toggleBtn.classList.remove("active");
    });
  });
}

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (
    navLinks &&
    toggleBtn &&
    !navLinks.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    navLinks.classList.remove("active");
    toggleBtn.classList.remove("active");
  }
});

// Escape key closes menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks) {
    navLinks.classList.remove("active");

    if (toggleBtn) {
      toggleBtn.classList.remove("active");
    }
  }
});

// --- Hero Glow Effect ---
if (hero && glow) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
  });
}

// --- Info Bar ---
const infoBar = document.getElementById("info-bar");
const infoClose = document.getElementById("info-close");

if (infoBar && localStorage.getItem("infoBarClosed") === "true") {
  infoBar.classList.add("hidden");
}

if (infoClose && infoBar) {
  infoClose.addEventListener("click", () => {
    infoBar.classList.add("hidden");

    localStorage.setItem("infoBarClosed", "true");
  });
}

// --- Inject Dynamic Content ---
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.href = `tel:${CONFIG.phone}`;
});

document.querySelectorAll("[data-business='name']").forEach((el) => {
  el.textContent = CONFIG.businessName;
});

document.querySelectorAll("[data-address]").forEach((el) => {
  el.textContent = CONFIG.address;
});

// --- Map iframe ---
const mapFrame = document.querySelector(".map iframe");

if (mapFrame) {
  mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(
    CONFIG.mapQuery
  )}&output=embed`;
}

// --- Scroll Navbar ---
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  const currentScroll = window.scrollY;

  // Add blur / shadow
  if (currentScroll > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide / show navbar
  const scrollThreshold = 10;

  if (
    currentScroll > lastScroll + scrollThreshold &&
    currentScroll > 100
  ) {
    navbar.style.transform = "translateY(-100%)";
  } else if (currentScroll < lastScroll - scrollThreshold) {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

// --- Animate on Scroll ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document
  .querySelectorAll(
    ".service-card, .review-card, .section-header, .quick-info, .contact-form-container"
  )
  .forEach((el) => observer.observe(el));

// --- Button Ripple Effect ---
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");

    const diameter = Math.max(
      this.clientWidth,
      this.clientHeight
    );

    const radius = diameter / 2;

    const rect = this.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;

    circle.style.left = `${e.clientX - rect.left - radius}px`;

    circle.style.top = `${e.clientY - rect.top - radius}px`;

    circle.classList.add("ripple");

    const ripple = this.querySelector(".ripple");

    if (ripple) {
      ripple.remove();
    }

    this.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  });
});

// --- Contact Form ---
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn =
      contactForm.querySelector("button[type='submit']");

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    const data = {
      name: document.getElementById("name")?.value || "",
      email: document.getElementById("email")?.value || "",
      business: document.getElementById("business")?.value || "",
      message: document.getElementById("message")?.value || "",
    };

    try {
      // Temporary simulation
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      console.log("Form Submitted:", data);

      contactForm.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem;">
          <h3 style="margin-bottom: 1rem;">
            ✅ Inquiry Sent
          </h3>

          <p>
            We'll reach out shortly to discuss your business goals.
          </p>
        </div>
      `;
    } catch (err) {
      console.error(err);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Try Again";
      }
    }
  });
}