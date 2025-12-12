"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';

export default function Nav(){
  const [user, setUser] = useState(null);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    let sub = null;
    let mounted = true;
    (async () => {
      try {
        const sb = await supabase();
        if (!mounted) return;
        setSupabase(sb);
        const { data: { session } = {} } = await sb.auth.getSession().catch(()=>({}));
        setUser(session?.user ?? null);

        sub = sb.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
      } catch (e) {
        console.error('supabase init error', e);
      }
    })();

    return () => { mounted = false; if (sub && typeof sub.unsubscribe === 'function') sub.unsubscribe(); };
  }, []);

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    // redirect to home
    window.location.href = '/';
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold text-pink-600">学びリンク</Link>
        </div>
        <nav>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">{user?.user_metadata?.display_name ?? user?.email ?? 'ユーザー'}</span>
              <button onClick={signOut} className="px-3 py-1 border rounded text-sm">ログアウト</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-700">ログイン</Link>
              <Link href="/register" className="text-sm text-pink-600">登録</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
