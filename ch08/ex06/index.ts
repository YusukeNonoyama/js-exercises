const args: any[] = [];
function call(...elements: any[]) {
    // args.push(Array.from(elements));
    args.push(elements);

    console.log(elements);
    console.log(args);
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]

