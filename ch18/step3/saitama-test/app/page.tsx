"use client";

import { useState, useEffect, useRef } from "react";
import Clock from "./components/Clock";
import KeyboardDisplay from "./components/KeyboardDisplay";
import ValueSelection from "./components/ValueSelection";
import StartButton from "./components/StartButton";
import {
  formatTime,
  loadQuizData,
  loadAllRankData,
  saveRankAllData,
  selectQUizData,
} from "./utils";
import { CityData, RankData, DataSelection } from "./type";

export default function Home() {
  const [quizData, setQuizData] = useState<CityData[]>([]);
  const [quizDataIndex, setQuizDataIndex] = useState<number>(0);
  const [rankData, setRankData] = useState<RankData>([]);

  const [isOnGame, setIsOnGame] = useState<boolean>(false);

  const startTimeRef = useRef<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameTimeResult, setGameTimeResult] = useState<string | null>(null);

  const [dataSelection, setDataSelection] = useState<DataSelection>("current");

  // データ選択の度に実行
  useEffect(() => {
    const loadData = async () => {
      // クイズデータの読み込み
      const loadedQuizDataJson = await loadQuizData();
      selectQUizData(dataSelection, loadedQuizDataJson, setQuizData);
      // ランクデータの読み込み
      const loadedRankData = await loadAllRankData();
      setRankData(loadedRankData[dataSelection]);
    };
    loadData();
  }, [dataSelection]);

  // キーボード操作
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQuizDataIndex(0);
        setElapsedTime(0);
        setIsOnGame(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rankData, elapsedTime, quizData, isOnGame]);

  useEffect(() => {
    const judgeOver = async () => {
      const newRankData = [...rankData];

      if (quizData.length === quizDataIndex) {
        setIsOnGame(false);
        // gameResultはelapsedTimeから計算できるから不要か？
        setGameTimeResult(formatTime(elapsedTime));
        setElapsedTime(elapsedTime);
        // ランキング変更
        newRankData.push(elapsedTime);
        newRankData.sort((x, y) => {
          if (x === null) return 1; // x が null → 後ろへ
          if (y === null) return -1; // y が null → 後ろへ
          return x - y; // 数値は昇順
        });
        newRankData.splice(3);
        setRankData([...newRankData]);

        const loadedRankAllData = await loadAllRankData();
        const newRankAllData = { ...loadedRankAllData };
        newRankAllData[dataSelection] = newRankData;

        await saveRankAllData(newRankAllData);

        setQuizDataIndex(0);
      }
    };
    judgeOver();
  }, [quizDataIndex]);

  // タイピング中のタイマー表示
  useEffect(() => {
    if (!isOnGame) return;

    startTimeRef.current = Date.now();

    const id = setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedTime(Date.now() - startTimeRef.current);
      }
    }, 100);

    return () => clearInterval(id);
  }, [isOnGame]);

  const progress =
    quizData.length > 0
      ? ((quizDataIndex / quizData.length) * 100).toFixed(0)
      : 0;

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Glow Decorations */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full" />

      {/* Header Info */}
      <nav className="flex justify-between items-center p-8 backdrop-blur-md bg-slate-900/40 border-b border-slate-800">
        <h1 className="text-2xl font-black tracking-tighter bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          SAITAMA TYPING{" "}
        </h1>
        <Clock />
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        {!isOnGame ? (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="space-y-2">
              <h2 className="text-6xl font-bold tracking-tight">
                埼玉タイピング
              </h2>
            </div>
            <div>
              <ValueSelection
                setDataSelection={setDataSelection}
                dataSelection={dataSelection}
              />
            </div>
            <StartButton
              setIsOnGame={setIsOnGame}
              startTimeRef={startTimeRef}
            />
            {gameTimeResult ? <p>Previous Result: {gameTimeResult}</p> : null}
            {rankData.map((data, i) =>
              data ? (
                <p key={i}>
                  {i + 1}. {formatTime(data)}
                </p>
              ) : (
                <p key={i}>{i + 1}. no data</p>
              ),
            )}
            <p>
              <a
                href="https://mapfan.com/pref/11"
                target="_blank"
                rel="noopener noreferrer"
              >
                2026年時点の地図
              </a>
              <br />
              <a
                href="https://www.kokudo.or.jp/marge/tdfk.php?tdfk_cd=11"
                target="_blank"
                rel="noopener noreferrer"
              >
                1990年時点の地図
              </a>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-12">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Kanji Display */}
            <div className="text-center space-y-4">
              <div className="text-8xl font-bold animate-in slide-in-from-bottom-4 duration-300">
                {quizData.length
                  ? quizData[quizDataIndex]?.kanji
                  : "Loading..."}
              </div>
            </div>
            {/* Input Component */}
            <div className="bg-slate-900/50 p-10 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
              <KeyboardDisplay
                key={quizDataIndex}
                targetData={quizData[quizDataIndex]?.yomi}
                setQuizDataIndex={setQuizDataIndex}
              />
            </div>
            <p>{formatTime(elapsedTime)}</p>
            <p className="text-center text-slate-500 font-mono text-sm">
              ESC to Quit • {quizDataIndex + 1} / {quizData.length} Cities
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
