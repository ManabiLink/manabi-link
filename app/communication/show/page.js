"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const categories = {
  general: { label: '日々の悩み', color: 'bg-pink-100 text-pink-800' },
  health: { label: '健康・発達', color: 'bg-rose-100 text-rose-800' },
  education: { label: '学習・進路', color: 'bg-purple-100 text-purple-800' },
  relationship: { label: '親子関係', color: 'bg-fuchsia-100 text-fuchsia-800' },
  lifestyle: { label: '生活・習慣', color: 'bg-pink-100 text-pink-800' }
};

export default function ShowPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('posts') || '[]');
      setPosts(raw);
    } catch (e) {
      setPosts([]);
    }
  }, []);

  function formatTime(ts) {
    const diff = Date.now() - ts;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'たった今';
    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
  }

  const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-pink-600">投稿一覧</h1>
            <Link href="/communication" className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition">
              投稿する
            </Link>
          </div>
          <p className="text-gray-600">全{posts.length}件の投稿</p>
        </div>

        {/* 投稿一覧 */}
        <div className="space-y-4">
          {sortedPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-500 mb-4">まだ投稿がありません</p>
              <Link href="/communication" className="inline-block bg-pink-400 text-white px-6 py-2 rounded-lg hover:bg-pink-500 transition">
                最初の投稿をする
              </Link>
            </div>
          ) : (
            sortedPosts.map(post => (
              <Link 
                key={post.id} 
                href={`/communication/post/${post.id}`}
                className="block bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-400 hover:shadow-xl hover:border-pink-500 transition cursor-pointer"
              >
                {/* カテゴリーとタイムスタンプ */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categories[post.category]?.color}`}>
                    {categories[post.category]?.label}
                  </span>
                  <span className="text-sm text-gray-500">{formatTime(post.timestamp)}</span>
                </div>

                {/* 投稿内容（プレビュー） */}
                <p className="text-gray-800 mb-4 whitespace-pre-wrap leading-relaxed line-clamp-3">
                  {post.content}
                </p>

                {/* フッター */}
                <div className="flex items-center justify-between pt-3 border-t border-pink-100">
                  <span className="text-sm text-pink-600 font-medium">{post.nickname}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-pink-500">❤️ {post.likes}</span>
                    <span className="text-rose-500">💬 {post.replies?.length || 0}件の返信</span>
                    <span className="text-blue-500">→ 詳細を見る</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}