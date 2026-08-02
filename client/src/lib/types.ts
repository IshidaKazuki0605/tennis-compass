/**
 * Tennis Compass Data Models
 * 
 * Domain Design:
 * - Player: ユーザー
 * - RacketSetup: ラケット・ストリング・テンションなどの組み合わせ（履歴として不変）
 * - SetupComparison: 2つのRacketSetup間の主観的な比較結果
 */

export interface Player {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RacketSetup {
  id: string;
  playerId: string;
  racketName: string; // 必須: 「HEAD Gravity MP 2023」または「赤いラケット」
  racketSpecId?: string; // マスタデータへの参照
  stringName: string; // 必須: 「HAWK TOUCH」または「青いストリング」
  stringSpecId?: string; // マスタデータへの参照
  tension?: string; // オプション: 「47/47」など
  custom?: string; // オプション: 「鉛3g」などのカスタム情報
  note?: string; // オプション: ユーザーメモ
  createdAt: Date;
  updatedAt: Date;
}

export interface RacketSpec {
  id: string;
  name: string; // 「HEAD Gravity MP 2023」など
  category?: string; // 「Head」など
}

export interface StringSpec {
  id: string;
  name: string; // 「HAWK TOUCH」など
  brand?: string; // 「Yonex」など
}

export interface SetupComparison {
  id: string;
  playerId: string;
  beforeSetupId: string;
  afterSetupId: string;
  // 評価項目: -2 ~ 2 の範囲（-2: 大幅に悪化、-1: 悪化、0: 変化なし、1: 向上、2: 大幅に向上）
  power?: number;
  spin?: number;
  control?: number;
  feel?: number;
  comfort?: number;
  note?: string; // ユーザーの詳細な感想
  createdAt: Date;
  updatedAt: Date;
}

export type EvaluationScore = -2 | -1 | 0 | 1 | 2;

export const EVALUATION_LABELS: Record<EvaluationScore, string> = {
  "-2": "大幅に悪化",
  "-1": "悪化",
  "0": "変化なし",
  "1": "向上",
  "2": "大幅に向上",
};

export const EVALUATION_ITEMS = ["power", "spin", "control", "feel", "comfort"] as const;
export type EvaluationItem = typeof EVALUATION_ITEMS[number];

export const EVALUATION_ITEM_LABELS: Record<EvaluationItem, string> = {
  power: "パワー",
  spin: "スピン",
  control: "コントロール",
  feel: "フィーリング",
  comfort: "快適性",
};
