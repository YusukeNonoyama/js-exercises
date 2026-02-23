"use client";

import { useEffect, useState } from "react";

type Time = {
  h: string;
  m: string;
  s: string;
};

export default function Clock() {
  const [time, setTime] = useState<Time>({
    h: "--",
    m: "--",
    s: "--",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        h: String(now.getHours()).padStart(2, "0"),
        m: String(now.getMinutes()).padStart(2, "0"),
        s: String(now.getSeconds()).padStart(2, "0"),
      });
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-5 font-sans">
      <span className="text-[48px]">
        {time.h}:{time.m}
      </span>
      <span className="text-[24px] align-baseline">:{time.s}</span>
    </div>
  );
}
