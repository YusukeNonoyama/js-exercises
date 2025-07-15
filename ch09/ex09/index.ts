// リスコフの置換原則（Liskov substitution principle）を違反したコード

class Rectangle {
    width!: number;
    height!: number;
    setWidth(width: number) {
        this.width = width;
    }
    setHeight(height: number) {
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width: number) {
        this.width = width;
        this.height = width;
    }
    setHeight(height: number) {
        this.width = height;
        this.height = height;
    }
}

let rectangle = new Rectangle();
rectangle.setWidth(100);
rectangle.setHeight(50);
console.log(rectangle.getArea()); // 5000

let square = new Square();
square.setWidth(100);
square.setHeight(50);
console.log(square.getArea()); // 2500: 異なる動作になっている

// この場合はRectangleとSquareは継承関係とすべきではない。
// 例えばShapeというインターフェースを継承して独立のクラスとして定義する等の方法がある。
// 以下解消したコードの例

interface Shape {
    getArea(): number;
}

class Rectangle2 implements Shape {
    width!: number;
    height!: number;
    setWidth(width: number) {
        this.width = width;
    }
    setHeight(height: number) {
        this.height = height;
    }
    getArea(): number {
        return this.width * this.height;
    }
}

class Square2 implements Shape {
    size: number = 0;
    setSize(size: number) {
        this.size = size;
    }
    getArea(): number {
        return this.size ** 2;
    }
}

let rectangle2 = new Rectangle2();
rectangle2.setWidth(100);
rectangle2.setHeight(50);
console.log(rectangle2.getArea()); // 5000

let square2 = new Square2();
square2.setSize(100);
console.log(square2.getArea()); // 10000