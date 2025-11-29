// Initialize Firebase by fetching generated /config.json
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateEmail,
    sendPasswordResetEmail,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

async function initFirebase() {
    try {
        const res = await fetch('/config.json');
        if (!res.ok) throw new Error('config.json not found');
        const firebaseConfig = await res.json();
        const app = initializeApp(firebaseConfig);
        try { getAnalytics(app); } catch (e) { /* analytics optional */ }

        const auth = getAuth(app);
        // expose to non-module script
        window.firebaseAuth = auth;
        window.firebaseAPI = {
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            signOut,
            updatePassword,
            updateEmail,
            sendPasswordResetEmail,
            onAuthStateChanged,
            updateProfile
        };

        // 通知用イベント
        onAuthStateChanged(auth, user => {
            window.dispatchEvent(new CustomEvent('firebaseAuthChanged', { detail: user }));
        });
    } catch (e) {
        console.warn('Firebase not initialized:', e.message);
    }
}

initFirebase();