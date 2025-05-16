function add(a, b){
    let sum = a;
    let carry = b;

    // リプルキャリーアダー
    while (carry) {
        const temp = sum ^ carry;
        carry = (sum & carry) << 1;
        sum = temp;
    }

    return sum;
}

export function sub(a, b){
    b = ~b;
    b = add(b, 1);

    return add(a, b);
}

console.log(sub(1, 4));
console.log(sub(100, 4));