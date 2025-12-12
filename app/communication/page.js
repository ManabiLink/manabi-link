"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = {
  general: { label: '日々の悩み', color: 'bg-pink-100 text-pink-800' },
  health: { label: '健康・発達', color: 'bg-rose-100 text-rose-800' },
  education: { label: '学習・進路', color: 'bg-purple-100 text-purple-800' },
  relationship: { label: '親子関係', color: 'bg-fuchsia-100 text-fuchsia-800' },
  lifestyle: { label: '生活・習慣', color: 'bg-pink-100 text-pink-800' }
};

export default function Page(){
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('posts') || '[]');
      setPosts(raw);
    } catch (e) {
      setPosts([]);
    }
  }, []);
  
  const [category, setCategory] = useState('general');
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [replyOpen, setReplyOpen] = useState({});

  useEffect(()=>{ 
    localStorage.setItem('posts', JSON.stringify(posts)); 
  }, [posts]);

  useEffect(()=>{ 
    setCharCount(content.length); 
  }, [content]);

  function submitPost(){
    const txt = content.trim(); 
    if (!txt) return alert('相談内容を入力してください');
    const post = { 
      id: Date.now().toString(), 
      content: txt, 
      nickname: nickname.trim()||'匿名の保護者', 
      category, 
      timestamp: Date.now(), 
      likes: 0, 
      replies: [] 
    };
    setPosts(prev=>[...prev, post]);
    setContent(''); 
    setNickname(''); 
    setCategory('general'); 
    setCharCount(0);
    setTimeout(()=>window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),200);
  }

  function likePost(id){
    setPosts(prev=>prev.map(p=> p.id===id ? { ...p, likes: p.likes+1 } : p));
  }

  function toggleReplyForm(id){ 
    setReplyOpen(prev=>({...prev, [id]: !prev[id]})); 
  }

  function submitReply(postId, text, nick){
    const txt = text.trim(); 
    if (!txt) return alert('返信内容を入力してください');
    setPosts(prev=> prev.map(p=> p.id===postId ? { 
      ...p, 
      replies: [...(p.replies||[]), { 
        id: Date.now().toString(), 
        text: txt, 
        nickname: nick.trim()||'匿名の保護者', 
        timestamp: Date.now() 
      }] 
    } : p));
    setReplyOpen(prev=>({...prev, [postId]: false}));
  }

  function formatTime(ts){
    const diff = Date.now() - ts; 
    const minutes = Math.floor(diff/60000); 
    const hours = Math.floor(diff/3600000); 
    const days = Math.floor(diff/86400000);
    if (minutes<1) return 'たった今'; 
    if (minutes<60) return `${minutes}分前`; 
    if (hours<24) return `${hours}時間前`; 
    return `${days}日前`;
  }

  function escapeHtml(text){ 
    const d = document.createElement('div'); 
    d.textContent = text; 
    return d.innerHTML; 
  }

  const sorted = [...posts].sort((a,b)=>b.timestamp - a.timestamp);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-block mb-4 px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition">← ホームに戻る</Link>
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-pink-600">保護者のための安心掲示板</h1>
            <p className="text-gray-600">匿名で安心して相談・共有できる場所です</p>
          </div>
          <Link 
            href="/communication/show"
            className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition flex items-center gap-2"
          >
            <span>📋</span>
            <span>一覧を見る</span>
          </Link>
        </div>
      </div>

      {/* 投稿フォーム */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold text-pink-600 mb-4">投稿する</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">カテゴリー</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-3 border rounded-lg mb-2">
            <option value="general">日々の悩み</option>
            <option value="health">健康・発達</option>
            <option value="education">学習・進路</option>
            <option value="relationship">親子関係</option>
            <option value="lifestyle">生活・習慣</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">ニックネーム（任意）</label>
          <input value={nickname} onChange={e=>setNickname(e.target.value)} className="w-full p-3 border rounded-lg mb-2" placeholder="空欄の場合は「匿名の保護者」と表示されます" maxLength={20} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">相談・お悩み内容</label>
          <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="お子さんのこと、日々の悩み、何でも気軽に書いてください..." maxLength={1000} rows={5} className="w-full p-3 border rounded-lg" />
          <p className="text-sm text-gray-500 mt-1"><span>{charCount}</span>/1000</p>
        </div>
        <button onClick={submitPost} className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-500 transition">投稿する</button>
      </div>

      {/* 投稿一覧 */}
      <div id="postsList" className="space-y-4">
        {sorted.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">まだ投稿がありません。最初の投稿をしてみませんか？</div>
        ) : sorted.map(post=> (
          <div key={post.id} className="bg-white rounded-2xl shadow p-6 border-l-4 border-pink-300 hover:shadow-lg transition">
            <div className="flex justify-between mb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categories[post.category]?.color}`}>
                {categories[post.category]?.label}
              </span>
              <div className="text-sm text-gray-500">{formatTime(post.timestamp)}</div>
            </div>
            <p className="text-gray-800 mb-3 whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: escapeHtml(post.content)}} />
            <div className="flex items-center justify-between pt-3 border-t border-pink-100">
              <span className="text-sm text-pink-600 font-medium">{post.nickname}</span>
              <div className="flex items-center gap-4">
                <button onClick={()=>likePost(post.id)} className="flex items-center gap-1 text-pink-500 hover:text-pink-600 transition">❤️ <span>{post.likes}</span></button>
                <button onClick={()=>toggleReplyForm(post.id)} className="flex items-center gap-1 text-rose-500 hover:text-rose-600 transition">返信 <span>{post.replies?.length||0}</span></button>
              </div>
            </div>

            {post.replies && post.replies.length>0 && (
              <div className="mt-4 pl-4 border-l-2 border-pink-300 space-y-3">
                <h3 className="text-sm font-semibold text-pink-600 mb-2">みんなの返信</h3>
                {post.replies.map(r=> (
                  <div key={r.id} className="bg-pink-50 rounded-lg p-4 border border-pink-100">
                    <p className="text-sm text-gray-800 mb-2">{r.text}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="font-medium text-pink-600">{r.nickname}</span>
                      <span>{formatTime(r.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {replyOpen[post.id] && (
              <ReplyForm postId={post.id} onSubmit={submitReply} onCancel={()=>toggleReplyForm(post.id)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReplyForm({ postId, onSubmit, onCancel }){
  const [text, setText] = useState('');
  const [nick, setNick] = useState('');
  return (
    <div className="mt-4 bg-pink-50 rounded-lg p-4 border border-pink-200">
      <h3 className="text-sm font-semibold text-pink-600 mb-3">返信を書く</h3>
      <div className="mb-3"><input value={nick} onChange={e=>setNick(e.target.value)} placeholder="ニックネーム（任意）" className="w-full p-2 border rounded" /></div>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} className="w-full p-3 border rounded mb-3" placeholder="励ましやアドバイスを書く..." />
      <div className="flex gap-2">
        <button onClick={()=>onSubmit(postId, text, nick)} className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 transition">返信する</button>
        <button onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-50 transition">キャンセル</button>
      </div>
    </div>
  );
}