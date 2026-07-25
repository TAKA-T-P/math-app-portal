"use strict";

/**
 * KEC数学科ラボ - アプリ情報一覧
 *
 * 新しいアプリを追加するときは、この配列に1件オブジェクトを追加するだけでOKです。
 * 表示順は配列の並び順（category が同じもの同士）で決まります。
 *
 * category の値:
 *   "elementary"    小学生向け
 *   "juniorhigh"    中学生向け
 * 今後、"all"（小中学生共通）, "teacher"（講師向け）,
 * "new"（新着）, "developing"（開発中）なども追加できます。
 * ただし、画面に表示するには対応するセクション（コンテナ）が index.html 側に必要です。
 */
const apps = [
  {
    id: "space-calculation",
    category: "elementary",
    title: "スペース計算ラリー",
    subtitle: "",
    grades: "小学1年生〜中学1年生",
    catchphrase: "計算の力でUFOを撃退せよ！",
    description:
      "たし算・ひき算・かけ算・わり算・小数・分数など、いろいろな計算を練習できます。正しい答えを選んでUFOをたおし、宇宙計算マスターを目指そう！",
    tags: ["計算練習", "小数・分数", "1分・3分チャレンジ"],
    icon: "🚀",
    url: "https://taka-t-p.github.io/space-calculation-game/",
    theme: "space",
  },
  {
    id: "math-word-problem",
    category: "elementary",
    title: "文章題クエスト！",
    subtitle: "",
    grades: "小学4年生〜小学6年生",
    catchphrase: "式をつくって、エネミーをたおそう！",
    description:
      "文章題を読んで、数字や記号のカードを組み合わせて式をつくるゲームです。むずかしい計算はしなくてOK！問題に合った正しい式を考える力を身につけよう！",
    tags: ["文章題", "式を立てる練習", "学年・学期別"],
    icon: "⚔️",
    url: "https://taka-t-p.github.io/math-word-problem/",
    theme: "wordproblem",
  },
  {
    id: "factorization-game",
    category: "juniorhigh",
    title: "因数×展開 FIGHT!",
    subtitle: "",
    grades: "中学3年生",
    catchphrase: "展開・因数分解をすばやく見抜け！",
    description:
      "展開・因数分解・平方根の問題に、1分または3分で挑戦するゲームです。正解を続けてコンボをつなぎ、ハイスコアと上の段位を目指そう！",
    tags: ["展開", "因数分解", "平方根"],
    icon: "🥊",
    url: "https://taka-t-p.github.io/Factorization-game/",
    theme: "factorization",
  },
  {
    id: "linear-connect",
    category: "juniorhigh",
    title: "リニア×コネクト！",
    subtitle: "",
    grades: "中学1年生・中学2年生",
    catchphrase: "式とグラフをつなげよう！",
    description:
      "比例や一次関数の式とグラフの関係を練習するゲームです。式に合うグラフをかいたり、グラフから式を読み取ったりして、関数マスターを目指そう！",
    tags: ["比例", "一次関数", "グラフ"],
    icon: "📈",
    url: "https://taka-t-p.github.io/linear-connect/",
    theme: "linear",
  },
  {
    id: "equal-labyrinth",
    category: "juniorhigh",
    title: "イコール・ラビリンス",
    subtitle: "〜方程式の迷宮〜",
    grades: "中学1年生〜中学3年生",
    catchphrase: "文章を読んで、正しい方程式を立てよう！",
    description:
      "文章題を読んで、問題に合った方程式をつくるゲームです。1次方程式・連立方程式・2次方程式を練習し、迷宮を攻略しよう！",
    tags: ["1次方程式", "連立方程式", "2次方程式"],
    icon: "🏰",
    url: "https://taka-t-p.github.io/equal-labyrinth/",
    theme: "labyrinth",
  },
];

// category と、カードを挿入するコンテナ要素の id の対応表
const CATEGORY_CONTAINER_IDS = {
  elementary: "elementary-apps",
  juniorhigh: "juniorhigh-apps",
};

/**
 * 1件のアプリ情報から、安全なDOM操作でカード要素を作成する。
 */
