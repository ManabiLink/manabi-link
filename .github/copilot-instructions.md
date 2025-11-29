# Copilot Instructions for `manabi-link`

このリポジトリは、静的フロントエンド + シンプルな Node/Express バックエンドで構成された学習支援 Web アプリです。AI エージェントは、以下の方針に従ってコードを変更してください。

## 全体アーキテクチャ
- **フロントエンド:** `index.html` とディレクトリごとの HTML (`article/`, `learnig/`, `carender/`, `communication/`, `contact/`, `login/`, `register/` など) に、ページ固有のスタイルとインライン JS が含まれます。
- **共通 JS:** `js/index.js` がトップページ/ナビゲーション/ログイン系 UI ロジック、`js/module.js` が Supabase 初期化を担当します（`config.json` をフェッチし `window.supabase` を作成）。
- **バックエンド:** `server.js` は問い合わせフォーム (`contact/index.html`) からのリクエストを受け取り、Discord Webhook へ中継するだけのシンプルな Express サーバーです。
- **設定ファイル:** `config.json` は Supabase 用設定をブラウザから取得するために使われ、`scripts/generate-config.js` により `.env` から生成されます。

## 開発フロー / よく使うコマンド
- Node サーバー依存の処理は `server.js` のみで使われます。
  - 事前に依存関係をインストール: `npm install`
  - .env を準備: `.env.example` がない場合は README やコメントを参考に必要キー（`WEBHOOK_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` など）を追加。
  - Supabase 設定生成: `node scripts/generate-config.js` → ルートに `config.json` を出力。
  - 問い合わせの中継サーバー起動: `node server.js`
- テストスクリプトは実質ダミーです（`npm test` はエラー終了）。新しいテストを追加する場合は、既存のテストがない前提でディレクトリ構成から設計してください。

## コーディング規約 / パターン
- **言語:** JS は ES5〜ES2015 程度のブラウザ互換コードが中心。モジュールバンドラは使わず、ブラウザでそのまま読み込まれる想定です。
- **スタイル:** ページごとの HTML に `<style>` と `<script>` が同居しているものが多いため、なるべく `css/` や `js/` に分けてください。共通ロジックを増やす場合は必ず `js/` にファイルを追加します。
- **UI トーン:** 子ども・保護者向けで、色使いはパステル調・優しいトーンが多いです（例: `learnig/*`, `communication/index.html`, `contact/index.html`）。新しい UI もこの雰囲気に合わせてください。
- **日本語メッセージ:** エラーメッセージやボタン文言は日本語で、既存の文体（やさしい敬体・絵文字を適宜使用）に合わせます。
- **ローカルストレージ利用:** 掲示板やカレンダーなど、一部機能はブラウザの `localStorage` を用いています（例: `communication/index.html`, `carender/index.html`）。データ構造を変える場合は後方互換性に注意してください。

## 認証・外部サービス
- **Supabase 認証:**
  - `js/module.js` で `config.json` を読み込み、`createClient` で `window.supabase` を初期化します。
  - `js/index.js` 内のユーザ登録・ログイン処理は、Supabase が利用可能ならそちらを優先し、利用できない場合にのみローカルの `users` / `experts` オブジェクトをフォールバックとして使う設計です。
  - 認証フローを拡張する場合は、既存の関数（`handleUserLogin`, `handleExpertRegister` など）のシグネチャと挙動を壊さないようにしてください。
- **Discord Webhook:**
  - `server.js` は `.env` の `WEBHOOK_URL` に POST する中継サーバです。`contact/index.html` からは `http://localhost:3000/api/webhook` に対して JSON を送信します。
  - このパスやペイロード形式を変更する場合は、`contact/index.html` と `server.js` の両方を一貫して更新してください。

## 変更時の注意点
- **ファイル分散に注意:** ページごとに完結した HTML/JS が多いので、ある機能を変更するときは同名ディレクトリ内の `index.html` だけでなく、関連 JS や共通ファイル (`js/index.js`, `js/module.js`, `config.json`, `server.js`) も確認してください。
- **モバイル対応:** すべてのページが `meta viewport` を持ち、スマホ利用を前提にデザインされています。新規 UI もレスポンシブ（特にスマホ幅）を優先してください。
- **アクセシビリティ:**
  - フォームの `label` と入力要素の関連付け、`button` 要素の使用など、既存のパターンを踏襲してください（例: `contact/index.html`, `communication/index.html`）。
  - 読み上げ・音声系機能（`learnig/read.html`, `learnig/write.html`）では `SpeechSynthesis` を利用しています。新しい読み上げ機能を追加する際は、これらのパターンを再利用してください。

## AI エージェントへの具体的指示
- 既存の UI/UX トーン（やさしい日本語・パステル調デザイン）を維持しながら変更してください。
- Supabase/Discord/Web API 周りを触るときは、`.env` → `scripts/generate-config.js` → `config.json` → `js/module.js` → 呼び出し元 JS/HTML という依存関係を意識して編集順序を考えてください。
- 大きな変更（認証フローやデータ構造の変更など）を行う際は、関連ファイルを箇条書きで示しながら影響範囲を明示するコメントまたは PR 説明文を残すことを想定してコードを書いてください。
