export async function POST(req) {
  try {
    const body = await req.json();
    const { title, kind, content, email, name } = body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.WEBHOOK_URL || process.env.DISCORD_URL;
    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: 'WEBHOOK_URL missing' }), { status: 500 });
    }

    const payload = {
      content: [
        '🎀 **新しいお問い合わせ** 🎀',
        '',
        `**タイトル:** ${title}`,
        `**種別:** ${kind}`,
        `**本文:** ${content}`,
        `**メール:** ${email}`,
        `**名前:** ${name}`,
      ].join('\n')
    };

    // use built-in fetch available in Next.js server environment
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      const text = await discordRes.text().catch(() => '');
      console.error('Discord error', discordRes.status, text);
      return new Response(JSON.stringify({ error: 'Discord error' }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 });
  }
}
