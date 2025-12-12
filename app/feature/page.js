"use client"
import React from 'react';
import Link from 'next/link';

export default function Page(){
  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <Link href="/" className="inline-block mb-4 px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition">← ホームに戻る</Link>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">機能紹介</h1>
        <p className="text-gray-600">このセクションは現在準備中です。近日中に機能や使い方を掲載します。</p>
      </div>
    </div>
  );
}
