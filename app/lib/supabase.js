import { createClient } from '@supabase/supabase-js'

// Next.js でブラウザから使う場合は NEXT_PUBLIC_ プレフィックスの環境変数を使用します
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 環境変数が未定義でもアプリが起動するように、エラー投げを避けます。
// 必要に応じてサーバー側でのチェックを追加してください。
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')