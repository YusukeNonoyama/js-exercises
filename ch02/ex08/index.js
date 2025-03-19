import * as acorn from "acorn";

export function removeSemicolon(input_string){
    // let acorn = import("acorn");
    console.log(acorn.parse("1 + 1 + 1", {ecmaVersion: 2020}))
    console.log(acorn.parse(input_string, {ecmaVersion: 2020}))
}

let my_string = "something\nwritten\nin\nmultiple\nlines"

removeSemicolon(my_string);