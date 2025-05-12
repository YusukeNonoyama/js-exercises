const data = [
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


// 2.クラスAのchemistryの平均点
let chemSum = 0;
data.forEach(x => chemSum += x["chemistry"]);
console.log(chemSum / data.length);   // 49.44444444444444


// 3.科目合計点のクラスC内での平均点
const arrayC = data.filter(x => x["class"] === "C");
let sumTotalC = 0;
arrayC.forEach(x => sumTotalC = sumTotalC + x["math"] + x["chemistry"] + x["geography"]);
console.log(sumTotalC / (arrayC.length * 3));   // 58.888888888888886


// 4.科目合計点が最も高い人のname
let nameAndTotal = [];
data.forEach(x => {
    nameAndTotal.push({"name": x["name"], "total": x["math"] + x["chemistry"] + x["geography"]})
})
// console.log(nameAndTotal);
let maxTotal = 0;
let champion = "";
nameAndTotal.forEach(x => {
    if(x["total"] > maxTotal) {
        maxTotal = x["total"];
        champion = x["name"];    
    }
});
console.log(champion);  // frank


// 5.全体のgeographyの標準偏差
