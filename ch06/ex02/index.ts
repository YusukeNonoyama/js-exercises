// 独自プロパティを持つオブジェクト
let o1 = { x: 1, y: 2 };
// そのオブジェクトをプロトタイプとして持つ新しいオブジェクト
let o2 = Object.create(o1);

console.log(o2); // {}
console.log(Object.getPrototypeOf(o2)); // { x: 1, y: 2 }

console.log(o2.x); // 1
console.log(o2.y); // 2

// プロパティが渡されている

console.log(Object.getPrototypeOf(o2) === o1); // { x: 1, y: 2 }
