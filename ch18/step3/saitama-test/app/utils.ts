import { JsonQuizData, JsonRankData } from "./type";

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 100);

  if (minutes) {
    return `${minutes.toString()}分${seconds
      .toString()
      .padStart(2, "0")}秒${milliseconds.toString().padStart(1, "0")}`;
  } else {
    return `${seconds.toString().padStart(2, "0")}秒${milliseconds
      .toString()
      .padStart(1, "0")}`;
  }
}

export const loadQuizData = async () => {
  // const res = await fetch("/quiz-data.json");
  const res = await fetch("/api/quiz-data");
  const json: JsonQuizData = await res.json();
  return json["2026"];
};

export const loadRankData = async () => {
  const res = await fetch("/api/rank-data");
  const json: JsonRankData = await res.json();
  return json["ranking"];
};
