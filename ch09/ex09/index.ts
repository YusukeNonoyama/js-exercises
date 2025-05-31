// リスコフの置換原則（Liskov substitution principle）を違反したコード

class Rectangle {
    setWidth(width: number) {
        (this as any).width = width;
    }
    setHeight(height: number) {
        (this as any).height = height;
    }
    getArea() {
        return (this as any).width * (this as any).height;
    }
}

class Square extends Rectangle {
    setWidth(width: number) {
        (this as any).width = width;
        (this as any).height = width;
    }
    setHeight(height: number) {
        (this as any).width = height;
        (this as any).height = height;
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
    setWidth(width: number) {
        (this as any).width = width;
    }
    setHeight(height: number) {
        (this as any).height = height;
    }
    getArea(): number {
        return (this as any).width * (this as any).height;
    }
}

class Square2 implements Shape {
    setSize(size: number) {
        (this as any).size = size;
    }
    getArea(): number {
        return (this as any).size * (this as any).size;
    }
}


///////////////////////////////////////
// 生成AIで試した依存性逆転の原則を解消するコード
// 例えばMySQLDatabaseを依存としてOrderServiceを作ると他のDatabaseを加えるときに、OrderServiceを修正する必要が出る

// // Order interface
// interface Order {
//     id: number;
//     product: string;
//     quantity: number;
// }

// // Database interface
// interface Database {
//     create(order: Order): void;
//     update(order: Order): void;
// }

// // Concrete database class
// class MySQLDatabase implements Database {
//     public create(order: Order): void {
//         console.log(`MySQL: Inserting order ${order.id}`);
//         // logic to insert into MySQL
//     }

//     public update(order: Order): void {
//         console.log(`MySQL: Updating order ${order.id}`);
//         // logic to update in MySQL
//     }
// }

// // Service class using dependency injection
// class OrderService {
//     constructor(private readonly database: Database) { }

//     public create(order: Order): void {
//         console.log(`Service: Creating order ${order.id}`);
//         this.database.create(order);
//     }

//     public update(order: Order): void {
//         console.log(`Service: Updating order ${order.id}`);
//         this.database.update(order);
//     }
// }

// // Usage
// const order: Order = { id: 1, product: "Laptop", quantity: 2 };
// const db = new MySQLDatabase();
// const service = new OrderService(db);

// service.create(order);
// service.update(order);