const topbar = document.querySelector(".topbar");
const topbarTop = document.querySelector(".topbar__top");
const topbarBottom = document.querySelector(".topbar__bottom");
const nav = document.querySelector(".topbar__bottom-rights");
const consult = document.querySelector(".topbar__bottom-consult");
const overlay = document.querySelector(".page__overlay");
const lgMediaQuery = window.matchMedia("(min-width: 992px)");

const menuBtn = document.querySelector(".topbar__hamburger-wrapper");
const menuHamburger = document.querySelector(".topbar__hamburger");
// const content = document.querySelector(".content");

let lastScrollTop = 0;
window.addEventListener(
  "scroll",
  function () {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if(lgMediaQuery.matches === true) {
      document.body.classList.toggle('scrolled', currentScrollTop > 0);
    }
  },
  false
);

// de\activate the menu
menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  menuBtn.classList.toggle("topbar__hamburger-wrapper--activate");
  menuHamburger.classList.toggle("animate");
  nav.classList.toggle("topbar__bottom-rights--active");
  overlay.classList.toggle("page__overlay--active");
  // content.classList.toggle("content-active");
  document.body.classList.toggle("no-scroll");
  document.querySelector("html").classList.toggle("no-scroll");
});
