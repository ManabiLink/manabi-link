# mnabi-link

## 前提

以下の手順を一度おこなってください

```bash
git status # 変更がないことを確認
git checkout main
git pull origin main --force
```

## 環境変数の設定

このプロジェクトでは機密情報をリポジトリに含めないため、`.env.local`（ローカル専用）を使って環境変数を設定してください。リポジトリにはテンプレートとして `.env.example` を用意しています（`SUPABASE_*` と `DISCORD_WEBHOOK_URL` のみ）。

手順:


1. `.env.example` をコピーして `.env.local` を作成します:

```bash
cp .env.example .env.local
```

1. `.env.local` に Supabase と Discord webhook の値を入れてください:

```dotenv
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

注意:

- 既存の Firebase の設定が手元にある場合でも、現在の Next.js 移行では Supabase を主要バックエンドとして利用します。Firebase のキーは `.env.local` に残したくない場合は削除してください（バックアップは別途管理してください）。
- `.env.local` やその他のシークレットはコミットしないでください。`.gitignore` に `.env*` が既に含まれています。


## `server.js` の起動

- リポジトリルートに `server.js` がある場合、カスタムサーバーとして使われることがあります。基本的な起動は:

```bash
node server.js
```

- `server.js` の中でポートやオプションを参照していることがあるため、必要に応じて中身を確認してください。

---

## supabase の導入

Supabase を使う場合はクライアントライブラリを追加します。

```bash
npm install @supabase/supabase-js
```
