"use client";

import React, { useState } from 'react';
import { Settings, X, ArrowLeft } from 'lucide-react';

export default function SettingsHeader() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu', 'password', 'email'
  const [fontSize, setFontSize] = useState('medium');
  
  // パスワード再設定用の状態
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // メールアドレス再設定用の状態
  const [emailData, setEmailData] = useState({
    currentEmail: '',
    newEmail: '',
    password: ''
  });

  const handleLogout = () => {
    alert('ログアウトしました');
    setIsOpen(false);
    setCurrentScreen('menu');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('新しいパスワードが一致しません');
      return;
    }
    alert('パスワードを変更しました');
    setCurrentScreen('menu');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert('メールアドレスを変更しました');
    setCurrentScreen('menu');
    setEmailData({ currentEmail: '', newEmail: '', password: '' });
  };

  const handleTerms = () => {
    alert('利用規約画面に移動します');
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentScreen('menu');
  };

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className={fontSizeClass[fontSize]}>
      {/* 設定メニューオーバーレイ（ヘッダーを表示せず即開く） */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mt-16 mr-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
            
            {/* メインメニュー */}
            {currentScreen === 'menu' && (
              <>
                {/* ヘッダー */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">設定</h2>
                  <button
                    onClick={handleClose}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="閉じる"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* メニュー項目 */}
                <div className="p-4">
                  {/* パスワード再設定 */}
                  <button
                    onClick={() => setCurrentScreen('password')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-800">パスワード再設定</div>
                    <div className="text-sm text-gray-500 mt-1">パスワードを変更します</div>
                  </button>

                  {/* メールアドレス再設定 */}
                  <button
                    onClick={() => setCurrentScreen('email')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-800">メールアドレス再設定</div>
                    <div className="text-sm text-gray-500 mt-1">メールアドレスを変更します</div>
                  </button>

                  {/* 文字の大きさ */}
                  <div className="px-4 py-3">
                    <div className="font-medium text-gray-800 mb-3">文字の大きさ</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFontSize('small')}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          fontSize === 'small'
                            ? 'bg-pink-500 text-white border-pink-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        小
                      </button>
                      <button
                        onClick={() => setFontSize('medium')}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          fontSize === 'medium'
                            ? 'bg-pink-500 text-white border-pink-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        中
                      </button>
                      <button
                        onClick={() => setFontSize('large')}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          fontSize === 'large'
                            ? 'bg-pink-500 text-white border-pink-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        大
                      </button>
                    </div>
                  </div>

                  {/* 利用規約 */}
                  <button
                    onClick={handleTerms}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-800">利用規約</div>
                    <div className="text-sm text-gray-500 mt-1">利用規約を確認します</div>
                  </button>

                  {/* 区切り線 */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* ログアウト */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
                  >
                    ログアウト
                  </button>
                </div>
              </>
            )}

            {/* パスワード再設定画面 */}
            {currentScreen === 'password' && (
              <>
                {/* ヘッダー */}
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                  <button
                    onClick={() => setCurrentScreen('menu')}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="戻る"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <h2 className="text-xl font-bold text-gray-800">パスワード再設定</h2>
                </div>

                {/* フォーム */}
                <form onSubmit={handlePasswordSubmit} className="p-6">
                  <div className="space-y-4">
                    {/* 現在のパスワード */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        現在のパスワード
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="現在のパスワードを入力"
                        required
                      />
                    </div>

                    {/* 新しいパスワード */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        新しいパスワード
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="新しいパスワードを入力"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        8文字以上、英数字を含むパスワードを設定してください
                      </p>
                    </div>

                    {/* 新しいパスワード（確認） */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        新しいパスワード（確認）
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="新しいパスワードを再入力"
                        required
                      />
                    </div>
                  </div>

                  {/* ボタン */}
                  <div className="mt-6 space-y-3">
                    <button
                      type="submit"
                      className="w-full px-4 py-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
                    >
                      パスワードを変更
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('menu')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* メールアドレス再設定画面 */}
            {currentScreen === 'email' && (
              <>
                {/* ヘッダー */}
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                  <button
                    onClick={() => setCurrentScreen('menu')}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="戻る"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <h2 className="text-xl font-bold text-gray-800">メールアドレス再設定</h2>
                </div>

                {/* フォーム */}
                <form onSubmit={handleEmailSubmit} className="p-6">
                  <div className="space-y-4">
                    {/* 現在のメールアドレス */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        現在のメールアドレス
                      </label>
                      <input
                        type="email"
                        value={emailData.currentEmail}
                        onChange={(e) => setEmailData({...emailData, currentEmail: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    {/* 新しいメールアドレス */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        新しいメールアドレス
                      </label>
                      <input
                        type="email"
                        value={emailData.newEmail}
                        onChange={(e) => setEmailData({...emailData, newEmail: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="new@email.com"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        確認メールが新しいアドレスに送信されます
                      </p>
                    </div>

                    {/* パスワード確認 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        パスワード
                      </label>
                      <input
                        type="password"
                        value={emailData.password}
                        onChange={(e) => setEmailData({...emailData, password: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="パスワードを入力"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        本人確認のため、現在のパスワードを入力してください
                      </p>
                    </div>
                  </div>

                  {/* ボタン */}
                  <div className="mt-6 space-y-3">
                    <button
                      type="submit"
                      className="w-full px-4 py-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
                    >
                      メールアドレスを変更
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('menu')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}