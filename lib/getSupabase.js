// Client-side helper to initialize Supabase using public/config.json
// Keeps code JavaScript-only (no TypeScript). Returns a cached client.
let cached = null;

export async function getSupabase() {
  if (cached) return cached;
  if (typeof window === 'undefined') {
    throw new Error('getSupabase must be called from the browser');
  }
  // load config.json emitted to /public by scripts/generate-config.js
  const res = await fetch('/config.json');
  if (!res.ok) throw new Error('config.json の読み込みに失敗しました');
  const cfg = await res.json();
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) throw new Error('Supabase 設定が正しくありません');

  // dynamic import via eval to avoid bundler resolving https: during build
  const module = await eval('import("https://esm.sh/@supabase/supabase-js@2")');
  const createClient = module.createClient || module.default?.createClient || module.createClient;
  if (!createClient) throw new Error('Unable to load supabase client');

  cached = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  return cached;
}
