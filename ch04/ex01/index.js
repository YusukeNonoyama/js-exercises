export function add(x, y) {
    let isValid = checkInput(x, y);
    if (isValid) return isValid;

    return { real: (x.real + y.real).toFixed(2), im: (x.im + y.im).toFixed(2)};
}

export function sub(x, y) {
    let isValid = checkInput(x, y);
    if (isValid) return isValid;

    return { real: (x.real - y.real).toFixed(2), im: (x.im - y.im).toFixed(2) };
}

export function mul(x, y) {
    let isValid = checkInput(x, y);
    if (isValid) return isValid;

    let a = x.real;
    let b = x.im;
    let c = y.real;
    let d = y.im;
    return { real: (a * c - b * d).toFixed(2), im: (a * d + b * c).toFixed(2) };
}

export function div(x, y) {
    let isValid = checkInput(x, y);
    if (isValid) return isValid;

    let a = x.real;
    let b = x.im;
    let c = y.real;
    let d = y.im;
    return { 
        real: ((a * c + b * d) / (c *c + d * d)).toFixed(2), 
        im: ((b * c - a * d) / (c * c + d * d)).toFixed(2) 
    };    
}

function checkInput(x, y){
    if (typeof x !== "object") return `invalid input: ${typeof x}`;
    if (typeof y !== "object" ) return `invalid input: ${typeof y}`;
    if (x === null || y === null) return `invalid input: null`;
}

let z1 = { real: 1.3, im: -2 };
let z2 = { real: -5, im: 0.4 };

console.log(add(z1, z2));   // { real: -3.7, im: -1.6 }  
console.log(sub(z1, z2));   // { real: 6.3, im: -2.4 } 
console.log(mul(z1, z2));   // { real: -5.7, im: 10.52 }  
console.log(div(z1, z2));   // { real: -0.29, im: 0.38 }   


