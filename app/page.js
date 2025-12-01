export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">学びリンク</h1>
          <p className="text-gray-600">保護者と子どものための学習支援サイト（Next.js に移行済み）</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/learnig" className="block p-6 bg-pink-50 rounded-lg shadow">学習ページ</a>
          <a href="/article" className="block p-6 bg-yellow-50 rounded-lg shadow">記事一覧</a>
          <a href="/communication" className="block p-6 bg-green-50 rounded-lg shadow">掲示板</a>
        </section>
      </div>
    </main>
  );
}
