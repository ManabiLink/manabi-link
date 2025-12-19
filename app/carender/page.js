"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const HOLIDAYS = {
  "2025-01-01": "元日", "2025-01-13": "成人の日", "2025-02-11": "建国記念の日",
  "2025-02-23": "天皇誕生日", "2025-03-20": "春分の日", "2025-04-29": "昭和の日",
  "2025-05-03": "憲法記念日", "2025-05-04": "みどりの日", "2025-05-05": "こどもの日",
  "2025-07-21": "海の日", "2025-08-11": "山の日", "2025-09-15": "敬老の日",
  "2025-09-23": "秋分の日", "2025-10-13": "スポーツの日", "2025-11-03": "文化の日",
  "2025-11-23": "勤労感謝の日"
};

function pad(n){ return String(n).padStart(2,'0'); }

export default function Page(){
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()+1);
  const [events, setEvents] = useState({});
  const [meds, setMeds] = useState({});

  useEffect(() => {
    try { setEvents(JSON.parse(localStorage.getItem('events')||'{}')); } catch {}
    try { setMeds(JSON.parse(localStorage.getItem('meds')||'{}')); } catch {}
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [mode, setMode] = useState('normal');
  const [editorVisible, setEditorVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notify, setNotify] = useState('');

  useEffect(()=>{ localStorage.setItem('events', JSON.stringify(events)); }, [events]);
  useEffect(()=>{ localStorage.setItem('meds', JSON.stringify(meds)); }, [meds]);

  useEffect(()=>{
    if ('Notification' in window) Notification.requestPermission();
    const t = setInterval(()=>{
      checkAndNotify(events);
      checkAndNotify(meds);
    }, 60000);
    return ()=>clearInterval(t);
  }, [events, meds]);

  function checkAndNotify(dataset){
    const nowStr = new Date().toISOString().slice(0,16);
    for (const ev of Object.values(dataset)){
      if (ev.notify === nowStr && Notification.permission === 'granted'){
        new Notification(ev.title || '予定', { body: ev.body || '通知です💖' });
      }
    }
  }

  function openEditorFor(date){
    setSelectedDate(date);
    const data = (mode === 'normal' ? events : meds)[date] || {};
    setTitle(data.title || '');
    setBody(data.body || '');
    setNotify(data.notify || '');
    setEditorVisible(true);
  }

  function save(){
    if (!selectedDate) return;
    if (notify && notify < new Date().toISOString().slice(0,16)){
      alert('通知日時は現在以降に設定してください💖');
      return;
    }
    if (mode === 'normal'){
      setEvents({...events, [selectedDate]: { title, body, notify }});
    } else {
      setMeds({...meds, [selectedDate]: { title, body, notify }});
    }
    setEditorVisible(false);
  }

  function remove(){
    if (!selectedDate) return;
    if (mode === 'normal'){
      const o = {...events}; delete o[selectedDate]; setEvents(o);
    } else {
      const o = {...meds}; delete o[selectedDate]; setMeds(o);
    }
    setEditorVisible(false);
  }

  const calendar = useMemo(()=>{
    const firstDay = new Date(year, month-1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const rows = [];
    let row = [];
    for (let i=0;i<firstDay;i++) row.push(null);
    for (let d=1; d<=daysInMonth; d++){
      row.push(d);
      if (row.length === 7){ rows.push(row); row = []; }
    }
    while (row.length < 7) row.push(null);
    if (row.length) rows.push(row);
    return rows;
  }, [year, month]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link href="/" className="inline-block mb-4 px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600">
        ← ホームに戻る
      </Link>

      <h1 className="text-2xl font-bold text-pink-600 mb-4">成長日記💖</h1>

      <div className="flex gap-3 mb-4">
        <button
          className={`px-3 py-2 rounded ${mode==='normal'?'bg-pink-500 text-white':''}`}
          onClick={()=>{setMode('normal'); setEditorVisible(false);}}
        >
          📅 通常カレンダー
        </button>
        <button
          className={`px-3 py-2 rounded ${mode==='med'?'bg-pink-500 text-white':''}`}
          onClick={()=>{setMode('med'); setEditorVisible(false);}}
        >
          💊 お薬手帳
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex gap-3 justify-center mb-3">
          <select value={year} onChange={e=>setYear(+e.target.value)} className="border px-2 py-1">
            {Array.from({length:11}).map((_,i)=>{
              const y = 2020+i;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
          <select value={month} onChange={e=>setMonth(+e.target.value)} className="border px-2 py-1">
            {Array.from({length:12}).map((_,i)=>{
              const m = i+1;
              return <option key={m} value={m}>{m}</option>;
            })}
          </select>
        </div>

        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-pink-600">
              {['日','月','火','水','木','金','土'].map(d=>(
                <th key={d} className="text-right p-2">{d}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {calendar.map((row, ri)=>(
              <tr key={ri}>
                {row.map((d, ci)=>{
                  if (!d) return <td key={ci}></td>;
                  const ymd = `${year}-${pad(month)}-${pad(d)}`;
                  const dataSet = mode==='normal' ? events : meds;
                  const has = dataSet[ymd];
                  const isHoliday = mode==='normal' && HOLIDAYS[ymd];

                  return (
                    <td
                      key={ci}
                      className={`align-top p-2 cursor-pointer ${isHoliday?'text-red-500':''}`}
                      onClick={()=>openEditorFor(ymd)}
                    >
                      <div className="text-right">
                        <strong>{d}</strong>
                        {isHoliday && (
                          <div className="text-xs">{HOLIDAYS[ymd]}</div>
                        )}
                      </div>

                      {has && (
                        <div className="mt-2 bg-pink-200 text-white rounded px-2 py-1 text-xs text-right">
                          {has.title}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editorVisible && (
        <div className="bg-white rounded shadow p-4 mt-4">
          <h3 className="font-semibold mb-2">{selectedDate}</h3>
          <input
            className="w-full border p-2 mb-2"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="タイトル"
          />
          <textarea
            className="w-full border p-2 mb-2"
            value={body}
            onChange={e=>setBody(e.target.value)}
            placeholder="内容"
            rows={4}
          />
          <label className="block mb-1">通知日時：</label>
          <input
            type="datetime-local"
            className="border p-2 mb-3"
            value={notify}
            onChange={e=>setNotify(e.target.value)}
            min={new Date().toISOString().slice(0,16)}
          />
          <div className="flex gap-3">
            <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={save}>保存</button>
            <button className="px-4 py-2 border rounded" onClick={remove}>削除</button>
            <button className="px-4 py-2 border rounded" onClick={()=>setEditorVisible(false)}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}
