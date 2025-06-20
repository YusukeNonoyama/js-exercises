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

const data2: Data[] = [...data];

data.sort((a, b) => b["geography"] - a["geography"]);
data.sort((a, b) => b["chemistry"] - a["chemistry"]);
data.sort((a, b) => b["math"] - a["math"]);
console.log(data);



const dataSorted = data2.sort((a, b) => {
    if (a.math !== b.math) {
        return b.math - a.math;
    } else if (a.chemistry !== b.chemistry) {
        return b.chemistry - a.chemistry;
    } else {
        return b.geography - a.geography;
    }
});

console.log(dataSorted);



// 実行コマンド： node ch07/ex06/index.js
// 結果：
// [
//   { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
//   { name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30 },
//   { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
//   { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
//   { name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90 },
//   { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
//   { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
//   { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
//   { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 }
// ]