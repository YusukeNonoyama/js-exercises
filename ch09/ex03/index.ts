export function positiveNumber(x: number) {
    return {
        get getX() {
            return x;
        },
        set setX(y: number) {
            if (isNaN(y)){
                throw Error("x should not be NaN");
            }
            if (y <= 0) {
                throw Error("require : x > 0");
            }
            x = y;
        }
    }
}

// let n = positiveNumber(1)
// n.setX = -9;
// n.setX = 10;
// console.log(n.getX);


// class PositiveNumber {
//   constructor(x) {
//     if(x <= 0) {
//       throw new Error("require : x > 0");
//     }
//     this.x = x;
//   }

//   getX() {
//     return this.x;
//   }

//   setX(x) {
//     if(x <= 0) {
//       throw new Error("require : x > 0");
//     }
//     this.x = x;
//   }
// }
