"use client";

import { useEffect, useState } from "react";
import Clock from "./components/Clock";

type SaitamaData = {
  value: string;
  image: string;
};

export default function Home() {
  const [data, setData] = useState<SaitamaData[]>([]);
  const [current, setCurrent] = useState<SaitamaData | null>(null);

  // Load JSON
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("/data.json");
      const json: SaitamaData[] = await res.json();
      setData(json);
      setCurrent(json[Math.floor(Math.random() * json.length)]);
    };

    loadData();
  }, []);

  // Update image & text every 5 seconds
  useEffect(() => {
    if (data.length === 0) return;

    const timer = setInterval(() => {
      const random = Math.floor(Math.random() * data.length);
      setCurrent(data[random]);
    }, 5000);

    return () => clearInterval(timer);
  }, [data]);

  return (
    <>
      <Clock />

      <div className="flex flex-col items-center">
        <img
          src={current?.image ?? "/images/3.png"}
          alt="画像の説明"
          width={700}
          className="block"
        />

        <label className="text-[28px] w-[1000px] text-center mt-2">
          {current?.value ?? "saitama"}
        </label>
      </div>
    </>
  );
}
