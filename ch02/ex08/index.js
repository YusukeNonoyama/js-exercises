import * as acorn from "acorn";

let input_string_a = `let a
a
=
3
console.log(a)`

let input_string_b = `let a; a = 3; console.log(a);`

let input_string_example = `1 + 1`

let ast_a = acorn.parse(input_string_a, { ecmaVersion: 2025}, {onToken: true} );
console.log("ast output:");
console.log(JSON.stringify(ast_a, null, 2));

let ast_b = acorn.parse(input_string_b, { ecmaVersion: 2025}, {onToken: true} );
console.log("ast output:");
console.log(JSON.stringify(ast_b, null, 2));

let ast_example = acorn.parse(input_string_example, { ecmaVersion: 2025}, {onToken: true} );
console.log("ast output:");
console.log(JSON.stringify(ast_example, null, 2));