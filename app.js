const app = document.getElementById("app");
const tabs = document.querySelectorAll(".nav-item");
const state = { screen: "home", stacked: 0 };
const screens = {
  home() {
    return `
      <span class="chip badge-active">TODAY</span>
      <h1 class="page-title">오늘의 모험</h1>
      <p class="body muted">아이콘이 먼저 보이고, 글자는 짧게 위계만 맡아요.</p>
      <section class="card banner routine-morning">
        <small>칭찬 배너</small>
        <h2 class="heading">잘하고 있어요</h2>
      </section>
      <div class="card-grid">
        <button class="routine-card routine-morning" data-go="play" type="button">
          <div class="ico">☀</div>
          <div><strong class="card-title">아침 인사</strong><span class="description">Morning · 블록 쌍기</span></div>
        </button>
        <button class="routine-card routine-theme" data-go="play" type="button">
          <div class="ico">◎</div>
          <div><strong class="card-title">오늘의 주제</strong><span class="description">Theme · 색깔 찾기</span></div>
        </button>
        <button class="routine-card routine-dinner" data-go="play" type="button">
          <div class="ico">▣</div>
          <div><strong class="card-title">저녁 놀이</strong><span class="description">Dinner · 세 개 쌍기</span></div>
        </button>
        <button class="routine-card routine-bedtime" data-go="praise" type="button">
          <div class="ico">★</div>
          <div><strong class="card-title">잠자리 칭찬</strong><span class="description">Bedtime · 오늘 마무리</span></div>
        </button>
      </div>`;
  },
  play() {
    const n = state.stacked;
    const colors = ["var(--kids-butter)", "var(--kids-coral)", "var(--kids-mint)"];
    const blocks = [0,1,2].map((i) => {
      const on = i < n ? " on" : "";
      const bg = i < n ? colors[i] : "var(--kids-white)";
      return `<div class="block${on}" style="background:${bg}"></div>`;
    }).join("");
    return `
      <span class="chip">PLAY</span>
      <h1 class="page-title">블록을 쌍아볼까요?</h1>
      <p class="progress">${n} / 3 완료</p>
      <div class="progress-track" style="height:10px"><div class="progress-fill" style="height:10px;width:${(n/3)*100}%"></div></div>
      <p class="body muted">한 화면에 액션은 코랄 버튼 하나예요.</p>
      <div class="blocks">${blocks}</div>
      <div class="actions">
        ${n >= 3
          ? `<button class="btn-success success-action" data-go="praise" type="button">완료했어요</button>`
          : `<button class="btn-primary cta-primary" data-stack type="button">하나 더 쌍기</button>`}
        <button class="btn-secondary" data-go="home" type="button">홈으로</button>
      </div>`;
  },
  praise() {
    return `
      <span class="chip badge-success">PRAISE</span>
      <section class="card banner routine-morning">
        <small>칭찬 배너</small>
        <h2 class="heading">정말 잘했어요</h2>
      </section>
      <p class="body muted">버터 옐로우는 칭찬과 시작, 민트는 완료 신호로만 써요.</p>
      <div class="actions">
        <button class="btn-primary cta-primary" data-go="play" type="button">한번 더</button>
        <button class="btn-secondary" data-go="home" type="button">홈으로</button>
      </div>`;
  }
};
function render(name) {
  state.screen = name;
  app.innerHTML = screens[name]();
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.go === name));
}
document.body.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (go) {
    if (go.dataset.go === "play" && state.screen !== "play") state.stacked = 0;
    render(go.dataset.go);
    return;
  }
  if (e.target.closest("[data-stack]")) {
    state.stacked = Math.min(3, state.stacked + 1);
    render("play");
  }
});
const start = (location.hash || "#home").replace("#", "");
render(["home", "play", "praise"].includes(start) ? start : "home");
