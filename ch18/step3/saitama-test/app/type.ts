export type CityData = {
  kanji: string;
  yomi: string;
  "hard-to-read": string;
  merged?: string;
};

export type RankData = number[];

export type JsonQuizData = {
  [year: string]: CityData[];
};

export type JsonRankData = {
  ranking: RankData;
};

export type DataSelection =
  | "current"
  | "current-hard"
  | "heisei"
  | "heisei-hard"
  | "heisei-merged"
  | "test";
