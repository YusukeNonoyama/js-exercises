// 日本語文字列の配列を受け取り、文字列中の大文字・小文字("つ"と"っ"等)、
// 濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする sortJapanese 関数
export function sortJapanese(input: string[]) {
  for (const letter of input) {
    const japaneseRegex = /[\u3040-\u30FF\u4E00-\u9FFF\uFF65-\uFF9F]/;
    if (!japaneseRegex.test(letter)) {
      throw new Error("Invalid letters are included");
    }
  }
  const collator = Intl.Collator("ja", { sensitivity: "base" }).compare;
  return input.sort(collator);
}

// Date オブジェクトを受け取り、令和6年4月2日 のように (和暦)y年m月d日 のフォーマットで日付の文字列を返す
// toJapaneseDateString 関数
export function toJapaneseDateString(date: Date) {
  console.log(date);
  const dateJp = Intl.DateTimeFormat(
    "ja-JP-u-ca-japanese", // 和暦を選べる
    { dateStyle: "long" }, //　年月日のスタイルを選べる
  ).format(date);
  return dateJp;
}

// 参考リンク
// https://github.com/unicode-org/cldr/blob/17b4fac37d9a0f323579e9a21f452a6688d1b648/common/main/ja.xml#L3590-L3830

// const date = new Date("2025-06-26T11:49:38.999Z");
// toJapaneseDateString(date);

// const a = sortJapanese(["ぱ", "は", "ば", "つ", "っ"]);
// console.log(a);
