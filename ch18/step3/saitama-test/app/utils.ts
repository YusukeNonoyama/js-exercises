import {
  CityData,
  JsonQuizData,
  JsonRankData,
  RankAllData,
  DataSelection,
} from "./type";

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
  return json;
};

export const selectQUizData = (
  dataSelection: DataSelection,
  loadedQuizDataJson: JsonQuizData,
  setQuizData: React.Dispatch<React.SetStateAction<CityData[]>>,
) => {
  if (dataSelection === "heisei-hard") {
    const filterQuizDataFunc = (cityData: CityData) => {
      return cityData["hard-to-read"];
    };
    const loadedQuizData = shuffleArray<CityData>(loadedQuizDataJson["1983"]);
    setQuizData(loadedQuizData.filter(filterQuizDataFunc));
  } else if (dataSelection === "heisei-merged") {
    const filterQuizDataFunc = (cityData: CityData) => {
      return cityData["merged"];
    };
    const loadedQuizData = shuffleArray<CityData>(loadedQuizDataJson["1983"]);
    setQuizData(loadedQuizData.filter(filterQuizDataFunc));
  } else if (dataSelection === "heisei") {
    const loadedQuizData = shuffleArray<CityData>(loadedQuizDataJson["1983"]);
    setQuizData(loadedQuizData);
  } else if (dataSelection === "current") {
    const loadedQuizData = shuffleArray<CityData>(loadedQuizDataJson["2026"]);
    setQuizData(loadedQuizData);
  } else if (dataSelection === "current-hard") {
    const filterQuizDataFunc = (cityData: CityData) => {
      return cityData["hard-to-read"];
    };
    const loadedQuizData = shuffleArray<CityData>(loadedQuizDataJson["2026"]);
    setQuizData(loadedQuizData.filter(filterQuizDataFunc));
  } else if (dataSelection === "test") {
    const loadedQuizData = shuffleArray<CityData>(loadedQuizDataJson["test"]);
    setQuizData(loadedQuizData);
  }
};

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0..i
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}

export const loadAllRankData = async () => {
  const res = await fetch("/api/rank-data");
  const json: JsonRankData = await res.json();
  return json["ranking"];
};

export const saveRankAllData = async (rankAllData: RankAllData) => {
  try {
    await fetch("/api/rank-data", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ranking: rankAllData }),
    });
    console.log("Data saved successfully!");
  } catch (e) {
    console.error("Failed to save data", e);
  }
};
