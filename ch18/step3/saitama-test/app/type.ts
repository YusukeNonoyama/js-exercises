export type CityData = {
  kanji: string;
  yomi: string;
  "hard-to-read": string;
  merged?: string;
};

export type JsonQuizData = {
  [year: string]: CityData[];
};

export type RankAllData = { [category: string]: number[] };

export type RankData = number[];

export type JsonRankData = {
  ranking: RankAllData;
};

export type DataSelection =
  | "current"
  | "current-hard"
  | "heisei"
  | "heisei-hard"
  | "heisei-merged"
  | "test";
