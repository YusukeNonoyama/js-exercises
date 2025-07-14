export function positiveNumber(x: number) {
    return {
        get getX() {
            return x;
        },
        set setX(y: number) {
            if (isNaN(y)) {
                throw Error("x should not be NaN");
            }
            if (y <= 0) {
                throw Error("require : x > 0");
            }
            x = y;
        }
    }
}

