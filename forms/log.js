document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const overlay = document.getElementById("menu-overlay");
  const BODY_LOCK_CLASS = "is-locked";
  const MOBILE_BREAKPOINT = 768;

  const openMenu = () => {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    overlay.classList.add("active");
    overlay.hidden = false;
    document.body.classList.add(BODY_LOCK_CLASS);
  };

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    setTimeout(() => (overlay.hidden = true), 300);
    document.body.classList.remove(BODY_LOCK_CLASS);
  };

  // Toggle menu ao clicar no hamburger
  hamburger.addEventListener("click", () => {
    navMenu.classList.contains("active") ? closeMenu() : openMenu();
  });

  // Fecha o menu ao clicar em qualquer link
  navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  // Fecha o menu ao clicar no overlay
  overlay.addEventListener("click", closeMenu);

  // Fecha o menu ao pressionar ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  // Fecha o menu se redimensionar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) closeMenu();
  });
});
