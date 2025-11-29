// Initialize Supabase by fetching generated /config.json
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

async function initSupabase() {
    try {
        const res = await fetch('/config.json');
        if (!res.ok) throw new Error('config.json not found');
        const supabaseConfig = await res.json();

        if (!supabaseConfig.supabaseUrl || !supabaseConfig.supabaseAnonKey) {
            throw new Error('Supabase config is invalid');
        }

        const supabase = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseAnonKey);

        window.supabase = supabase;

        const { data: { session } } = await supabase.auth.getSession();
        window.dispatchEvent(new CustomEvent('supabaseAuthChanged', { detail: session ? session.user : null }));

        supabase.auth.onAuthStateChange((_event, session) => {
            window.dispatchEvent(new CustomEvent('supabaseAuthChanged', { detail: session ? session.user : null }));
        });
    } catch (e) {
        console.warn('Supabase not initialized:', e.message);
    }
}
initSupabase();