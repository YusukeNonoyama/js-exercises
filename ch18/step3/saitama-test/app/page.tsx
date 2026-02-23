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
  const [data, setData] = useState<JsonData>({});
  const [isOnGame, setIsOnGame] = useState<boolean>(false);

  console.log("index: ", index);
  console.log("isOnGame: ", isOnGame);

  // ENTERでゲーム開始
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (isOnGame === false) return;

        const cities = data["2026"] ?? [];
        setIndex((prev) => {
          const next = prev + 1;
          // ゲーム終了判定
          if (next >= cities.length) {
            setIsOnGame(false);
            return 0; // リセット
          }
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data, isOnGame]);

  // 初回のみデータ読み込み
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("/data.json");
      const json: JsonData = await res.json();
      setData(json);
    };
    loadData();
  }, []);

  return (
    <>
      <Clock />
      <div className="flex flex-col items-center text-[48px]">
        埼玉タイピング検定
      </div>
      {JSON.stringify(
        data["2026"]?.length
          ? data["2026"][index]?.kanji ?? "Out of range"
          : "Loading...",
      )}
      <KeyboardDisplay isOnGame={isOnGame} />
      <StartButton isOnGame={isOnGame} setIsOnGame={setIsOnGame} />
    </>
  );
}
