"use client";

import { useState, useEffect } from "react";
import Clock from "./components/Clock";
import KeyboardDisplay from "./components/KeyboardDisplay";
import StartButton from "./components/StartButton";

type CityData = {
  kanji: string;
  yomi: string;
};

type JsonData = {
  [year: string]: CityData[];
};

export default function Home() {
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<CityData[]>([]);
  const [isOnGame, setIsOnGame] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/data.json");
        const json: JsonData = await res.json();
        setData(json["2026"]);
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isOnGame) {
        setIndex((prev) => {
          const next = prev + 1;
          if (next >= data.length) {
            setIsOnGame(false);
            return 0;
          }
          return next;
        });
      } else if (event.key === "Escape") {
        setIndex(0);
        setIsOnGame(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data, isOnGame]);

  const progress =
    data.length > 0 ? ((index / data.length) * 100).toFixed(0) : 0;

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Glow Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full" />

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
            <StartButton setIsOnGame={setIsOnGame} />
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
                {data.length ? data[index].kanji : "Loading..."}
              </div>
            </div>

            {/* Input Component */}
            <div className="bg-slate-900/50 p-10 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
              <KeyboardDisplay key={index} targetData={data[index].yomi} />
            </div>

            <p className="text-center text-slate-500 font-mono text-sm">
              ESC to Quit • {index + 1} / {data.length} Cities
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
