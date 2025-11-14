/* ==================== グローバル変数 ==================== */
let users = {
    "test@user.com": { name: "テスト保護者", password: "password" } // テスト用アカウント
};          
let experts = {
    "test@expert.com": { name: "テスト専門家", password: "password" } // テスト用アカウント
};        
let currentUser = null;  
let currentExpert = null; 
let currentFontSize = 'medium'; 

/* ==================== ページ遷移・UI制御 (最重要機能) ==================== */
/**
 * 指定されたIDのページを表示し、他のページを非表示にします。
 * @param {string} id - 表示するページのHTML ID。
 */
function showPage(id) {
    // 全ページを非表示 (activeクラスを削除)
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // 指定ページ要素を取得
    const el = document.getElementById(id);
    if (el) {
        // 指定ページを表示 (activeクラスを追加)
        el.classList.add('active');

        // エラーメッセージをクリア
        const errorIds = ['loginError', 'registerError', 'expertLoginError', 'expertRegisterError', 'passwordError', 'emailError'];
        errorIds.forEach(id => {
            const errEl = document.getElementById(id);
            if (errEl) errEl.style.display = 'none';
        });

        // ページトップへスクロール
        window.scrollTo(0, 0);
    } else {
        // 要素がこのドキュメント内に無い場合は、別ファイルへ遷移する
        if (id === 'login') { window.location.href = 'login/'; return; }
        if (id === 'register') { window.location.href = 'register/'; return; }
        if (id === 'home') { window.location.href = '/'; return; }
        // その他は何もしない
        return;
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function toggleMenu() {
    const menu = document.getElementById('menuOverlay');
    const backdrop = document.getElementById('menuBackdrop');
    menu.classList.toggle('open');
    backdrop.classList.toggle('open');
}

/* ==================== 認証処理 ==================== */
function handleRegister() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email2').value.trim();
    const password = document.getElementById('password2').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    if (!name || !email || !password || !passwordConfirm) { showError('registerError', '入力していません'); return; }
    if (password !== passwordConfirm) { showError('registerError', 'パスワードが一致しません'); return; }
    if (users[email]) { showError('registerError', 'このメールアドレスは既に登録されています'); return; }

    users[email] = { name: name, password: password };
    alert('保護者として登録が完了しました');
    showPage('login');
}

function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) { showError('loginError', '入力していません'); return; }
    if (!users[email] || users[email].password !== password) { showError('loginError', 'メールアドレスかパスワードが一致していません'); return; }

    currentUser = users[email];
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    showPage('dashboard');
}

function handleExpertRegister() {
    const name = document.getElementById('expertName').value.trim();
    const email = document.getElementById('expertEmail2').value.trim();
    const password = document.getElementById('expertPassword2').value;
    const passwordConfirm = document.getElementById('expertPasswordConfirm').value;

    if (!name || !email || !password || !passwordConfirm) { showError('expertRegisterError', '入力していません'); return; }
    if (password !== passwordConfirm) { showError('expertRegisterError', 'パスワードが一致しません'); return; }
    if (experts[email]) { showError('expertRegisterError', 'このメールアドレスは既に登録されています'); return; }

    experts[email] = { name: name, password: password };
    alert('専門家として登録が完了しました');
    showPage('expertLogin');
}

function handleExpertLogin() {
    const email = document.getElementById('expertEmail').value.trim();
    const password = document.getElementById('expertPassword').value;

    if (!email || !password) { showError('expertLoginError', '入力していません'); return; }
    if (!experts[email] || experts[email].password !== password) { showError('expertLoginError', 'メールアドレスかパスワードが一致していません'); return; }

    currentExpert = experts[email];
    alert(`専門家（${currentExpert.name}）としてログインしました（ホームへ戻ります）`);
    showPage('home'); 
}

function handleLogout() {
    currentUser = null;
    currentExpert = null;
    showPage('home');
}

/* ==================== 設定関連 ==================== */
function handlePasswordReset() {
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirm = document.getElementById('newPasswordConfirm').value;

    if (!newPassword || !newPasswordConfirm) { showError('passwordError', '入力していません'); return; }
    if (newPassword !== newPasswordConfirm) { showError('passwordError', 'パスワードが一致していません'); return; }

    // ユーザー情報の更新 (currentUserがいる前提)
    if (currentUser) {
        const userEmail = Object.keys(users).find(email => users[email] === currentUser);
        if (userEmail) {
            users[userEmail].password = newPassword;
            currentUser.password = newPassword;
        }
    } 

    showError('passwordError', 'パスワードが変更されました');
    showPage('settings');
}

function handleEmailReset() {
    const newEmail = document.getElementById('newEmail').value.trim();
    const newEmailConfirm = document.getElementById('newEmailConfirm').value.trim();

    if (!newEmail || !newEmailConfirm) { showError('emailError', '入力していません'); return; }
    if (newEmail !== newEmailConfirm) { showError('emailError', 'メールアドレスが一致していません'); return; }
    if (users[newEmail]) { showError('emailError', 'このメールアドレスは既に使用されています'); return; }

    // ユーザー情報の更新 (currentUserがいる前提)
    if (currentUser) {
        const oldEmail = Object.keys(users).find(email => users[email] === currentUser);
        if (oldEmail) {
            users[newEmail] = users[oldEmail];
            delete users[oldEmail];
        }
    } 

    showError('emailError', 'メールアドレスが変更されました');
    showPage('settings');
}

function changeFontSize(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add('font-' + size);
    currentFontSize = size;
    
    document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.font-btn.' + size).classList.add('active');
}

// 初期表示
document.addEventListener('DOMContentLoaded', () => {
    // ページロード時の初期表示設定
    if (document.getElementById('home')) {
        showPage('home');
    } else {
        // ホームがなければ、このページ内の最初の .page を表示
        const first = document.querySelector('.page');
        if (first) first.classList.add('active');
    }
    // 現在のフォントサイズを適用
    changeFontSize(currentFontSize);
});