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
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
}

// 다크모드 토글 (선택한 테마는 localStorage에 저장)
const THEME_KEY = "theme";
const root = document.documentElement;
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // 저장할 수 없는 환경이면 이번 방문에만 적용
  }
}

function currentTheme() {
  return root.dataset.theme || (darkQuery.matches ? "dark" : "light");
}

const themeButton = document.createElement("button");
themeButton.type = "button";
themeButton.className = "theme-toggle";

function updateThemeButton() {
  const isDark = currentTheme() === "dark";
  themeButton.textContent = isDark ? "☀️" : "🌙";
  themeButton.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  themeButton.setAttribute("aria-pressed", String(isDark));
}

const savedTheme = getSavedTheme();
if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

themeButton.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  saveTheme(next);
  updateThemeButton();
});

// 저장된 선택이 없을 때는 시스템 설정 변경을 따라감
darkQuery.addEventListener("change", updateThemeButton);

updateThemeButton();
document.body.appendChild(themeButton);
