const sections = document.querySelectorAll(
  "section, .background, .background2"
);
const navLinks = document.querySelectorAll(".nav-list a");

// Throttle для scroll (раз на 100мс)
let scrollTimeout = null;
window.addEventListener("scroll", () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    let current = "";
    let minDist = Infinity;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (section.id && rect.top <= 130 && Math.abs(rect.top) < minDist) {
        minDist = Math.abs(rect.top);
        current = section.id;
      }
    });
    // Додаємо цю перевірку:
    if (window.scrollY === 0) {
      current = "home";
    }
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
    scrollTimeout = null;
  }, 100);
});

// Анімація появи секцій
const animSections = document.querySelectorAll(".section-animate");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Анімуємо лише раз
      }
    });
  },
  { threshold: 0.2 }
);
animSections.forEach((sec) => observer.observe(sec));
