// Symbol()
let symbol_a = Symbol("banana");
let symbol_b = Symbol("banana");

let object_banana = {};
object_banana[symbol_a] = 1;
object_banana[symbol_b] = 2;

console.log(object_banana[symbol_a]);
console.log(object_banana[symbol_b]);

console.log(symbol_a === symbol_b); // 別のSymbolのためfalse

// Symbol.for()
let symbol_c = Symbol.for("pinapple");
let symbol_d = Symbol.for("pinapple"); // 文字列"pinapple"に対応するSymbolは既にsymbol_cがあるため、これがsymbol_dに返される

let object_pinapple = {};
object_pinapple[symbol_c] = 3;
// object_pinapple[symbol_d] = 4

console.log(object_pinapple[symbol_c]);
console.log(object_pinapple[symbol_d]);

console.log(symbol_c === symbol_d); // 同じ場所を参照しているためtrue
