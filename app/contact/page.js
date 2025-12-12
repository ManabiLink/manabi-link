"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback('');
    const data = { title, kind, content, email, name: name || '匿名' };
    try {
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setFeedback('♡ 送信完了！Discordに届いたよ ♡');
        setTitle(''); setKind(''); setContent(''); setEmail(''); setName('');
      } else {
        setFeedback('サーバー通知に失敗しました💦');
      }
    } catch (err) {
      console.error(err);
      setFeedback('通信エラーが発生しました💦');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white py-12">
      <Link href="/" className="absolute top-6 left-6 px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition">← ホームに戻る</Link>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-pink-600 text-center mb-6">きゅるん♡お問い合わせ</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-pink-500 mb-1">タイトル</label>
            <input className="w-full p-2 border rounded-lg" value={title} onChange={e=>setTitle(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-pink-500 mb-1">種別</label>
            <select className="w-full p-2 border rounded-lg" value={kind} onChange={e=>setKind(e.target.value)} required>
              <option value="">選択してね♡</option>
              <option value="質問">💬 質問</option>
              <option value="要望">🌈 要望</option>
              <option value="不具合報告">🐞 不具合報告</option>
              <option value="その他">🎀 その他</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-pink-500 mb-1">本文</label>
            <textarea className="w-full p-2 border rounded-lg h-24" value={content} onChange={e=>setContent(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-pink-500 mb-1">メールアドレス</label>
            <input type="email" className="w-full p-2 border rounded-lg" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-pink-500 mb-1">名前（任意）</label>
            <input className="w-full p-2 border rounded-lg" value={name} onChange={e=>setName(e.target.value)} placeholder="匿名でもOK♡" />
          </div>
          <button className="w-full bg-gradient-to-b from-pink-300 to-pink-500 text-white font-bold py-2 rounded-full hover:scale-105 transition">💌 送信する</button>
          <p id="feedback" className="mt-4 text-center text-pink-600">{feedback}</p>
        </form>
      </div>
    </div>
  );
}
