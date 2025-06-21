type Data = {
    name: string,
    class: string,
    math: number,
    chemistry: number,
    geography: number
}

const data: Data[] = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// 1.mathの全員の合計点
let mathSum = 0;
data.forEach(x => mathSum += x["math"]);
console.log(mathSum);   // 530

// 1.mathの全員の合計点 reduce()バージョン
const mathSum2 = data.reduce((sum, x) => {
    return sum + x.math;
}, 0);
console.log(mathSum2);  // 530

// 2.クラスAのchemistryの平均点
let chemSum = 0;
const dataA = data.filter(x => x["class"] === "A");
dataA.forEach(x => chemSum += x["chemistry"]);
console.log(chemSum / dataA.length);   // 45

// 2.クラスAのchemistryの平均点 reduce()バージョン
const dataA2 = data.filter(x => x["class"] === "A");
const chemTotalA = dataA2.reduce((sum, x) => {
    return sum + x.chemistry
}, 0)
console.log(chemTotalA / dataA2.length);  // 45

// 3.3科目合計点のクラスC内での平均点
const dataC = data.filter(x => x["class"] === "C");
let sumTotalC = 0;
dataC.forEach(x => {
    sumTotalC += x["math"] + x["chemistry"] + x["geography"];
});
console.log(sumTotalC / dataC.length);  // 176.66666666666666

// 3.3科目合計点のクラスC内での平均点　reduce()バージョン
const dataC2 = data.filter(x => x.class === "C");
const sumInC = dataC2.reduce((sum, x) => {
    return sum + x.math + x.chemistry + x.geography;
}, 0);
console.log(sumInC / dataC2.length);     // 176.66666666666666

// 4.3科目合計点が最も高い人のname
let champ_object = data.reduce((x: Data, y: Data) => {
    const xTotal = x["math"] + x["chemistry"] + x["geography"];
    const yTotal = y["math"] + y["chemistry"] + y["geography"];
    return (xTotal > yTotal) ? x : y;
}, {} as Data);
console.log(champ_object["name"]);  // frank

// 5.全体のgeographyの標準偏差
let geoSum = 0;
data.forEach(x => geoSum += x["geography"]);
let geoAvg = geoSum / data.length;   // 49.44444444444444 (geographyの平均点)
let geoDiffSqSum = 0;
data.forEach(x => {
    geoDiffSqSum += (x["geography"] - geoAvg) ** 2  // 平均との差分の二乗の和をforEachで求める
});
console.log((geoDiffSqSum / (data.length - 1)) ** (1 / 2)); // 23.687784005919827

// 5.全体のgeographyの標準偏差  reduce()バージョン
const geoSum2 = data.reduce((sum, x) => {
    return sum + x.geography;
}, 0);
const geoAvg2 = geoSum2 / data.length;   // 49.44444444444444 (geographyの平均点) 
const geoDiffSqSum2 = data.reduce((sum, x) => {
    return sum + (x.geography - geoAvg2) ** 2;  // 平均との差分の二乗の和をreduceで求める
}, 0);
console.log((geoDiffSqSum2 / (data.length - 1)) ** (1 / 2)); // 23.687784005919827