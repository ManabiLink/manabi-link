'use client'

import React, { useState } from 'react';
import { getSupabase } from '@/lib/getSupabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');

    const [loading, setLoading] = useState(false);

    // Supabase クライアントは `getSupabase()` で取得（public/config.json を使用）


    // 以下、同じコード...
    const showMessage = (text, type = 'info') => {
        setMessage(text);
        setMessageType(type);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            showMessage('メールアドレスとパスワードを入力してください', 'error');
            return;
        }

        setLoading(true);
        try {
            const supabase = await getSupabase();
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                showMessage(error.message || 'ログインに失敗しました', 'error');
            } else {
                showMessage('ログインしました!', 'success');
                console.log('Session:', data.session);
                // ログイン成功時にトップへリダイレクト
                router.push('/');
            }
        } catch (error) {
            showMessage('ログイン中にエラーが発生しました', 'error');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!nickname || !email || !password || !confirmPassword) {
            showMessage('すべての項目を入力してください', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showMessage('パスワードが一致しません', 'error');
            return;
        }
        if (password.length < 6) {
            showMessage('パスワードは6文字以上で設定してください', 'error');
            return;
        }

        setLoading(true);
        try {
            const supabase = await getSupabase();
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { nickname },
                },
            });
            if (error) {
                showMessage(error.message || '登録に失敗しました', 'error');
            } else {
                showMessage('登録が完了しました! 確認メールをご確認ください。', 'success');
                setTimeout(() => {
                    setCurrentPage('login');
                    setPassword('');
                    setConfirmPassword('');
                    setNickname('');
                }, 2000);
            }
        } catch (error) {
            showMessage('登録中にエラーが発生しました', 'error');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            showMessage('メールアドレスを入力してください', 'error');
            return;
        }

        setLoading(true);
        try {
            const supabase = await getSupabase();
            const { data, error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) {
                showMessage(error.message || 'メール送信に失敗しました', 'error');
            } else {
                showMessage('パスワードリセットのメールを送信しました', 'success');
            }
        } catch (error) {
            showMessage('メール送信中にエラーが発生しました', 'error');
            console.error('Password reset error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e, action) => {
        if (e.key === 'Enter' && !loading) {
            action();
        }
    };

    const getMessageStyles = () => {
        switch (messageType) {
            case 'success':
                return 'bg-green-50 text-green-700 border border-green-200';
            case 'error':
                return 'bg-red-50 text-red-700 border border-red-200';
            default:
                return 'bg-blue-50 text-blue-700 border border-blue-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-pink-500">学びリンク</h1>
                    <div className="flex gap-4">
                        {currentPage !== 'login' && (
                            <button
                                onClick={() => {
                                    setCurrentPage('login');
                                    setMessage('');
                                }}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ログイン
                            </button>
                        )}
                        {currentPage !== 'register' && (
                            <button
                                onClick={() => {
                                    setCurrentPage('register');
                                    setMessage('');
                                }}
                                className="text-pink-500 hover:text-pink-600"
                            >
                                登録
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-md mx-auto mt-16 px-4">
                {/* Login Page */}
                {currentPage === 'login' && (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">ログイン</h2>

                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">メールアドレス</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">パスワード</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                                    placeholder="パスワードを入力"
                                />
                            </div>

                            {message && (
                                <div className={`mb-4 p-3 rounded-md text-sm ${getMessageStyles()}`}>
                                    {message}
                                </div>
                            )}

                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? '処理中...' : 'ログイン'}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setCurrentPage('forgot');
                                    setMessage('');
                                }}
                                disabled={loading}
                                className="text-pink-500 hover:text-pink-600 text-sm disabled:text-gray-400"
                            >
                                パスワードをお忘れの方はこちら
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <span className="text-gray-600 text-sm">アカウントをお持ちでない方は </span>
                            <button
                                onClick={() => {
                                    setCurrentPage('register');
                                    setMessage('');
                                }}
                                disabled={loading}
                                className="text-pink-500 hover:text-pink-600 text-sm font-semibold disabled:text-gray-400"
                            >
                                新規登録
                            </button>
                        </div>
                    </div>
                )}

                {/* Register Page */}
                {currentPage === 'register' && (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">新規登録</h2>

                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">ニックネーム</label>
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                                    placeholder="ニックネームを入力"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">メールアドレス</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">パスワード</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                                    placeholder="6文字以上で入力"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">パスワード(確認用)</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                                    placeholder="パスワードを再入力"
                                />
                            </div>

                            <div className="mb-6 text-sm text-gray-600">
                                登録することで、<span className="text-pink-500">プライバシーポリシー</span>に同意したものとみなされます。
                            </div>

                            {message && (
                                <div className={`mb-4 p-3 rounded-md text-sm ${getMessageStyles()}`}>
                                    {message}
                                </div>
                            )}

                            <button
                                onClick={handleRegister}
                                disabled={loading}
                                className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? '処理中...' : '登録する'}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="text-gray-600 text-sm">すでにアカウントをお持ちの場合は </span>
                            <button
                                onClick={() => {
                                    setCurrentPage('login');
                                    setMessage('');
                                }}
                                disabled={loading}
                                className="text-pink-500 hover:text-pink-600 text-sm font-semibold disabled:text-gray-400"
                            >
                                ログイン
                            </button>
                        </div>
                    </div>
                )}

                {/* Forgot Password Page */}
                {currentPage === 'forgot' && (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">パスワードをお忘れの方</h2>

                        <p className="text-gray-600 mb-6">
                            登録されたメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。
                        </p>

                        <div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">メールアドレス</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, handleForgotPassword)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
                                    placeholder="example@email.com"
                                />
                            </div>

                            {message && (
                                <div className={`mb-4 p-3 rounded-md text-sm ${getMessageStyles()}`}>
                                    {message}
                                </div>
                            )}

                            <button
                                onClick={handleForgotPassword}
                                disabled={loading}
                                className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? '送信中...' : '送信する'}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setCurrentPage('login');
                                    setMessage('');
                                }}
                                disabled={loading}
                                className="text-pink-500 hover:text-pink-600 text-sm disabled:text-gray-400"
                            >
                                ログイン画面に戻る
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}