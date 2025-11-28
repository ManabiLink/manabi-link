/*
npm install express node-fetch@2 cors dotenv をターミナルに打って実行
bitwarden を参考に、.env ファイルに すべてを貼り付け
node server.js をターミナルに打って実行
*/
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ★ CORS 許可（めちゃ重要）
app.use(cors({
  origin: "*",
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.post("/api/webhook", async (req, res) => {
  const { title, kind, content, email, name } = req.body;

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: "WEBHOOK_URL missing" });
  }

  const body = {
    content: [
      "🎀 **新しいお問い合わせ** 🎀",
      "",
      `**タイトル:** ${title}`,
      `**種別:** ${kind}`,
      `**本文:** ${content}`,
      `**メール:** ${email}`,
      `**名前:** ${name}`,
    ].join("\n")
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!discordRes.ok) {
      throw new Error(`Discord error: ${discordRes.status}`);
    }

    return res.json({ ok: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

app.listen(3000, () => {
  console.log("Running http://localhost:3000/");
});
