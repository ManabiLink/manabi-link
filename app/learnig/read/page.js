"use client";
import { useEffect, useRef, useState } from 'react';

const STORIES = {
  momotaro: {
    title: '桃太郎',
    text: `むかしむかし、あるところに、おじいさんとおばあさんが住んでいました。おじいさんは山へしばかりに、おばあさんは川へせんたくに行きました。おばあさんが川でせんたくをしていると、ドンブラコ、ドンブラコと、大きな桃が流れてきました。おばあさんは桃を家に持ち帰り、おじいさんと二人で桃を切ってみると、中から元気な男の子が生まれました。二人は男の子を桃太郎と名付けて、大切に育てました。桃太郎はすくすくと育ち、とても強い子になりました。ある日、桃太郎は鬼が島の鬼を退治しに行くことを決心しました。おばあさんが作ってくれたきびだんごを持って、桃太郎は旅に出ました。途中で、犬と猿とキジに出会い、きびだんごをあげて仲間にしました。四人は力を合わせて鬼が島に着き、鬼と戦いました。桃太郎たちは見事に鬼を退治し、鬼が盗んだ宝物を取り返しました。そして、みんなで村に帰り、おじいさんとおばあさんと幸せに暮らしましたとさ。めでたし、めでたし。`
  },
  kintaro: {
    title: '金太郎',
    text: `むかしむかし、足柄山に金太郎という男の子が住んでいました。金太郎はとても力持ちで、まさかりをかついで山の中を駆け回っていました。金太郎は動物たちと仲良しで、クマやウサギやサルたちと一緒に遊んでいました。ある日、金太郎は動物たちと相撲をとって遊びました。金太郎はクマにも負けない強さでした。山の動物たちはみんな、金太郎が大好きでした。ある日、都から偉い侍が山にやってきました。侍は金太郎の強さを見て、とても驚きました。侍は金太郎を都に連れて行き、立派な武士に育てることにしました。金太郎は坂田金時という名前をもらい、源頼光という大将の家来になりました。金太郎は都でも活躍し、とても強い武士になりました。そして、鬼退治でも大活躍したそうです。めでたし、めでたし。`
  },
  kaguyahime: {
    title: 'かぐや姫',
    text: `むかしむかし、竹取りのおじいさんが山で竹を切っていると、光る竹を見つけました。竹を切ってみると、中に小さな女の子がいました。おじいさんとおばあさんは女の子をかぐや姫と名付けて、大切に育てました。かぐや姫はすくすくと育ち、とても美しい女性になりました。その後、竹の中から金や宝石が出てくるようになり、おじいさんの家は大金持ちになりました。かぐや姫の美しさの噂は広まり、たくさんの人が結婚を申し込みにきました。しかし、かぐや姫は誰とも結婚しませんでした。ある日、かぐや姫は悲しそうに月を見上げて言いました。私は月の都の人間です。もうすぐ月に帰らなければなりません。おじいさんとおばあさんは悲しみましたが、止めることはできませんでした。十五夜の夜、月から迎えが来て、かぐや姫は月へ帰っていきました。おじいさんとおばあさんは、とても悲しみましたとさ。`
  },
  urashima: {
    title: '浦島太郎',
    text: `むかしむかし、浦島太郎という漁師の若者がいました。ある日、太郎が浜辺を歩いていると、子供たちがカメをいじめているのを見つけました。太郎はカメを助けてあげました。数日後、太郎が漁に出ると、カメが現れて言いました。先日は助けていただき、ありがとうございました。お礼に竜宮城へご案内します。太郎はカメの背中に乗って、海の中の竜宮城へ行きました。竜宮城では乙姫様が太郎を歓迎し、美しい魚たちの踊りでもてなしました。太郎は楽しい時間を過ごしましたが、やがて家が心配になり、帰ることにしました。乙姫様は玉手箱を渡して言いました。困ったときに開けてください。でも、それまでは決して開けてはいけません。太郎は村に帰りましたが、村の様子が全く変わっていました。竜宮城で過ごした数日は、地上では何百年も経っていたのです。悲しくなった太郎は、つい玉手箱を開けてしまいました。すると、中から白い煙が出て、太郎はあっという間におじいさんになってしまいましたとさ。`
  }
};

export default function ReadPage() {
  const [storyKey, setStoryKey] = useState('momotaro');
  const [sentences, setSentences] = useState([]);
  const [index, setIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const utterRef = useRef(null);

  useEffect(() => {
    loadStory(storyKey);
    return () => {
      if (utterRef.current) window.speechSynthesis.cancel();
    };
  }, [storyKey]);

  function loadStory(key) {
    const s = STORIES[key];
    const ss = s.text.match(/[^。]+。/g) || [s.text];
    setSentences(ss);
    setIndex(0);
    setIsReading(false);
    setIsPaused(false);
  }

  function playStory() {
    if (!sentences.length) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsReading(true);
      return;
    }
    if (isReading) return;
    setIsReading(true);
    setIsPaused(false);
    readNext(index);
  }

  function readNext(idx) {
    if (idx >= sentences.length) {
      stopStory();
      return;
    }
    setIndex(idx);
    const u = new SpeechSynthesisUtterance(sentences[idx]);
    u.lang = 'ja-JP';
    u.rate = rate;
    u.pitch = 1.1;
    u.onend = () => {
      if (!isPaused) readNext(idx + 1);
    };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  }

  function pauseStory() {
    if (isReading && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsReading(false);
    }
  }

  function stopStory() {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
    setIndex(0);
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-500 to-indigo-700 flex items-start justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl text-center text-indigo-600 mb-6">📚 読み聞かせページ 📖</h1>

        <div className="mb-4">
          <select className="w-full p-3 border rounded-lg" value={storyKey} onChange={(e)=>setStoryKey(e.target.value)}>
            <option value="momotaro">桃太郎</option>
            <option value="kintaro">金太郎</option>
            <option value="kaguyahime">かぐや姫</option>
            <option value="urashima">浦島太郎</option>
          </select>
        </div>

        <div className="flex gap-3 mb-4">
          <button onClick={playStory} className="flex-1 py-2 rounded-lg bg-green-500 text-white">▶ 再生</button>
          <button onClick={pauseStory} className="flex-1 py-2 rounded-lg bg-orange-400 text-white">⏸ 一時停止</button>
          <button onClick={stopStory} className="flex-1 py-2 rounded-lg bg-red-500 text-white">⏹ 停止</button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="font-bold">速度:</label>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e)=>setRate(parseFloat(e.target.value))} />
          <div className="text-indigo-600 font-medium">{rate.toFixed(1)}x</div>
        </div>

        <div className="story-content mb-4 p-6 bg-gray-50 rounded-lg min-h-[200px]">
          <div className="text-xl font-bold text-center text-indigo-600 mb-4">{STORIES[storyKey].title}</div>
          <div>
            {sentences.map((s, i) => (
              <span key={i} className={`sentence ${i===index && isReading ? 'reading font-bold bg-yellow-200' : ''}`} data-index={i}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center p-3 bg-blue-50 text-blue-700 rounded-md">{isReading ? '読み聞かせ中...' : isPaused ? '一時停止中' : '物語を選んで再生ボタンを押してください'}</div>
      </div>
    </div>
  );
}
