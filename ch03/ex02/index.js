console.log("最大値： ", Number.MAX_VALUE);
console.log("最小値： ", Number.MIN_VALUE);

console.log("最大値＋１： ", Number.MAX_VALUE + 1);

console.log("最大値＋１と最大値＋２の比較： ", (Number.MAX_VALUE + 1) === (Number.MAX_VALUE + 2));

// => true 
// 表現可能な桁より下の数の加算のため無視されて両方とも最大値のままとなるため 

// 最大値：  1.7976931348623157e+308
// 最小値：  5e-324
// 最大値＋１：  1.7976931348623157e+308
// 最大値＋１と最大値＋２の比較：  true