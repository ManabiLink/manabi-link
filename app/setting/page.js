"use client"
import React, { useState } from 'react';

export default function Page(){
  const [page, setPage] = useState('settings');
  const [fontSize, setFontSize] = useState('medium');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEmailConfirm, setNewEmailConfirm] = useState('');

  function changeFontSize(size){
    setFontSize(size);
    const map = { small: '14px', medium: '16px', large: '18px' };
    document.documentElement.style.fontSize = map[size] || '16px';
  }

  function handlePasswordReset(){
    if (!newPassword || !newPasswordConfirm) return alert('新しいパスワードを入力してください');
    if (newPassword !== newPasswordConfirm) return alert('パスワードが一致しません');
    alert('パスワード変更処理（ダミー）：完了しました');
    setNewPassword(''); setNewPasswordConfirm(''); setPage('settings');
  }

  function handleEmailReset(){
    if (!newEmail || !newEmailConfirm) return alert('新しいメールアドレスを入力してください');
    if (newEmail !== newEmailConfirm) return alert('メールアドレスが一致しません');
    alert('メールアドレス変更処理（ダミー）：完了しました');
    setNewEmail(''); setNewEmailConfirm(''); setPage('settings');
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {page === 'settings' && (
        <div className="container-box settings page bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">設定</h2>
          <div className="flex flex-col gap-3">
            <button className="px-4 py-2 border rounded" onClick={()=>alert('通知設定（準備中）')}>通知設定</button>
            <button className="px-4 py-2 border rounded" onClick={()=>setPage('font')}>文字の大きさ</button>
            <button className="px-4 py-2 border rounded" onClick={()=>alert('アカウント管理（準備中）')}>アカウント管理</button>
            <button className="px-4 py-2 border rounded" onClick={()=>setPage('password')}>パスワード再設定</button>
            <button className="px-4 py-2 border rounded" onClick={()=>setPage('email')}>メールアドレス再設定</button>
          </div>
          <div className="mt-6"><button className="px-3 py-2 border rounded" onClick={()=>{ window.history.back(); }}>← ダッシュボードに戻る</button></div>
        </div>
      )}

      {page === 'font' && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">文字の大きさ</h2>
          <div className="flex gap-3">
            <button className={`px-4 py-2 border rounded ${fontSize==='small' ? 'bg-pink-100' : ''}`} onClick={()=>changeFontSize('small')}>小</button>
            <button className={`px-4 py-2 border rounded ${fontSize==='medium' ? 'bg-pink-100' : ''}`} onClick={()=>changeFontSize('medium')}>中</button>
            <button className={`px-4 py-2 border rounded ${fontSize==='large' ? 'bg-pink-100' : ''}`} onClick={()=>changeFontSize('large')}>大</button>
          </div>
          <div className="mt-4"><button className="px-3 py-2 border rounded" onClick={()=>setPage('settings')}>← 設定に戻る</button></div>
        </div>
      )}

      {page === 'password' && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">パスワード再設定</h2>
          <div className="mb-3"><label className="block mb-1">新規パスワード</label><input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="w-full border p-2 rounded" /></div>
          <div className="mb-3"><label className="block mb-1">新規パスワード（確認）</label><input type="password" value={newPasswordConfirm} onChange={e=>setNewPasswordConfirm(e.target.value)} className="w-full border p-2 rounded" /></div>
          <div className="flex gap-3"><button className="px-4 py-2 bg-pink-500 text-white rounded" onClick={handlePasswordReset}>登録</button><button className="px-3 py-2 border rounded" onClick={()=>setPage('settings')}>← 設定に戻る</button></div>
        </div>
      )}

      {page === 'email' && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">メールアドレス再設定</h2>
          <div className="mb-3"><label className="block mb-1">新規メールアドレス</label><input type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} className="w-full border p-2 rounded" /></div>
          <div className="mb-3"><label className="block mb-1">新規メールアドレス（確認）</label><input type="email" value={newEmailConfirm} onChange={e=>setNewEmailConfirm(e.target.value)} className="w-full border p-2 rounded" /></div>
          <div className="flex gap-3"><button className="px-4 py-2 bg-pink-500 text-white rounded" onClick={handleEmailReset}>登録</button><button className="px-3 py-2 border rounded" onClick={()=>setPage('settings')}>← 設定に戻る</button></div>
        </div>
      )}
    </div>
  );
}
