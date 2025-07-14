export class LinkedList {
  #head = null;
  #tail = null;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  push(value) {
    const newNode = { value, next: null };
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  pushAll(...items) {
    items.forEach((item) => this.push(item));
  }

  toString() {
    let current = this.#head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return "[" + values.join(", ") + "]";
  }
}

// /**
//  * 要素のpush回数を記録するLinkedList
//  */
// export class InstrumentedLinkedList extends LinkedList {
//   #pushCount = 0;
//   /**
//    * 要素のpush操作が行われた回数
//    */

//   get pushCount() {
//     return this.#pushCount;
//   }

//   push(item) {
//     super.push(item);
//     this.#pushCount++;
//   }

//   pushAll(...items) {
//     super.pushAll(...items);  // このライン終了時点でthis.#pushCountは２。意図せず子クラスのpush()が呼び出されているため。
//     this.#pushCount += items.length;  // このライン終了時点でthis.#pushCountは４。

//   }
// }



export class InstrumentedLinkedList {
  #pushCount = 0;
  #linkedList = new LinkedList();

  get pushCount() {
    return this.#pushCount;
  }
  push(item) {
    this.#linkedList.push(item);
    this.#pushCount++;
  }
  pushAll(...items) {
    this.#linkedList.pushAll(...items)
    this.#pushCount += items.length;
  }
}
