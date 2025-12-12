"use client"
import React, { useState } from 'react';
import { supabase } from '@/app/lib/Supabase';

export default function Page(){
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function clearError(){ setError(''); }

  function supabaseErrorMessage(err){
    if (!err || !err.status) return '登録に失敗しました';
    if (err.status === 400) return err?.message || 'このメールアドレスは既に使用されています';
    return err?.message || '登録に失敗しました';
  }

  async function onSubmit(e){
    e.preventDefault(); clearError();
    if (!nickname || !email || !password || !passwordConfirm) { setError('全ての項目を入力してください'); return; }
    if (password !== passwordConfirm) { setError('パスワードが一致しません'); return; }
    setLoading(true);
    try{
      const supabase = await supabase();
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: nickname } } });
      if (error) throw error;
      alert('登録完了！メールを確認して認証を完了してください。その後ログイン画面に移動してください。');
      window.location.href = '/login';
    }catch(err){
      setError(supabaseErrorMessage(err));
      console.error('register error', err);
    }finally{ setLoading(false); }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">新規登録</h2>
      {error && <div role="alert" className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="block mb-1">ニックネーム</label>
          <input className="w-full border px-3 py-2 rounded" value={nickname} onChange={e=>setNickname(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1">メールアドレス</label>
          <input type="email" className="w-full border px-3 py-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1">パスワード</label>
          <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1">パスワード（確認用）</label>
          <input type="password" className="w-full border px-3 py-2 rounded" value={passwordConfirm} onChange={e=>setPasswordConfirm(e.target.value)} required />
        </div>
        <div className="mb-4 text-sm">
          <small>登録することで、<a href="/Privacy_policy" target="_blank" rel="noopener" className="text-pink-600">プライバシーポリシー</a>に同意したものとみなされます。</small>
        </div>
        <button className="btn bg-pink-500 text-white px-4 py-2 rounded" disabled={loading} type="submit">{loading ? '登録中…' : '登録する'}</button>
      </form>
      <div className="mt-4">すでにアカウントをお持ちの場合は <a href="/login" className="text-pink-600">ログイン</a></div>
    </div>
  );
}
