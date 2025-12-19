"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STORIES = {
  momotaro: {
    title: "桃太郎",
    text: "むかしむかし、あるところに、おじいさんとおばあさんが住んでいました。おじいさんは山へしばかりに、おばあさんは川へせんたくに行きました。おばあさんが川でせんたくをしていると、ドンブラコ、ドンブラコと、大きな桃が流れてきました。おばあさんは桃を家に持ち帰り、おじいさんと二人で桃を切ってみると、中から元気な男の子が生まれました。二人は男の子を桃太郎と名付けて、大切に育てました。桃太郎はすくすくと育ち、とても強い子になりました。ある日、桃太郎は鬼が島の鬼を退治しに行くことを決心しました。おばあさんが作ってくれたきびだんごを持って、桃太郎は旅に出ました。途中で、犬と猿とキジに出会い、きびだんごをあげて仲間にしました。四人は力を合わせて鬼が島に着き、鬼と戦いました。桃太郎たちは見事に鬼を退治し、鬼が盗んだ宝物を取り返しました。そして、みんなで村に帰り、おじいさんとおばあさんと幸せに暮らしましたとさ。めでたし、めでたし。"
  },
  kintaro: {
    title: "金太郎",
    text: "むかしむかし、足柄山に金太郎という男の子が住んでいました。金太郎はとても力持ちで、まさかりをかついで山の中を駆け回っていました。金太郎は動物たちと仲良しで、クマやウサギやサルたちと一緒に遊んでいました。ある日、金太郎は動物たちと相撲をとって遊びました。金太郎はクマにも負けない強さでした。ある日、都から偉い侍が山にやってきました。侍は金太郎の強さに驚き、都へ連れて行きました。金太郎は立派な武士になりました。"
  },
  kaguyahime: {
    title: "かぐや姫",
    text: "むかしむかし、竹取りのおじいさんが山で竹を切っていると、光る竹を見つけました。竹の中には小さな女の子がいました。おじいさんとおばあさんは、かぐや姫と名付けて育てました。かぐや姫はとても美しい娘に育ちました。多くの人が結婚を申し込みましたが、かぐや姫は断りました。ある夜、かぐや姫は月へ帰ることを話しました。十五夜の晩、月の使いが来て、かぐや姫は月へ帰っていきました。"
  },
  urashima: {
    title: "浦島太郎",
    text: "むかしむかし、浦島太郎という若者がいました。ある日、子どもたちにいじめられている亀を助けました。後日、亀は竜宮城へ案内してくれました。竜宮城では楽しい日々を過ごしました。帰るとき、玉手箱をもらいました。村へ戻ると、長い年月が経っていました。玉手箱を開けると、太郎はおじいさんになってしまいました。"
  }
};

export default function ReadPage() {
  const [storyKey, setStoryKey] = useState("momotaro");
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);

  const utterRef = useRef(null);

  useEffect(() => {
    const s = STORIES[storyKey];
    const list = s.text.match(/[^。]+。/g) || [s.text];
    setSentences(list);
    setCurrentIndex(0);
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  }, [storyKey]);

  const readNext = () => {
    if (currentIndex >= sentences.length) {
      setIsReading(false);
      return;
    }

    const u = new SpeechSynthesisUtterance(sentences[currentIndex]);
    u.lang = "ja-JP";
    u.rate = rate;
    u.pitch = 1.1;

    u.onend = () => {
      setCurrentIndex((i) => i + 1);
    };

    utterRef.current = u;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    if (isReading && !isPaused) {
      readNext();
    }
    // eslint-disable-next-line
  }, [currentIndex]);

  const play = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }
    if (!isReading) {
      setIsReading(true);
    }
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl p-8 shadow-2xl">

        <Link href="/learning" className="text-sm text-blue-600">← 学習ページに戻る</Link>

        <h1 className="text-2xl text-center text-indigo-600 my-6">
          📚 読み聞かせページ 📖
        </h1>

        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={storyKey}
          onChange={(e) => setStoryKey(e.target.value)}
        >
          {Object.entries(STORIES).map(([k, v]) => (
            <option key={k} value={k}>{v.title}</option>
          ))}
        </select>

        <div className="flex gap-2 mb-4">
          <button onClick={play} className="flex-1 bg-green-500 text-white rounded-lg p-2">▶ 再生</button>
          <button onClick={pause} className="flex-1 bg-yellow-500 text-white rounded-lg p-2">⏸ 一時停止</button>
          <button onClick={stop} className="flex-1 bg-red-500 text-white rounded-lg p-2">⏹ 停止</button>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span>速度</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="font-bold">{rate.toFixed(1)}x</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 max-h-[350px] overflow-y-auto">
          <h2 className="text-xl text-center text-indigo-600 mb-4">
            {STORIES[storyKey].title}
          </h2>

          <p className="text-xl leading-loose whitespace-pre-line">
            {sentences.map((s, i) => (
              <span
                key={i}
                className={
                  i === currentIndex && isReading
                    ? "bg-yellow-300 font-bold"
                    : ""
                }
              >
                {s}
              </span>
            ))}
          </p>
        </div>

      </div>
    </div>
  );
}
