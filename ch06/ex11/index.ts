export let obj = {
    r: 1.0,
    theta: (Math.PI / 3),
    get x() {
        return (this.r * Math.cos(this.theta))
    },
    set x(newValue) {
        if (isNaN(newValue)) throw "invalid input";
        let y_old = this.y; // 一旦現状値を代入しておく。r変更時にyも変わってしまう。
        this.r = Math.hypot(newValue, y_old);
        this.theta = Math.atan2(y_old, newValue);
    },
    get y() {
        return (this.r * Math.sin(this.theta))
    },
    set y(newValue) {
        if (isNaN(newValue)) throw "invalid input";
        let x_old = this.x;
        this.r = Math.hypot(x_old, newValue);
        this.theta = Math.atan2(newValue, x_old);
    },
}