function createAppCard(app, index) {
  const card = document.createElement("article");
  card.className = "app-card";
  card.dataset.theme = app.theme || "";
  card.style.animationDelay = `${Math.min(index, 8) * 0.08}s`;

  // ヘッダー（アイコン＋対象学年＋タイトル＋サブタイトル）
  const header = document.createElement("div");
  header.className = "app-card-header";

  const icon = document.createElement("span");
  icon.className = "app-icon";
  icon.textContent = app.icon || "🧮";
  icon.setAttribute("aria-hidden", "true");
  header.appendChild(icon);

  const headingGroup = document.createElement("div");
  headingGroup.className = "app-heading-group";

  if (app.grades) {
    const grades = document.createElement("span");
    grades.className = "app-grades";
    grades.textContent = app.grades;
    headingGroup.appendChild(grades);
  }

  const title = document.createElement("h3");
  title.className = "app-title";
  title.textContent = app.title;
  headingGroup.appendChild(title);

  if (app.subtitle) {
    const subtitle = document.createElement("p");
    subtitle.className = "app-subtitle";
    subtitle.textContent = app.subtitle;
    headingGroup.appendChild(subtitle);
  }

  header.appendChild(headingGroup);
  card.appendChild(header);

  // キャッチコピー
  const catchphrase = document.createElement("p");
  catchphrase.className = "app-catchphrase";
  catchphrase.textContent = app.catchphrase || "";
  card.appendChild(catchphrase);

  // 説明文
  const description = document.createElement("p");
  description.className = "app-description";
  description.textContent = app.description || "";
  card.appendChild(description);

  // 特徴タグ
  if (Array.isArray(app.tags) && app.tags.length > 0) {
    const tagList = document.createElement("ul");
    tagList.className = "app-tags";
    app.tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.className = "app-tag";
      tagItem.textContent = tag;
      tagList.appendChild(tagItem);
    });
    card.appendChild(tagList);
  }

  // 開くボタン（通常のリンク＝現在のタブでの遷移。target属性は付けない）
  const cta = document.createElement("a");
  cta.className = "app-cta";
  cta.href = app.url;
  cta.setAttribute("aria-label", `${app.title}を開く`);
  cta.textContent = "ゲームをはじめる";

  const arrow = document.createElement("span");
  arrow.className = "cta-arrow";
  arrow.textContent = "→";
  arrow.setAttribute("aria-hidden", "true");
  cta.appendChild(arrow);

  card.appendChild(cta);

  return card;
}

/**
 * データ不足・不正なアプリ情報の場合に表示するエラーカードを作成する。
 */
function createErrorCard(message) {
  const errorEl = document.createElement("div");
  errorEl.className = "card-error";
  errorEl.textContent = message;
  return errorEl;
}

/**
 * 最低限必要な項目が揃っているか確認する。
 */
function isValidApp(app) {
  return (
    app &&
    typeof app.title === "string" &&
    app.title.trim() !== "" &&
    typeof app.url === "string" &&
    app.url.trim() !== "" &&
    typeof app.category === "string" &&
    CATEGORY_CONTAINER_IDS[app.category]
  );
}

function renderApps() {
  const containers = {};
  Object.keys(CATEGORY_CONTAINER_IDS).forEach((category) => {
    containers[category] = document.getElementById(
      CATEGORY_CONTAINER_IDS[category]
    );
  });

  if (!Array.isArray(apps) || apps.length === 0) {
    Object.values(containers).forEach((container) => {
      if (container) {
        container.appendChild(
          createErrorCard("現在表示できるアプリがありません。")
        );
      }
    });
    return;
  }

  let renderIndex = 0;

  apps.forEach((app) => {
    if (!isValidApp(app)) {
      console.warn("アプリ情報が不足しているため表示をスキップしました。", app);
      return;
    }

    const container = containers[app.category];
    if (!container) {
      console.warn(
        `category "${app.category}" に対応する表示欄が見つかりません。`,
        app
      );
      return;
    }

    container.appendChild(createAppCard(app, renderIndex));
    renderIndex += 1;
  });
}

document.addEventListener("DOMContentLoaded", renderApps);
