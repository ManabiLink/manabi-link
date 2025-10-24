document.addEventListener('DOMContentLoaded', () => {
    const articleCards = document.querySelectorAll('.article-card');
    const modal = document.getElementById('article-modal');
    const closeButton = document.querySelector('.close-button');
    const modalBody = document.getElementById('modal-article-body');

    // 記事の内容のダミーデータ（IDに応じて内容を出し分けます）
    const articles = {
        '1': { 
            title: '子どもの集中力を高めるヒント', 
            body: '子どもが課題に集中できる時間を延ばすためには、「短時間の区切り」と「環境整備」が鍵です。まず、タイマーを使って15分間集中するルールを作りましょう。次に、机の上から余計なものを片付け、静かで落ち着ける環境を作ることが大切です。短い成功体験を積み重ねることで、集中力が自然と向上します。' 
        },
        '2': { 
            title: '朝食の重要性と簡単レシピ', 
            body: '朝食は、子どもの脳と体のエネルギー源です。特に午前中の集中力と記憶力に直結します。忙しい朝でも簡単に作れる「オーバーナイトオーツ」や「具沢山の味噌汁」など、手早く栄養を摂れるレシピを取り入れましょう。少しの工夫で、一日を元気にスタートできます。' 
        },
        // 他の記事も同様に内容を追加できます
        '3': { title: 'デジタル機器との付き合い方', body: '本文3...' },
        '4': { title: '効果的な褒め方・叱り方', body: '本文4...' },
        '5': { title: '学習のモチベーション維持法', body: '本文5...' },
        '6': { title: '親子のコミュニケーション術', body: '本文6...' },
        '7': { title: '家庭での安全対策チェックリスト', body: '本文7...' },
        '8': { title: '学力向上につながる読書法', body: '本文8...' },
    };

    // --- 記事カードをクリックしたときの処理 ---
    articleCards.forEach(card => {
        card.addEventListener('click', () => {
            const articleId = card.getAttribute('data-article-id');
            const articleData = articles[articleId];
            
            if (articleData) {
                // 記事の内容をモーダルにセット
                modalBody.innerHTML = `
                    <h2>${articleData.title}</h2>
                    <p>${articleData.body}</p>
                    <p>※この記事は、保護者の方に役立つ情報を提供するために作成されました。</p>
                `;
            } else {
                 modalBody.innerHTML = '<h2>記事が見つかりません</h2><p>選択された記事IDの情報が存在しません。</p>';
            }

            // モーダルを表示
            modal.style.display = 'block';
            // 短い遅延を挟んでis-activeを付与し、CSSアニメーションを有効にする
            setTimeout(() => {
                modal.classList.add('is-active');
            }, 10); 
        });
    });

    // --- モーダルを閉じるための関数 ---
    function closeModal() {
        modal.classList.remove('is-active');
        // アニメーション（0.3秒）が終わってから非表示にする
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); 
    }
    
    // --- モーダルを閉じるためのイベントリスナー ---
    
    // 1. 閉じるボタンがクリックされたとき
    closeButton.addEventListener('click', closeModal);

    // 2. モーダル背景（コンテンツ外）がクリックされたとき
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 3. Escキーが押されたとき
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });
});