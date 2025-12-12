import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu', 'password', 'email', 'terms'
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
    if (window.confirm('ログアウトしますか？')) {
      alert('ログアウトしました');
      setIsOpen(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('新しいパスワードが一致しません');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('パスワードは8文字以上で設定してください');
      return;
    }
    alert('パスワードを変更しました');
    setCurrentScreen('menu');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEmailSubmit = () => {
    if (!emailData.currentEmail || !emailData.newEmail || !emailData.password) {
      alert('すべての項目を入力してください');
      return;
    }
    alert('確認メールを送信しました。新しいメールアドレスで確認してください。');
    setCurrentScreen('menu');
    setEmailData({ currentEmail: '', newEmail: '', password: '' });
  };

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          設定を開く
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${fontSizeClass[fontSize]}`}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        
        {/* メインメニュー */}
        {currentScreen === 'menu' && (
          <>
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">設定</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="閉じる"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* メニュー項目 */}
            <div className="p-6 space-y-1">
              {/* パスワード再設定 */}
              <button
                onClick={() => setCurrentScreen('password')}
                className="w-full text-left py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="font-bold text-gray-800 mb-1">パスワード再設定</div>
                <div className="text-sm text-gray-400">パスワードを変更します</div>
              </button>

              {/* メールアドレス再設定 */}
              <button
                onClick={() => setCurrentScreen('email')}
                className="w-full text-left py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="font-bold text-gray-800 mb-1">メールアドレス再設定</div>
                <div className="text-sm text-gray-400">メールアドレスを変更します</div>
              </button>

              {/* 文字の大きさ */}
              <div className="py-4 border-b border-gray-100">
                <div className="font-bold text-gray-800 mb-3">文字の大きさ</div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFontSize('small')}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors ${
                      fontSize === 'small'
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    小
                  </button>
                  <button
                    onClick={() => setFontSize('medium')}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors ${
                      fontSize === 'medium'
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    中
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors ${
                      fontSize === 'large'
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    大
                  </button>
                </div>
              </div>

              {/* 利用規約 */}
              <button
                onClick={() => setCurrentScreen('terms')}
                className="w-full text-left py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="font-bold text-gray-800 mb-1">利用規約</div>
                <div className="text-sm text-gray-400">利用規約を確認します</div>
              </button>
            </div>

            {/* ログアウトボタン */}
            <div className="p-6 pt-0">
              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors"
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
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="戻る"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">パスワード再設定</h2>
            </div>

            {/* フォーム */}
            <div className="p-6">
              <div className="space-y-5">
                {/* 現在のパスワード */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    現在のパスワード
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="現在のパスワードを入力"
                  />
                </div>

                {/* 新しいパスワード */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    新しいパスワード
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="新しいパスワードを入力"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    8文字以上、英数字を含むパスワードを設定してください
                  </p>
                </div>

                {/* 新しいパスワード（確認） */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    新しいパスワード（確認）
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="新しいパスワードを再入力"
                  />
                </div>
              </div>

              {/* ボタン */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full py-4 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors"
                >
                  パスワードを変更
                </button>
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="w-full py-4 rounded-lg border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </>
        )}

        {/* メールアドレス再設定画面 */}
        {currentScreen === 'email' && (
          <>
            {/* ヘッダー */}
            <div className="flex items-center gap-3 p-6 border-b border-gray-200">
              <button
                onClick={() => setCurrentScreen('menu')}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="戻る"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">メールアドレス再設定</h2>
            </div>

            {/* フォーム */}
            <div className="p-6">
              <div className="space-y-5">
                {/* 現在のメールアドレス */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    現在のメールアドレス
                  </label>
                  <input
                    type="email"
                    value={emailData.currentEmail}
                    onChange={(e) => setEmailData({...emailData, currentEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                {/* 新しいメールアドレス */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    新しいメールアドレス
                  </label>
                  <input
                    type="email"
                    value={emailData.newEmail}
                    onChange={(e) => setEmailData({...emailData, newEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="new@email.com"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    確認メールが新しいアドレスに送信されます
                  </p>
                </div>

                {/* パスワード確認 */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    パスワード
                  </label>
                  <input
                    type="password"
                    value={emailData.password}
                    onChange={(e) => setEmailData({...emailData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="パスワードを入力"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    本人確認のため、現在のパスワードを入力してください
                  </p>
                </div>
              </div>

              {/* ボタン */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleEmailSubmit}
                  className="w-full py-4 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors"
                >
                  メールアドレスを変更
                </button>
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="w-full py-4 rounded-lg border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </>
        )}

        {/* 利用規約画面 */}
        {currentScreen === 'terms' && (
          <>
            {/* ヘッダー */}
            <div className="flex items-center gap-3 p-6 border-b border-gray-200">
              <button
                onClick={() => setCurrentScreen('menu')}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="戻る"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">利用規約</h2>
            </div>

            {/* 規約内容 */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <h3 className="font-bold text-lg mb-4">学びリンク 利用規約</h3>
                
                <div className="space-y-4 text-sm text-gray-700">
                  <section>
                    <h4 className="font-bold mb-2">第1条（適用）</h4>
                    <p>本規約は、本サービスの提供条件及び本サービスの利用に関する当社と登録ユーザーとの間の権利義務関係を定めることを目的とし、登録ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。</p>
                  </section>

                  <section>
                    <h4 className="font-bold mb-2">第2条（利用登録）</h4>
                    <p>登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。</p>
                  </section>

                  <section>
                    <h4 className="font-bold mb-2">第3条（禁止事項）</h4>
                    <p>登録ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>法令または公序良俗に違反する行為</li>
                      <li>犯罪行為に関連する行為</li>
                      <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                      <li>当社のサービスの運営を妨害するおそれのある行為</li>
                      <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-bold mb-2">第4条（本サービスの提供の停止等）</h4>
                    <p>当社は、以下のいずれかの事由があると判断した場合、登録ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
                  </section>

                  <section>
                    <h4 className="font-bold mb-2">第5条（著作権）</h4>
                    <p>本サービスに関する著作権は、当社または正当な権利を有する第三者に帰属します。</p>
                  </section>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('menu')}
                className="w-full mt-6 py-4 rounded-lg border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                閉じる
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}