# mnabi-link

## 前提

以下の手順を一度おこなってください

```bash
git status # 変更がないことを確認
git checkout main
git pull origin main --force
```

## 環境変数の設定

環境変数は `.env` ファイルに設定します。以下は必要なKEYとなっています。

```markdown
# 機密情報のため、必要な情報は bitwarden に記載してあります。
# firebase
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
measurementId=

# supabase
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=

# discord-toExpert
DISCORD_WEBHOOK_URL=
```

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
