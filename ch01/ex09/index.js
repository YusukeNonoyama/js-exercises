//
class DefaultMap extends Map {
  constructor(defaultValue) {
    super(); // Invoke superclass constructor
    this.defaultValue = defaultValue; // Remember the default value
  }

  get(key) {
    if (this.has(key)) {
      // If the key is already in the map
      return super.get(key); // return its value from superclass.
    } else {
      return this.defaultValue; // Otherwise return the default value
    }
  }
}

// 単語頻度を計算するクラス
class WordHistogram {
  constructor() {
    this.wordCounts = new DefaultMap(0); // MAPオブジェクト作成
    this.totalWords = 0;
  }

  // histogram
  add(text) {
    // Remove whitespace from the text, and convert to upper case
    // word([単語, カウント数])の配列を正規表現で抽出
    const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
    // matchesから単語のみを抽出した配列を作成
    const words = [...matches].map((r) => r[0]);
    // 単語配列をループ
    for (let word of words) {
      let count = this.wordCounts.get(word); // Get old count
      this.wordCounts.set(word, count + 1); // Increment it
      this.totalWords++;
    }
  }

  // histogramをソートして文字列形式に変換
  toString() {
    // Convert the Map to an array of [key,value] arrays
    let entries = [...this.wordCounts];

    // wordのカウント数順にソート、カウント数が同じならアルファベット順
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1; // trueだとa → b（-1）、falseだとb → a（1）
      } else {
        return b[1] - a[1]; // カウントが大きい方が先
      }
    });
    // Convert the counts to percentages
    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalWords) * 100;
    }
    //// ch01/ex09の変更箇所
    // 出現頻度 0.5% 以上を取得
    entries = entries.filter((entry) => entry[1] >= 0.5);
    // padStart で表示幅を揃える / # の数を n ではなく 10 * n に変更
    const lines = entries.map(
      ([l, n]) =>
        `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`,
    );
    ////
    // And return the concatenated lines, separated by newline characters.
    return lines.join("\n");
  }
}

// ターミナルの入力を一行ずつ読んでMAP(histogram)を返す
async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8"); // ターミナルの入力を取得
  let histogram = new WordHistogram();
  // ターミナルの入力を一行ずつhistogram.add()で処理
  for await (let chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}

// histogramFromStdin()を呼び出し、そのreturnの値(histogram)をコンソールに文字列形式変換して出力
histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});

// ターミナル上の実行コマンド
// `cat ch01\ex09\hamlet.txt | node ch01/ex09/index.js`
