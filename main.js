document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");
  const heroVideo = document.getElementById("heroVideo");
  const lineFloat = document.getElementById("lineFloat");

  // 年份自動更新
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 手機選單
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const opened = siteNav.classList.toggle("show");
      navToggle.classList.toggle("active", opened);
      navToggle.setAttribute("aria-expanded", String(opened));
      document.body.classList.toggle("menu-open", opened);
    });

    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("show");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // 回到頂部
  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 450);
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // hero.mp4 不存在或失效時，隱藏影片，讓 images/bg.webp 接手
  if (heroVideo) {
    const failVideo = () => heroVideo.classList.add("video-failed");
    heroVideo.addEventListener("error", failVideo);

    const source = heroVideo.querySelector("source");
    if (source) source.addEventListener("error", failVideo);
  }

  // 滾動進場效果
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // LINE 目前尚未有正式連結，避免 # 跳回頁首
  if (lineFloat && lineFloat.getAttribute("href") === "#") {
    lineFloat.addEventListener("click", event => event.preventDefault());
  }
});
