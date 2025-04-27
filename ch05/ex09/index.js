export function parseJson(inputText) {
    let success = true;
    let result = "";
    try{
        result = JSON.stringify(JSON.parse(inputText));
    } catch(e){
        result = e.message;
        success = false;
    } finally{
        return `{success: ${success}, data: ${result}}`
    }
}

// let inputText = '{"name": "Alice", "age": 25}';
// let errorMessage = `Unexpected token 'T', "This is not JSON" is not valid JSON`;

// console.log(parseJson("This is not JSON"));
// console.log(parseJson(inputText));

// console.log(JSON.parse("This is not JSON"));

debugger;
console.log(JSON.parse(10));
console.log("debugging");
debugger;
console.log(JSON.parse(null));