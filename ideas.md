# Tennis Compass (テニコン) - Design Philosophy

## 選定デザイン方針

### Design Movement
**Functional Minimalism with Intentional Depth**
スポーツテックの実用性とプレミアムな質感を融合させたデザイン。入力ハードルを下げつつ、データの蓄積と比較という知的な行為を尊重する。

### Core Principles

1. **入力優先設計（Input-First Design）**: フォームは直感的で、複雑な選択肢を隠す。初心者でも迷わない。
2. **データの可視化**: 主観的な比較結果を視覚的に表現し、パターンを発見しやすくする。
3. **段階的な詳細化**: 必須項目は最小限に、詳細はオプショナル。ユーザーが深掘りしたい時だけ表示。
4. **スポーツの質感**: テニスコートの色、ラケットの素材感、プレーの躍動感を背景に感じさせる。

### Color Philosophy

**Primary Palette:**
- **Court Green** (`oklch(0.55 0.12 145)`): テニスコートの深緑。信頼感と専門性を表現。
- **Racket Silver** (`oklch(0.92 0.01 0)`): ラケット素材のシルバー。クリーンさと高級感。
- **String Tension Gold** (`oklch(0.72 0.15 60)`): ストリングテンションの黄金色。エネルギーと最適化。

**Semantic Colors:**
- **Success**: Court Green（セットアップが完成した状態）
- **Accent**: String Tension Gold（比較結果の強調）
- **Muted**: Racket Silver（補助情報）

**Emotional Intent**: スポーツの専門性と、自分のプレーを追求する知的さを同時に表現。

### Layout Paradigm

**Two-Column Asymmetric Layout**
- **左: 入力・管理パネル** - シンプルで直感的なフォーム
- **右: 比較・分析エリア** - 視覚的なカード、グラフ、タイムライン

モバイルでは上下に分割。ユーザーの行動フロー（入力 → 比較 → 発見）を空間的に表現。

### Signature Elements

1. **セットアップカード**: ラケット・ストリング・テンション情報を一枚のカードで表現。タッチで展開。
2. **比較ビジュアル**: Before/After を矢印で繋ぎ、評価項目（Power, Spin, Control, Feel, Comfort）を5段階スケールで表示。
3. **タイムライン**: セットアップの変更履歴を縦軸で表示。時系列でパターンを発見。

### Interaction Philosophy

- **ワンクリック入力**: ドロップダウンで一般的なラケット・ストリングを提案。自由入力も即座に可能。
- **スムーズな遷移**: セットアップ追加 → 比較作成 → 結果表示を一連の流れで。
- **段階的な開示**: 詳細情報は「詳しく見る」で展開。初見ユーザーは迷わない。

### Animation

- **Entrance**: カードは下からスライドイン（`translateY: 20px → 0`）、200ms ease-out。
- **Hover**: セットアップカードは微かに浮き上がる（`translateY: -4px`）、150ms ease-out。
- **Comparison**: Before/After の矢印は脈動（opacity 0.5 ↔ 1.0）、1.5s infinite。
- **Stagger**: 複数カードは30msずつ遅延表示。

### Typography System

**Font Pairing:**
- **Display**: `Playfair Display` (serif, 700) - セットアップ名、タイトル。高級感と専門性。
- **Body**: `Inter` (sans-serif, 400/500) - 説明文、フォーム、データ。読みやすさ。

**Hierarchy:**
- **H1**: Playfair Display, 32px, 700 - ページタイトル
- **H2**: Playfair Display, 24px, 600 - セクションタイトル
- **H3**: Inter, 18px, 600 - カードタイトル
- **Body**: Inter, 14px, 400 - 本文
- **Caption**: Inter, 12px, 500 - ラベル、補助情報

### Brand Essence

**One-liner**: 「あなたのテニスの最適化を、主観で記録する。」

**Personality Adjectives:**
1. **Precise** - 数値ではなく、感覚を正確に記録。
2. **Accessible** - 初心者から上級者まで、誰でも使える。
3. **Insightful** - 蓄積されたデータから、自分のパターンを発見。

### Brand Voice

**Tone**: 親切で、専門的だが押し付けがましくない。ユーザーの試行錯誤を応援する。

**Example Headlines:**
- 「このセットアップ、どう感じましたか？」（入力画面）
- 「ストリング変更で、スピンが上がった」（比較結果）

**Example CTAs:**
- 「セットアップを記録する」（Action）
- 「前回と比較する」（Secondary）

### Wordmark & Logo

**Logo Concept**: テニスラケットのストリングパターンを抽象化した幾何学模様。
- 中央に「⊗」（ラケットの交差）
- 周囲に円形の波紋（水に落ちた石のような拡散）
- 色: Court Green

**Logotype**: 「Tennis Compass」をシンプルなサンセリフで。ロゴの右隣に配置。

### Signature Brand Color

**Court Green** (`oklch(0.55 0.12 145)`)
このブランドを見たら、即座にテニスコートと専門性を連想させる色。

---

## 実装ガイドライン

### ファイル構成での設計反映

各ファイルの先頭に以下のコメントを記載し、設計哲学を常に意識：

```
/**
 * Design Philosophy: [該当する原則]
 * - [具体的な実装ルール]
 */
```

### 色の使用ルール

```css
--primary: oklch(0.55 0.12 145);        /* Court Green */
--accent: oklch(0.72 0.15 60);          /* String Tension Gold */
--secondary: oklch(0.92 0.01 0);        /* Racket Silver */
```

### 疑問が生じた時の判断基準

「このデザイン選択は、ユーザーの入力ハードルを下げ、データ蓄積の喜びを高めるか？」

Yes → 実装
No → 再検討

---

## 開発フェーズ

### Phase 1: データ構造と基本UI
- Player, RacketSetup, SetupComparison のモデル化
- フォーム入力画面の実装
- ハードコードまたはローカルストレージでのデータ管理

### Phase 2: 比較・分析機能
- SetupComparison の可視化
- タイムライン表示
- 簡易的な統計表示

### Phase 3: ポーランドと最適化
- アニメーション追加
- モバイル対応確認
- ユーザーテスト

---

## 注記

このドキュメントは叶い台の設計方針です。実装を進める中で、ユーザーフィードバックに基づいて調整します。
