const graphemeSegmenter = new Intl.Segmenter('ja',{granularity:'grapheme'})
const text = "家族👨‍👩‍👧‍👦"
const graphemeSegments = graphemeSegmenter.segment(text)
console.log(JSON.stringify([...graphemeSegments].map(s => s.segment).reverse()));

// 実行コマンド： node ch07/ex08/index.js
// 実行結果：
// ["👨‍👩‍👧‍👦","族","家"]
// ※ コンソールだと"\u{1F468}", "u{1F469}", "\u{1F467}", "\u{1F466}"の４人になるがエディタにコピーすると↑の結果になる
// ターミナルのフォントのレンダリング設定のせいだと生成AIはいう。他のフォントも試したが解消できず。
// ※ブラウザで試したらうまくいった。ただし、`<meta charset="UTF-8">`で明示的にエンコーダ指定ないと文字化けした。


// const familyEmoji = "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}";
// console.log(familyEmoji); // 👨‍👩‍👧‍👦



