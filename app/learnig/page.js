"use client"
import React from 'react';
import Link from 'next/link';

export default function Page(){
  return (
    <div className="p-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="container max-w-3xl text-center bg-white rounded-3xl p-12 shadow-lg">
        <h1 className="text-4xl font-light mb-10">学習ページ</h1>
        <div className="flex flex-wrap justify-center gap-8">
          <Link href="/learnig/write" className="block w-56 h-56 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-blue-300 to-indigo-300 border-4 border-indigo-400 hover:scale-105 transition">なぞり書き</Link>
          <Link href="/learnig/read" className="block w-56 h-56 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-green-300 to-emerald-300 border-4 border-emerald-400 hover:scale-105 transition">読み聞かせ</Link>
        </div>
      </div>
    </div>
  );
}
