export function reverse(text: string){
// function reverse(text){
    // 日本のロケールでテキストのセグメンテーションする。"grapheme"は人間が1文字ととらえる最小単位
    const graphemeSegmenter = new Intl.Segmenter('ja',{granularity:'grapheme'})
    // 抽出されるobjectは"{segment:<抽出した１文字>, index: <>, input: <入力文字列>}"の形式
    const graphemeSegments = graphemeSegmenter.segment(text)
    // 抽出した文字のリストを作る → reverse() → 文字列として繋げる
    return [...graphemeSegments].map(s => s.segment).reverse().join("");
}

// console.log(reverse("家族 👨‍👨‍👧‍👧"));

// 結果：
// 👨‍👨‍👧‍👧 族家
// ※ コンソールだと"\u{1F468}", "u{1F469}", "\u{1F467}", "\u{1F466}"の４人になるがエディタにコピーすると↑の結果になる
// ターミナルのフォントのレンダリング設定が原因というが（生成AI）、他のフォントも試したが解消できず。
// ※ブラウザで試したらうまくいった。（`<meta charset="UTF-8">`で明示的にエンコーダ指定ないと文字化けした）

// const familyEmoji = "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}";
// console.log(familyEmoji); // 👨‍👩‍👧‍👦



