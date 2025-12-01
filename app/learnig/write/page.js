"use client";
import { useEffect, useRef, useState } from 'react';

const HIRAGANA_ROWS = {
  'あ段': ['あ','い','う','え','お'],
  'か段': ['か','き','く','け','こ'],
  'さ段': ['さ','し','す','せ','そ'],
  'た段': ['た','ち','つ','て','と'],
  'な段': ['な','に','ぬ','ね','の'],
  'は段': ['は','ひ','ふ','へ','ほ'],
  'ま段': ['ま','み','む','め','も'],
  'や段': ['や','ゆ','よ'],
  'ら段': ['ら','り','る','れ','ろ'],
  'わ段': ['わ','を','ん']
};

const KATAKANA_ROWS = {
  'ア段': ['ア','イ','ウ','エ','オ'],
  'カ段': ['カ','キ','ク','ケ','コ'],
  'サ段': ['サ','シ','ス','セ','ソ'],
  'タ段': ['タ','チ','ツ','テ','ト'],
  'ナ段': ['ナ','ニ','ヌ','ネ','ノ'],
  'ハ段': ['ハ','ヒ','フ','ヘ','ホ'],
  'マ段': ['マ','ミ','ム','メ','モ'],
  'ヤ段': ['ヤ','ユ','ヨ'],
  'ラ段': ['ラ','リ','ル','レ','ロ'],
  'ワ段': ['ワ','ヲ','ン']
};

const ALPHABET_GROUPS = {
  'ABC': ['A','B','C','D','E'],
  'FGH': ['F','G','H','I','J'],
  'KLM': ['K','L','M','N','O'],
  'PQRS': ['P','Q','R','S','T'],
  'TUVWXYZ': ['U','V','W','X','Y','Z']
};

export default function WritePage() {
  const [type, setType] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupKeys, setGroupKeys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(()=>{
    if (!type) return;
    const data = type === 'hiragana' ? HIRAGANA_ROWS : type === 'katakana' ? KATAKANA_ROWS : ALPHABET_GROUPS;
    setGroupKeys(Object.keys(data));
    setGroups(data);
    setCurrentIndex(0);
  }, [type]);

  useEffect(()=>{
    setupCanvas();
    // cleanup
    return ()=>{
      const c = canvasRef.current;
      if (c) {
        c.onpointerdown = null;
        c.onpointermove = null;
        c.onpointerup = null;
      }
    };
  }, [groups, currentIndex]);

  function selectType(t) {
    setType(t);
    setGroups([]);
    setGroupKeys([]);
  }

  function selectDan(key) {
    const data = type === 'hiragana' ? HIRAGANA_ROWS : type === 'katakana' ? KATAKANA_ROWS : ALPHABET_GROUPS;
    setGroups(data[key]);
    setCurrentIndex(0);
  }

  function setupCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = 'bold 250px Arial';
    ctx.fillStyle = '#ddd';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const char = Array.isArray(groups) && groups.length ? groups[currentIndex] : '';
    if (char) ctx.fillText(char, canvas.width/2, canvas.height/2);
    historyRef.current = [];
    saveHistory();

    let drawing = false;

    canvas.onpointerdown = (e) => {
      drawing = true;
      saveHistory();
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };
    canvas.onpointerup = () => {
      drawing = false;
      ctx.beginPath();
    };
    canvas.onpointermove = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.lineWidth = 15;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#667eea';
      ctx.lineTo(x, y);
      ctx.stroke();
    };
  }

  function saveHistory() {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    historyRef.current.push(ctx.getImageData(0,0,canvas.width,canvas.height));
    if (historyRef.current.length > 50) historyRef.current.shift();
  }

  function undo() {
    setType(null);
    setGroups([]);
    setGroupKeys([]);
    setCurrentIndex(0);
  }

  function startTracing() {
    // redraw current char
    setupCanvas();
  }

  function readAloud() {
    const char = Array.isArray(groups) && groups.length ? groups[currentIndex] : '';
    if (!char) return;
    const u = new SpeechSynthesisUtterance(char);
    u.lang = type === 'alphabet' ? 'en-US' : 'ja-JP';
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }

  function nextChar() {
    if (!Array.isArray(groups) || !groups.length) return;
    setCurrentIndex((prev) => (prev + 1) % groups.length);
  }

  function prevChar() {
    if (!Array.isArray(groups) || !groups.length) return;
    setCurrentIndex((prev) => (prev - 1 + groups.length) % groups.length);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-100 p-8">
      <div className="container bg-white rounded-3xl p-8 shadow-2xl w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">🌈 もじの おけいこ 🌈</h1>

        <div className="selection-buttons mb-4 flex justify-center gap-4">
          <button className="select-btn hiragana px-4 py-2 rounded-lg text-white bg-pink-400" onClick={()=>selectType('hiragana')}>ひらがな</button>
          <button className="select-btn katakana px-4 py-2 rounded-lg text-white bg-blue-400" onClick={()=>selectType('katakana')}>カタカナ</button>
          <button className="select-btn alphabet px-4 py-2 rounded-lg text-white bg-green-400" onClick={()=>selectType('alphabet')}>アルファベット</button>
        </div>

        <div className="dan-buttons mb-4 flex gap-2 flex-wrap justify-center">
          {groupKeys.map((k)=> (
            <button key={k} className="dan-btn bg-indigo-600 text-white px-3 py-2 rounded-lg" onClick={()=>selectDan(k)}>{k}</button>
          ))}
        </div>

        <div className="display-area mb-4">
          {(!groups || !groups.length) ? (
            <div className="text-gray-500">上のボタンを おしてね！</div>
          ) : (
            <>
              <canvas id="traceCanvas" ref={canvasRef} width={400} height={400} className="mx-auto rounded-lg border-2" />
              <div className="mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg" onClick={undo}>↩️ 戻る</button>
              </div>
            </>
          )}
        </div>

        <div className="action-buttons mb-4 flex gap-4 justify-center">
          <button className="action-btn px-4 py-2 rounded-lg bg-pink-500 text-white" onClick={startTracing}>🔄 もういちど</button>
          <button className="action-btn read-btn px-4 py-2 rounded-lg bg-teal-400 text-white" onClick={readAloud}>🔊 よみきかせ</button>
        </div>

        <div className="nav-buttons flex gap-4 justify-center">
          <button className="nav-btn px-4 py-2 rounded-lg bg-indigo-500 text-white" onClick={prevChar}>⬅️ まえ</button>
          <button className="nav-btn px-4 py-2 rounded-lg bg-indigo-500 text-white" onClick={nextChar}>つぎ ➡️</button>
        </div>
      </div>
    </div>
  );
}
