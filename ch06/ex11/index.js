export class PClass {
    
    static DIGIT_NUMBER = 10;

    constructor(){
        this.p = {
            r: 1.0,
            theta: (Math.PI / 3).toFixed(PClass.DIGIT_NUMBER),
        
            get x() { return (this.r * Math.cos(this.theta)).toFixed(PClass.DIGIT_NUMBER) },
            set x(newValue) {
                if (isNaN(newValue)) throw "invalid input";
                let y_old = this.y; // 一旦現状値をr変更時にyも変わってしまう
                this.r = Math.hypot(newValue, y_old).toFixed(PClass.DIGIT_NUMBER);
                this.theta = Math.atan2(y_old, newValue).toFixed(PClass.DIGIT_NUMBER);
            },
            get y() { return (this.r * Math.sin(this.theta)).toFixed(PClass.DIGIT_NUMBER) },
            set y(newValue) {
                if (isNaN(newValue)) throw "invalid input";
                let x_old = this.x;
                this.r = Math.hypot(x_old, newValue).toFixed(PClass.DIGIT_NUMBER);
                this.theta = Math.atan2(newValue, x_old).toFixed(PClass.DIGIT_NUMBER);
            },
        }
    }
}

// let p2 = {...p};
// console.log(p2);

// console.log("r:", p.r, 1);
// console.log("theta:", p.theta, Math.PI / 3);
// console.log("x:", p.x, 0.5);
// console.log("y:", p.y, Math.sqrt(3) / 2);

// p.x = 1;
// console.log("==============================================");

// console.log("r:", p.r, 1.3228756555322954);
// console.log("theta:", p.theta, 0.7137243789447656);
// console.log("x:", p.x, 1);
// console.log("y:", p.y, Math.sqrt(3) / 2);

// console.log(Math.hypot(1, Math.sqrt(3) / 2));
// console.log(Math.atan2(Math.sqrt(3) / 2, 1));
// console.log("==============================================");

// try{
//     p.x = NaN;
// } catch(e) {
//     console.log(e);
// }

// try{
//     p.y = NaN;
// } catch(e) {
//     console.log(e);
// }

// let valueA = 0.343243423432

// console.log(valueA.toFixed(5), typeof valueA.toFixed(5));