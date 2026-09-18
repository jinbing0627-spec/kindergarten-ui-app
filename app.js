const routines = [
  {
    id: "morning",
    title: "아침 노래",
    en: "Morning Song",
    min: 20,
    img: "https://soundsfun-bridge.huryoonsoo.chatgpt.site/chick.png",
    c: "#F4BC16",
    p: "#FFF2A8",
    desc: "등원 준비를 하며 신나는 아침 인사를 들어요",
    prompt: "Good morning! Are you ready?",
  },
  {
    id: "theme",
    title: "오늘의 주제",
    en: "Theme Time",
    min: 30,
    img: "https://soundsfun-bridge.huryoonsoo.chatgpt.site/crocodile.png",
    c: "#20AFA3",
    p: "#BFEFE7",
    desc: "이번 주 색깔 단어를 보고 듣고 따라 말해요",
    prompt: "What color is it? It’s red!",
  },
  {
    id: "dinner",
    title: "저녁 노래",
    en: "Dinner Song",
    min: 20,
    img: "https://soundsfun-bridge.huryoonsoo.chatgpt.site/cat.png",
    c: "#F34E67",
    p: "#FFD0D7",
    desc: "식사 시간에 음식과 행동 표현을 자연스럽게 들어요",
    prompt: "Let’s get ready for dinner time.",
  },
  {
    id: "bedtime",
    title: "잠자리 이야기",
    en: "Bedtime Story",
    min: 20,
    img: "https://soundsfun-bridge.huryoonsoo.chatgpt.site/rabbit.png",
    c: "#B64FE0",
    p: "#EBC5FA",
    desc: "불을 낮추고 편안하게 영어 이야기를 들어요",
    prompt: "Which color do you like?",
  },
];
let state = {
  tab: "today",
  done: JSON.parse(localStorage.getItem("sf-done") || "[]"),
  period: "today",
  popup: null,
  playing: false,
  sec: 0,
  splash: true,
};
let timer;
const $ = (s) => document.querySelector(s);
const img = (r, cl = "") => `<img class="${cl}" src="${r.img}" alt="">`;
function navIcon(id) {
  const paths = {
    today: '<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    journey: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    parent: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.07 14H3v-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63 1.7 1.7 0 0 0 10.07 3H14a1.7 1.7 0 0 0 1.03 1.63 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9 1.7 1.7 0 0 0 21 10.07V14a1.7 1.7 0 0 0-1.6 1z"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[id]}</svg>`;
}
function nav() {
  return `<nav>${[
    ["today", "오늘"],
    ["journey", "소리여행"],
    ["parent", "부모"],
    ["settings", "설정"],
  ]
    .map(
      (x) =>
        `<button data-tab="${x[0]}" class="${state.tab === x[0] ? "on" : ""}">${navIcon(x[0])}<span>${x[1]}</span></button>`,
    )
    .join("")}</nav>`;
}
function today() {
  let mins = routines
      .filter((r) => state.done.includes(r.id))
      .reduce((a, r) => a + r.min, 0),
    pc = Math.round((mins / 90) * 100);
  return `<header><img src="https://soundsfun-bridge.huryoonsoo.chatgpt.site/soundsfun-logo.png"><button>하이</button></header><p class="eyebrow">TODAY'S SOUNDSFUN</p><h1>오늘도 소리로 놀아볼까?</h1><section class="hero"><span>WEEK 1 · COLORS</span><h2>듣고, 찾고,<br>색깔을 말해요</h2><p>48주 여행의 첫 번째 주예요</p><div class="cast">${routines.map((r) => img(r)).join("")}</div><div class="progress"><b>오늘 ${mins}분</b><b>${pc}%</b><i><em style="width:${pc}%"></em></i></div></section><div class="heading"><div><p class="eyebrow">TODAY'S ROUTINE</p><h2>오늘의 소리 놀이</h2></div><b>${state.done.length}/4 완료</b></div><div class="day"><i></i><span>DAY 1</span><b>오늘 · 9/18 (금)</b><i></i></div><div class="routine-list">${routines.map((r, i) => `<button class="routine" data-routine="${r.id}" style="--c:${r.c};--p:${r.p}"><u>${i + 1}</u>${img(r)}<span><small>◷ ${r.min}분</small><strong>${r.title}</strong><em>${r.en}</em></span><b>${state.done.includes(r.id) ? "✓" : "▶"}</b></button>`).join("")}</div>${[2, 3, 4].map((d) => `<section class="future"><div class="day"><i></i><span>DAY ${d}</span><b>${d === 2 ? "내일" : d - 1 + "일 후"}</b><i></i></div>${routines.map((r) => `<div>${img(r)}<span><b>${r.title}</b><small>${r.min}분</small></span><i></i></div>`).join("")}</section>`).join("")}`;
}
function journey() {
  let pc = state.done.length * 25;
  let stages = [
    [
      "W1–12",
      "LISTEN",
      "Colors · Family · Shapes · Clothes",
      "매일 90분 소리 루틴 만들기",
      "#F1BE25",
    ],
    [
      "W13–24",
      "LISTEN + PLAY",
      "School · Body Parts · Animals · Food",
      "음소인식 1–2단계 + SoundsFun 1",
      "#39B6A8",
    ],
    [
      "W25–36",
      "LISTEN + READ",
      "Feelings · Nature · Opposites · Weather",
      "음소인식 3–4단계 + English Library",
      "#A85BD7",
    ],
    [
      "W37–48",
      "LISTEN + CONNECT",
      "Numbers · Transportation · Jobs · Seasons",
      "음소인식 5–6단계 + Linking to Letters",
      "#F05C72",
    ],
  ];
  return `<p class="eyebrow">48-WEEK JOURNEY</p><h1>소리에서 읽기까지</h1><p class="lead">매일 같은 90분 루틴 위에 12주마다 새로운 힘을 더해요.</p><section class="week"><div><small>WEEK 1 · 지금 여행 중</small><strong>Colors</strong><b>오늘 ${pc}% 완료</b></div><img src="chick.png"></section><section class="activity"><div><small>이번 주 소리활동</small><strong>색깔을 듣고, 찾고, 말해요</strong><p>red · yellow · green · blue</p></div><button data-routine="theme">▶ 시작</button></section><div class="days">${["월", "화", "수", "목", "금", "토", "일"].map((d, i) => `<div class="${i < 2 ? "done" : i === 2 ? "now" : ""}"><b>${i < 2 ? "★" : i === 2 ? state.done.length : ""}</b><small>${d}</small></div>`).join("")}</div><div class="stages">${stages.map((s, i) => `<article style="--c:${s[4]}" class="${i === 0 ? "current" : ""}"><i>${i === 0 ? "1" : "•"}</i><div><small>${s[0]}</small><strong>${s[1]}</strong><b>${s[2]}</b><p>${s[3]}</p></div>${i === 0 ? "<em>NOW</em>" : ""}</article>`).join("")}</div><section class="preview"><small>WEEK 13 PREVIEW</small><h3>어떤 두 단어가 같은 소리로 끝날까요?</h3><div><button>cat + hat</button><button>cat + sun</button></div></section>`;
}
function parent() {
  let mins = routines
    .filter((r) => state.done.includes(r.id))
    .reduce((a, r) => a + r.min, 0);
  return `<p class="eyebrow">PARENT REPORT</p><h1>하이의 기록</h1><div class="stats">${[
    ["오늘 소리노출", mins + " / 90분"],
    ["연속", "🔥 2일"],
    ["이번 주 루틴", "5 / 24"],
    ["총 소리노출", "1시간 0분"],
  ]
    .map((x) => `<article><small>${x[0]}</small><b>${x[1]}</b></article>`)
    .join("")}</div><div class="tabs">${[
    ["today", "오늘"],
    ["week", "주간"],
    ["month", "월간"],
  ]
    .map(
      (x) =>
        `<button data-period="${x[0]}" class="${state.period === x[0] ? "on" : ""}">${x[1]}</button>`,
    )
    .join("")}</div>${report()}${summary()}${stickers()}`;
}
function report() {
  if (state.period === "today")
    return `<section class="card"><h2>오늘의 루틴</h2>${routines.map((r) => `<div class="report">${img(r)}<span><b>${r.title}</b><small>${state.done.includes(r.id) ? "앱에서 완료" : "아직"}</small></span><i>${state.done.includes(r.id) ? "✓" : ""}</i></div>`).join("")}</section>`;
  if (state.period === "month")
    return `<section class="card"><h2>2026년 9월</h2><div class="calendar">${["월", "화", "수", "목", "금", "토", "일", ...Array.from({ length: 30 }, (_, i) => i + 1)].map((d, i) => `<span class="${i === 22 ? "success" : i === 24 ? "today" : ""}">${d}</span>`).join("")}</div></section>`;
  return `<section class="card"><h2>9/14 (월) ~ 9/20 (일)</h2><div class="grid">${routines.map((r, i) => `<b>${r.title.slice(0, 2)}</b>${Array.from({ length: 7 }, (_, d) => `<i class="${d < 3 - i ? "fill" : ""}" style="--c:${r.c}">${d < 2 ? "✓" : ""}</i>`).join("")}`).join("")}</div></section>`;
}
function summary() {
  return `<section class="card"><h2>이번 주 한눈에</h2>${routines.map((r, i) => `<div class="sum">${img(r)}<i><em style="width:${[66, 33, 33, 33][i]}%;background:${r.c}"></em></i><small>${["2/3", "1/3", "1/3", "1/3"][i]}</small></div>`).join("")}</section>`;
}
function stickers() {
  return `<section class="card"><h2>모은 스티커</h2><div class="stickers">${Array.from({ length: 21 }, (_, i) => `<i class="${i < 5 ? "earned" : ""}">${i < 5 ? "★" : ""}</i>`).join("")}</div><small>5 / 28</small></section>`;
}
function settings() {
  return `<p class="eyebrow">SETTINGS</p><h1>설정</h1>${[
    "학습 설정|🔔 소리놀이 알림|아침·저녁·잠자리 시간을 알려드려요|👤 아이 정보|이름, 연령, 학습 시작일",
    "안내|▣ 소리노출 가이드||? 자주 묻는 질문||✦ 앱 소개 다시 보기||✧ 도움말 다시 보기||✉ 문의하기|",
    "계정|✉ 계정 이메일||↪ 로그아웃||🗑 데이터 모두 삭제하고 탈퇴|",
  ]
    .map((g) => {
      let a = g.split("|"),
        title = a.shift();
      let rows = "";
      for (let i = 0; i < a.length; i += 2)
        rows += `<button><b>${a[i]}</b>${a[i + 1] ? `<small>${a[i + 1]}</small>` : ""}<em>›</em></button>`;
      return `<h3>${title}</h3><section class="settings">${rows}</section>`;
    })
    .join("")}<footer>버전 0.2.0 · Week 1<br><u>개인정보처리방침</u></footer>`;
}
function popup() {
  let r = routines.find((x) => x.id === state.popup);
  return r
    ? `<div class="shade" data-close="1"><section class="sheet"><i></i><button class="close" data-close="1">×</button><div class="player-head"><div style="background:${r.p}">${img(r)}</div><span><small style="color:${r.c}">${r.en.toUpperCase()}</small><h2>${r.title}</h2><p>${r.desc}</p></span></div><article><small>오늘의 한 문장</small><b>${r.prompt}</b></article><div class="timer"><b>00:${String(state.sec).padStart(2, "0")}</b><b>${r.min}:00</b></div><i class="track"></i><button class="play" style="background:${r.c}">${state.playing ? "Ⅱ 잠시 멈추기" : "▶ 소리 놀이 시작"}</button><button class="complete" data-complete="${r.id}">✓ 오늘 완료했어요</button></section></div>`
    : "";
}
function splash() {
  return `<div class="splash" data-start="1"><img src="https://soundsfun-bridge.huryoonsoo.chatgpt.site/soundsfun-intro.png"><button>화면을 눌러 시작해요</button></div>`;
}
function render() {
  let v =
    state.tab === "today"
      ? today()
      : state.tab === "journey"
        ? journey()
        : state.tab === "parent"
          ? parent()
          : settings();
  $("#app").innerHTML =
    `<div class="phone"><div class="scroll">${v}</div>${nav()}${popup()}${state.splash ? splash() : ""}</div>`;
  bind();
}
function bind() {
  $$("[data-tab]").forEach(
    (b) =>
      (b.onclick = () => {
        state.tab = b.dataset.tab;
        render();
      }),
  );
  $$("[data-routine]").forEach(
    (b) =>
      (b.onclick = () => {
        state.popup = b.dataset.routine;
        state.playing = false;
        state.sec = 0;
        render();
      }),
  );
  $$("[data-period]").forEach(
    (b) =>
      (b.onclick = () => {
        state.period = b.dataset.period;
        render();
      }),
  );
  $$("[data-close]").forEach(
    (b) =>
      (b.onclick = (e) => {
        if (e.target.dataset.close) {
          state.popup = null;
          state.playing = false;
          clearInterval(timer);
          render();
        }
      }),
  );
  let p = $(".play");
  if (p)
    p.onclick = () => {
      state.playing = !state.playing;
      clearInterval(timer);
      if (state.playing)
        timer = setInterval(() => {
          state.sec++;
          render();
        }, 1000);
      render();
    };
  let c = $("[data-complete]");
  if (c)
    c.onclick = () => {
      if (!state.done.includes(c.dataset.complete))
        state.done.push(c.dataset.complete);
      localStorage.setItem("sf-done", JSON.stringify(state.done));
      state.popup = null;
      state.playing = false;
      clearInterval(timer);
      render();
    };
  let s = $("[data-start]");
  if (s)
    s.onclick = () => {
      state.splash = false;
      render();
    };
}
function $$(s) {
  return [...document.querySelectorAll(s)];
}
render();
