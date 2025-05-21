export function sequenceToObject(...args: any[]){
    for (let i=0; i < args.length; i += 2){
        if(typeof args[i] !== "string"){
            throw Error(`type of input in odd index for array should be string: ${args[i]}`);
        }
    }
    if(args.length%2 !== 0){
        throw new Error(`array length should be even: ${args.length}`);
    }
    const obj: Record<string, any>  = {};
    for (let i = 0; i < args.length; i += 2){
        obj[args[i]] = args[i+1];
    }
    return obj;
}

// スプレッド演算子で配列を与える
const a = ["a", 1, "b", 2];
console.log(sequenceToObject(...a));    // =>: { a: 1, b: 2 }
// console.log(sequenceToObject(a));   // =>: { 'a,1,b,2': undefined } 配列の中身がkeyになる 
