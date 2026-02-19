const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");

const navLinks = mainNav ? [...mainNav.querySelectorAll("a")] : [];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((item) => {
  item.addEventListener("click", () => {
    if (!mainNav || !menuBtn) {
      return;
    }

    mainNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && mainNav && menuBtn) {
    mainNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

function setActiveLink() {
  if (!navLinks.length || !sections.length) {
    return;
  }

  const offset = window.scrollY + 120;
  let currentId = "";

  sections.forEach((section) => {
    if (section.offsetTop <= offset) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === currentId);
  });
}

function initWorkGallery() {
  const workItems = [...document.querySelectorAll(".work-item")];

  for (const item of workItems) {
    const fileName = item.dataset.file;
    const media = item.querySelector(".work-media");

    if (!media) {
      continue;
    }

    if (fileName) {
      const imageUrl = encodeURI(`assets/work/${fileName}`);
      media.classList.remove("missing-image");
      media.style.backgroundImage = `url('${imageUrl}')`;
    }
  }
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();
initWorkGallery();

if (year) {
  year.textContent = new Date().getFullYear();
}
