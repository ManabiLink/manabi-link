"use client"
import React, { useEffect, useMemo, useState } from 'react';

const INITIAL = [
  { id: '1', title: '子どもの集中力を高めるヒント', content: '集中力は学習の基礎です。適切な環境づくり、休憩時間の確保、興味を引く学習方法など、家庭でできる工夫をご紹介します。定期的な休憩を取ることで、長期的な集中力の維持につながります。', views: 125, likes: 45, timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 },
  { id: '2', title: '朝食の重要性と簡単レシピ', content: '朝食は一日のエネルギー源。栄養バランスの取れた朝食が、お子様の学習能力や体調管理に大きく影響します。簡単に作れるレシピもご紹介します。', views: 89, likes: 32, timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000 },
  { id: '3', title: 'デジタル機器との付き合い方', content: '現代社会で避けられないデジタル機器。適切な使用時間やルール作りについて考えてみましょう。家族全員でルールを決めることが大切です。', views: 156, likes: 67, timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000 },
  { id: '4', title: '効果的な褒め方・叱り方', content: 'お子様の自己肯定感を育てる褒め方、成長につながる叱り方のポイントをお伝えします。具体的な行動を褒めることで、子どもの成長を促します。', views: 203, likes: 89, timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000 },
  { id: '5', title: '学習のモチベーション維持法', content: 'やる気を引出し、持続させるための声かけや環境づくりについてご紹介します。小さな成功体験の積み重ねが大切です。', views: 178, likes: 71, timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 },
  { id: '6', title: '親子のコミュニケーション術', content: '日々の会話が親子関係を深めます。効果的なコミュニケーション方法を学びましょう。傾聴の姿勢が信頼関係を築きます。', views: 142, likes: 58, timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 },
  { id: '7', title: '家庭での安全対策チェックリスト', content: 'お子様が安心して過ごせる環境づくりのためのチェックポイントをまとめました。定期的な見直しが重要です。', views: 98, likes: 41, timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 },
  { id: '8', title: '学力向上につながる読書法', content: '読書習慣は学力の基礎。年齢に応じた本の選び方、読書を楽しむ工夫をご紹介します。親子で一緒に読書する時間を作りましょう。', views: 167, likes: 73, timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000 }
];

export default function Page() {
  const [articles, setArticles] = useState(INITIAL);

  // load saved articles from localStorage on client after mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('articles-v1');
      if (raw) {
        const saved = JSON.parse(raw);
        setArticles(saved);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showPost, setShowPost] = useState(false);
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    localStorage.setItem('articles-v1', JSON.stringify(articles));
  }, [articles]);

  const nextId = useMemo(() => {
    const max = articles.reduce((m, a) => Math.max(m, Number(a.id)), 0);
    return String(max + 1);
  }, [articles]);

  function addArticle(title, content) {
    const id = nextId;
    const a = { id, title, content, views: 0, likes: 0, timestamp: Date.now() };
    setArticles(prev => [a, ...prev]);
    setShowPost(false);
  }

  function toggleLike(id) {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: a.liked ? a.likes - 1 : a.likes + 1, liked: !a.liked } : a));
  }

  function deleteArticle(id) {
    if (!confirm('この記事を削除しますか？')) return;
    setArticles(prev => prev.filter(a => a.id !== id));
  }

  function openArticle(id) {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, views: a.views + 1 } : a));
    setModalId(id);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter(a => {
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q);
    }).sort((a, b) => {
      switch (sortBy) {
        case 'popular': return b.views - a.views;
        case 'likes': return b.likes - a.likes;
        case 'newest': return b.timestamp - a.timestamp;
        case 'oldest': return a.timestamp - b.timestamp;
        default: return 0;
      }
    }).slice(0,8);
  }, [articles, search, sortBy]);

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
          <div style={{fontSize:40}}>🖼️</div>
          <h1 className="text-2xl font-bold">保護者の方におすすめの記事</h1>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <input className="px-4 py-2 border rounded-full" placeholder="🔍 記事を検索..." value={search} onChange={e=>setSearch(e.target.value)} />
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="px-4 py-2 border rounded-full">
              <option value="popular">人気順（閲覧数）</option>
              <option value="likes">いいね順</option>
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
            </select>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-full" onClick={()=>setShowPost(true)}>📝 記事投稿</button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 && <div className="p-8 text-center text-gray-500 bg-white rounded">検索結果が見つかりませんでした</div>}
          {filtered.map((a, idx) => (
            <div key={a.id} className="bg-white p-4 rounded shadow relative cursor-pointer" onClick={(e)=>{ if ((e.target).closest('button')) return; openArticle(a.id); }}>
              {(sortBy === 'popular' && idx < 3) && <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs">🔥 人気</div>}
              <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8" onClick={(e)=>{ e.stopPropagation(); deleteArticle(a.id); }}>×</button>
              <div className="font-medium mb-2">{a.title}</div>
              <div className="flex gap-4 text-sm text-gray-600">
                <div>👁️ {a.views}</div>
                <div className="flex items-center gap-2">
                  <button className={`like-btn ${a.liked ? 'text-red-500' : ''}`} onClick={(e)=>{ e.stopPropagation(); toggleLike(a.id); }}>{a.liked ? '❤️' : '🤍'}</button>
                  {a.likes}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post modal */}
        {showPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-6 z-50">
            <div className="bg-white rounded p-6 w-full max-w-2xl">
              <div className="flex justify-end"><button onClick={()=>setShowPost(false)}>×</button></div>
              <h2 className="text-lg font-bold mb-4">新しい記事を投稿</h2>
              <ArticleForm onSubmit={addArticle} />
            </div>
          </div>
        )}

        {/* Article modal */}
        {modalId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-6 z-50" onClick={()=>setModalId(null)}>
            <div className="bg-white rounded p-6 w-full max-w-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex justify-end"><button onClick={()=>setModalId(null)}>×</button></div>
              {(() => {
                const a = articles.find(x=>x.id===modalId);
                if (!a) return null;
                return (
                  <div>
                    <h2 className="text-xl font-bold mb-2">{a.title}</h2>
                    <p className="leading-relaxed text-gray-700">{a.content}</p>
                    <div className="mt-4 text-sm text-gray-500">👁️ 閲覧数: {a.views} • ❤️ いいね: {a.likes}</div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert('タイトルと内容を入力してください');
    onSubmit(title.trim(), content.trim());
    setTitle(''); setContent('');
  }

  return (
    <form onSubmit={submit}>
      <div className="mb-4">
        <label className="block font-medium mb-2">記事タイトル</label>
        <input className="w-full border px-3 py-2 rounded" value={title} onChange={e=>setTitle(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">記事内容</label>
        <textarea className="w-full border px-3 py-2 rounded" value={content} onChange={e=>setContent(e.target.value)} required rows={6} />
      </div>
      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">投稿する</button>
    </form>
  );
}
