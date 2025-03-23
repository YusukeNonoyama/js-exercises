import * as acorn from "acorn";

export function removeSemicolon(input_string) {

    // input_stringがJavascriptではない場合はそのままreturn
    try {
        acorn.parse(input_string, { ecmaVersion: 2025 })
    } catch (SyntaxError) {
        console.log("Not a Javascript code")
        return input_string;
    }

    // semicolonの中で行の中間にあるものを抽出
    let intermediate_colons_index = [];
    let total_colon_count = 0;
    let input_lines = input_string.split('\n');
    for (let line of input_lines) {
        let colon_count = line.split(";").length - 1;
        console.log("colon count: " ,colon_count);
        console.log("total_colon_count", total_colon_count);
        if (colon_count >= 2) {
            for (let i = 0 ; i < colon_count-1; i++) {
                intermediate_colons_index.push(i + total_colon_count);
                console.log(i + total_colon_count);
            }
        }
        total_colon_count += colon_count;
        console.log("total colon count for line ", line, ": ",total_colon_count)
    }

    console.log("intermediate_colons_index: ", intermediate_colons_index)

    // Get tokens
    let tokens = [...acorn.tokenizer(input_string, { ecmaVersion: 2025 })];
    console.log("token analysis start...");
    console.log("======================");

    // Get semicolon index array from tokens
    let semicolon_index_array = [];
    let semicolon_index = 0;
    for (let token of tokens) {
        // console.log(token);
        if (token['value'] !== undefined) {
            // console.log(semicolon_index, ": ", token['value']);
        } else if (token['type']['label'] === ';') {
            semicolon_index_array.push(semicolon_index);
            // console.log(semicolon_index, ": ", ";");
        } else {
            // console.log(semicolon_index, ": ", token['type']['label']);
        }
        semicolon_index++;
    }

    console.log("======================");

    console.log("all semicolon index:")
    console.log(semicolon_index_array);

    console.log("======================");

    // 行の最後のsemicolonのみを削除対象にする
    for (let i of intermediate_colons_index.reverse()) {
        semicolon_index_array.splice(i, 1);
    }

    console.log("remove semicolon index:")
    console.log(semicolon_index_array);

    // 次の行の始めが"("の場合は削除対象から除外
    let element_index = 1;
    semicolon_index_array = semicolon_index_array.reverse()
    for (let i of semicolon_index_array.slice(1, semicolon_index_array.length)) {
        console.log("i: ", i);
        if (tokens[i + 1].type.label === '(') {
            console.log("i before (: ", i);
            semicolon_index_array.splice(element_index, 1);
        }
        element_index++;
    }

    console.log("remove semicolon index2:")
    console.log(semicolon_index_array);

    console.log("======================");

    // Regenerate Javascript code
    let regenerate_script = "";
    let last_index = 0;
    let token_id = 0;
    for (let token of tokens) {
        regenerate_script += input_string.slice(last_index, token.start);
        if (!semicolon_index_array.includes(token_id)) {
            if (token.type.label === 'string') {
                regenerate_script += "'";
                regenerate_script += token.value;
                regenerate_script += "'";
            } else {
                regenerate_script += token.value || token['type']['label'];
            }
        }
        last_index = token.end;
        token_id++;
    }

    if (regenerate_script.endsWith("\n")) {
        regenerate_script = regenerate_script.slice(0, -1);
    }

    console.log('Regenerated Script:');
    console.log(regenerate_script);

    // let ast = acorn.parse(input_string, { ecmaVersion: 2025})
    // console.log("ast line number:")
    // console.log(Object.keys(ast['body']).length)
    // console.log("ast output:")
    // console.log(ast)

    return regenerate_script;
}

let js_script = `let a = 0; a; let b = a === 0;`

let cannot_omit = `let a = 1, b = 2;
let x = 'foo';
let f = function(x) { return x };
let y = x + f;
(a+b).toString();`;

let not_JS = "This is not JavaScript;"

let multi_semicolons = `let x = 1; let y = 2;
let z = x + y; let a = 1; let b = 3;
console.log(z);`

// let multi_semicolons = `let x = 1; let y = 2;
// let z = x + y;
// console.log(z);`


removeSemicolon(cannot_omit);


// Related Script

// let tokens = acorn.tokenizer(input_string, { ecmaVersion: 2025 });
// for (let token of tokens) {
//     if (token['type']['label'] === ';') {
//         semicolon_index_array.push(semicolon_index);
//         console.log(semicolon_index, ": ", ";");
//     } else {
//         console.log(semicolon_index, ": ", token['value']);
//     }
//     // console.log("======================")
//     semicolon_index++;
// }
// console.log("======================");

// let ast = acorn.parse(input_string, { ecmaVersion: 2025})
// let ast = acorn.parse(input_string, { ecmaVersion: 2025}, {onToken: true} )
// console.log("ast line number:")
// console.log(Object.keys(ast['body']).length)
// console.log("ast output:")
// console.log(ast)
// const regeneratedCode = escodegen.generate(ast);
// console.log('Regenerated Code:');
// console.log(regeneratedCode);