export type DataSelection =
  | "current"
  | "current-hard"
  | "heisei"
  | "heisei-hard"
  | "heisei-merged"
  | "test";

export type CityData = {
  kanji: string;
  yomi: string;
  "hard-to-read": string;
  merged?: string;
};

export type JsonQuizData = {
  [year: string]: CityData[];
};

export type RankData = number[];

export type RankAllData = { [category: string]: RankData };

export type JsonRankData = {
  ranking: RankAllData;
};
