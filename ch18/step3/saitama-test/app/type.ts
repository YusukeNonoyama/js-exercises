export type CityData = {
  kanji: string;
  yomi: string;
};

export type RankData = number[];

export type JsonQuizData = {
  [year: string]: CityData[];
};

export type JsonRankData = {
  ranking: RankData;
};
