export type Setup = {
  id: string;
  owner: string;
  racket: string;
  string: string;
  gauge?: string;
  tension?: string;
  role?: string;
  details?: string[];
  measurements?: { label: string; value: string; condition?: string }[];
};

export type Comparison = {
  id: string;
  title: string;
  date?: string;
  base: string;
  target: string;
  items: { category: string; name: string; score: "--" | "-" | "." | "+" | "++"; note?: string }[];
  note?: string;
  status?: string;
};

export const setups: Setup[] = [
  {
    id: "heigo-radical-ht130",
    owner: "平吾",
    racket: "HEAD Radical MP 2025",
    string: "HEAD HAWK TOUCH",
    gauge: "1.30 mm",
    tension: "47 / 45 lb",
    role: "オールラウンド",
    details: ["Wet Super Grip（白）", "VibeCut ダンパー", "最新の加重状態：フレーム先端寄りに1.5 g × 2、グリップ上部に2 g", "2026-11-08時点で加重位置を調整後、良好な状態として調整を一旦停止"],
    measurements: [
      { label: "重量", value: "326.7 g", condition: "最新記録。測定条件の詳細は未記録" },
      { label: "バランス", value: "320 mm", condition: "最新記録" },
      { label: "SW", value: "306.0", condition: "最新記録" },
      { label: "PSW", value: "317.0", condition: "最新記録" }
    ]
  },
  {
    id: "heigo-radical-ht115",
    owner: "平吾",
    racket: "HEAD Radical MP 2025",
    string: "HEAD HAWK TOUCH",
    gauge: "1.15 mm",
    tension: "47 / 45 lb",
    role: "過去セットアップ",
    details: ["飛距離・ボールスピードが不足し、ユーザーは「HTは使えない」と評価。"]
  },
  {
    id: "heigo-radical-ht130",
    owner: "平吾",
    racket: "HEAD Radical MP 2025",
    string: "HEAD HAWK TOUCH Anthracite",
    gauge: "1.30 mm",
    tension: "47 / 45 lb",
    role: "過去セットアップ",
    details: ["約1.5時間使用時点で「マットレス」のような感触。飛び・コントロールが不足し、サーブがやや遅いとの報告。"]
  },
  {
    id: "heiji-gravity-lynxtour",
    owner: "平次",
    racket: "HEAD Gravity MP L 2023",
    string: "HEAD Lynx Tour",
    gauge: "1.25 mm",
    tension: "42 / 40 lb",
    role: "最新の確認済みセットアップ",
    details: ["Wet Super Strong Grip（黒）", "ダンパーなし", "2026-10-24時点の現行セットアップとして記録", "最新の加重状態：フレーム先端寄りに1.5 g × 2。2026-11-08時点で良好な状態として調整を一旦停止"],
    measurements: [
      { label: "重量", value: "312.3 g", condition: "最新記録。測定条件の詳細は未記録" },
      { label: "バランス", value: "336 mm", condition: "最新記録" },
      { label: "SW", value: "313.5", condition: "最新記録" },
      { label: "PSW", value: "315.1", condition: "最新記録" }
    ]
  },
  {
    id: "heiji-gravity-conf",
    owner: "平次",
    racket: "HEAD Gravity MP L 2023",
    string: "Solinco Confidential",
    gauge: "1.15 mm",
    tension: "42 / 40 lb",
    role: "過去セットアップ",
    details: ["2025-06-12張り上げとの記録", "低い打ち出し角・少ないアシスト。ラインをコントロールしやすい。", "ALU × NXT より好み。", "約13.5時間使用時点では明確な性能低下を感じなかったとの記録。別記録に約6か月・約50時間使用後の比較もあり、同一時点とは断定しない。"]
  }
];

