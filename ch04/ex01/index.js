export function add(x, y) {
    return { real: +(x.real + y.real).toFixed(2), im: +(x.im + y.im).toFixed(2)};
}

export function sub(x, y) {
    return { real: +(x.real - y.real).toFixed(2), im: +(x.im - y.im).toFixed(2) };
}

export function mul(x, y) {
    let a = x.real;
    let b = x.im;
    let c = y.real;
    let d = y.im;
    return { real: +(a * c - b * d).toFixed(2), im: +(a * d + b * c).toFixed(2) };
}

export function div(x, y) {
    let a = x.real;
    let b = x.im;
    let c = y.real;
    let d = y.im;
    return { 
        real: +((a * c + b * d) / (c *c + d * d)).toFixed(2), 
        im: +((b * c - a * d) / (c * c + d * d)).toFixed(2) 
    };    
}

let z1 = { real: 1.3, im: -2 };
let z2 = { real: -5, im: 0.4 };

console.log(typeof(add(z1, z2)));
console.log(add(z1, z2));
console.log(sub(z1, z2));
console.log(mul(z1, z2));
console.log(div(z1, z2));


