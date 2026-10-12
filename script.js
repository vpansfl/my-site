// 푸터의 연도를 현재 연도로 자동 갱신
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// "맨 위로" 버튼
const topButton = document.getElementById("top-button");
if (topButton) {
  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 스크롤 시 섹션이 화면에 나타나면 살짝 올라오는 애니메이션
const sections = document.querySelectorAll(".section");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
}