export const comparisons: Comparison[] = [
  {
    id: "confidential-lynxtour",
    title: "Confidential → Lynx Tour",
    date: "2026-10-24",
    base: "heiji-gravity-conf",
    target: "heiji-gravity-lynxtour",
    items: [
      { category: "打球特性", name: "飛び", score: "+" },
      { category: "打球特性", name: "コントロール", score: "." },
      { category: "打球特性", name: "スピン", score: "+" },
      { category: "打球感", name: "柔らかさ", score: "." },
      { category: "トップスピン", name: "左右のズレ", score: "+", note: "約2 mとの報告" },
      { category: "トップスピン", name: "奥行き", score: "+" }
    ],
    note: "比較元のConfidentialは約6か月・約50時間使用後だった可能性があり、新品同士の比較ではない。ユーザー自身が比較バイアスの可能性を指摘。"
  },
  {
    id: "heigo-hawk115-130",
    title: "HAWK TOUCH 1.15 → 1.30 mm",
    base: "heigo-radical-ht115",
    target: "heigo-radical-ht130",
    items: [
      { category: "打球特性", name: "飛び", score: "+" },
      { category: "打球特性", name: "コントロール", score: "." },
      { category: "打球特性", name: "スピン", score: "." },
      { category: "打球感", name: "柔らかさ", score: "." }
    ],
    note: "いずれも47 / 45 lb。比較時の加重条件など、詳細は未確認。"
  },

];

export const otherRecords = [
  {
    title: "平吾：過去の実測・測定記録",
    rows: [
      ["2026年7月・初期素状態", "300 g / 320 mm / SW 311.7", "ユーザーが7月実測として確認"],
      ["2026-07-29として記録された値", "298.4 g / 315 mm / SW 273.5 / PSW 289.3", "グリップ等を装着していない状態との整理。測定対象・条件の原文照合が必要"],
      ["左右重量", "左 72.2 g / 右 73.5 g", "合計重量との関係は不明"],
      ["OG・ダンパー装着状態", "318.7 g / 323 mm / SW 301.5 または 311.7", "SWの2値の意味・測定条件が不明"],
      ["グリップエンド付近 +3 g 後", "301.4 g / 約312 mm / 約273.8 SW", "2026-09-24の過去アシスタント出力に基づく。ユーザー再承認未確認"]
    ]
  },
  {
    title: "平次：過去の実測・測定記録",
    rows: [
      ["2026年7月・初期素状態", "280 g / 325 mm / SW 303.9", "ユーザーが7月実測として確認"],
      ["Confidential装着時の完成状態", "303.8 g / 332 mm / SW 297.5 / PSW 303.9", "過去の完成状態記録。測定条件は要照合"],
      ["加重 +1.5 g（3時・9時）", "SW 308.6", "基準状態・測定条件は要照合"],
      ["加重 +3.0 g（3時・9時）", "SW 310.9", "基準状態・測定条件は要照合"],
      ["加重 +3.0 g（2時・10時）", "SW 316.9", "基準状態・測定条件は要照合"],
      ["加重 +3.5 g（3:30・9:30）", "SW 315.5", "基準状態・測定条件は要照合"]
    ]
  },
  {
    title: "平吾：フレーム・チューニングに関する記録",
    rows: [
      ["+1.5 g 加重", "コントロール・着地点が最も良かった", "正確な貼付位置は要照合"],
      ["+0.75 g × 2", "リラックスして振れるが、ラリー寄り", "2:30 / 9:30との記録あり。原文要照合"],
      ["+4 g", "コーチの「軽すぎる」との指摘を受けて検討", "実施済みではない"],
      ["最新の加重", "先端寄りに1.5 g × 2、グリップ上部に2 g", "2026-11-08時点で良好として調整停止"]
    ]
  }
];

export const scaleLegend = [
  { score: "--", label: "明確に弱くなった" },
  { score: "-", label: "少し弱くなった" },
  { score: ".", label: "変わらなかった" },
  { score: "+", label: "少し強くなった" },
  { score: "++", label: "明確に強くなった" }
];
