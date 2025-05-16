export function parseJson(inputText) {
    let success = true; // JSON.parse()でエラーが出ない場合のデフォルト値
    let result = "";
    try{
        result = JSON.stringify(JSON.parse(inputText));
    } catch(e){
        result = e.message;
        success = false;    // JSON.parse()でエラーが出た場合false
    } finally{
        return `{success: ${success}, data: ${result}}` // どちらの場合でも結果出力
    }
}










// let inputText = '{"name": "Alice", "age": 25}';
// let errorMessage = `Unexpected token 'T', "This is not JSON" is not valid JSON`;

// console.log(parseJson("This is not JSON"));
// console.log(parseJson(inputText));

// console.log(JSON.parse("This is not JSON"));