"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STORIES = {
  momotaro: {
    title: "桃太郎",
    text: `むかしむかし、あるところに、おじいさんとおばあさんが住んでいました。おじいさんは山へしばかりに、おばあさんは川へせんたくに行きました。おばあさんが川でせんたくをしていると、ドンブラコ、ドンブラコと、大きな桃が流れてきました。おばあさんは桃を家に持ち帰り、おじいさんと二人で桃を切ってみると、中から元気な男の子が生まれました。二人は男の子を桃太郎と名付けて、大切に育てました。桃太郎はすくすくと育ち、とても強い子になりました。ある日、桃太郎は鬼が島の鬼を退治しに行くことを決心しました。おばあさんが作ってくれたきびだんごを持って、桃太郎は旅に出ました。途中で、犬と猿とキジに出会い、きびだんごをあげて仲間にしました。四人は力を合わせて鬼が島に着き、鬼と戦いました。桃太郎たちは見事に鬼を退治し、鬼が盗んだ宝物を取り返しました。そして、みんなで村に帰り、おじいさんとおばあさんと幸せに暮らしましたとさ。めでたし、めでたし。`,
  },
  kintaro: {
    title: "金太郎",
    text: `むかしむかし、足柄山に金太郎という男の子が住んでいました。金太郎はとても力持ちで、まさかりをかついで山の中を駆け回っていました。`,
  },
  kaguyahime: {
    title: "かぐや姫",
    text: `むかしむかし、竹取りのおじいさんが山で竹を切っていると、光る竹を見つけました。`,
  },
  urashima: {
    title: "浦島太郎",
    text: `むかしむかし、浦島太郎という漁師の若者がいました。`,
  },
};

export default function ReadPage() {
  const [storyKey, setStoryKey] = useState("momotaro");
  const [sentences, setSentences] = useState([]);
  const [index, setIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const utterRef = useRef(null);

  useEffect(() => {
    const s = STORIES[storyKey];
    const ss = s.text.match(/[^。]+。/g) || [s.text];
    setSentences(ss);
    setIndex(0);
    return () => window.speechSynthesis.cancel();
  }, [storyKey]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-500 to-indigo-700 flex items-start justify-center">
      <div className="max-w-3xl w-full">
        <Link
          href="/learnig"
          className="inline-block mb-4 px-4 py-2 text-white bg-pink-500 rounded-lg"
        >
          ← 学習ページに戻る
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl text-center text-indigo-600 mb-6">
            📚 読み聞かせページ 📖
          </h1>

          <select
            className="w-full p-3 border rounded-lg mb-4"
            value={storyKey}
            onChange={(e) => setStoryKey(e.target.value)}
          >
            <option value="momotaro">桃太郎</option>
            <option value="kintaro">金太郎</option>
            <option value="kaguyahime">かぐや姫</option>
            <option value="urashima">浦島太郎</option>
          </select>

          <div className="text-center text-blue-700 bg-blue-50 p-3 rounded">
            準備完了
          </div>
        </div> {/* ← ★ これが抜けてた */}
      </div>
    </div>
  );
}
