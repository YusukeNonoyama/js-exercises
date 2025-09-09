function counterIter(max: number) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value: number) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e: ErrorConstructor) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max: number) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

const max = 3;

{
  console.log("=========明示的にnext()を呼ぶ： counterIter()")
  {
    const iter = counterIter(max);
    let i = 0;
    while (i < 5) {
      console.log(iter.next());
      i++;
    }
    // 結果
    // counterIter
    // counterIter: next
    // { value: 1, done: false }
    // counterIter: next
    // { value: 2, done: false }
    // counterIter: next
    // { value: 3, done: false }
    // counterIter: next
    // { value: undefined, done: true }
    // counterIter: next
    // { value: undefined, done: true }
  }

  console.log("=========明示的にnext()を呼ぶ： counterGen()")
  {
    const iterGen = counterGen(max);
    let i = 0;
    while (i < 5) {
      console.log(iterGen.next());
      i++;
    }
    // 結果
    // counterGen
    // counterGen: next
    // { value: 1, done: false }
    // counterGen: next
    // { value: 2, done: false }
    // counterGen: next
    // { value: 3, done: false }
    // counterGen: finally
    // { value: undefined, done: true }
    // { value: undefined, done: true }
  }

  console.log("=========明示的にreturn()を呼ぶ： counterIter()")
  {
    const iter = counterIter(max);
    console.log(iter.return(2)); // iteratorはreturnに引数を渡してそれiteration終了
    // 結果
    // counterIter
    // counterIter: return: 2
    // { value: 2, done: true }
  }

  console.log("=========明示的にreturn()を呼ぶ： counterGen()")
  {
    const iterGen = counterGen(max);
    console.log(iterGen.next());
    console.log(iterGen.return());
    // 結果
    // counterGen
    // counterGen: next
    // { value: 1, done: false }
    // counterGen: finally
    // { value: undefined, done: true }

    // iterationの途中でないと出力はこの行だけでfinallyは実行されない
    // { value: undefined, done: true }　
  }

  console.log("=========明示的にthrow()を呼ぶ： counterIter()")
  {
    const iter = counterIter(max);
    try {
      iter.throw(Error);
    } catch (e) {
      console.log("error from counterIter()");
    }
    // 結果
    // counterIter
    // counterIter: throw: [Function: Error] { stackTraceLimit: 10 }
    // error from counterIter()
  }

  console.log("=========明示的にthrow()を呼ぶ： counterGen()")
  {
    const iterGen = counterGen(max);
    console.log(iterGen.next());
    try {
      iterGen.throw(Error);
    } catch (e) {
      console.log("error from counterGen()");
    }
    // 結果
    // counterGen
    // counterGen: next
    // { value: 1, done: false }
    // counterGen: catch: [Function: Error] { stackTraceLimit: 10 }
    // counterGen: finally
    // error from counterGen()　　// iterationの途中でないと出力はこの行だけ
  }

}

{
  console.log("=========for-of ループを実行： counterIter()")
  {
    const iter: any = counterIter(max);
    for (const value of iter) {
      console.log(value);
    }
    // 結果
    // counterIter
    // counterIter: Symbol.iterator
    // counterIter: next
    // 1
    // counterIter: next
    // 2
    // counterIter: next
    // 3
    // counterIter: next
  }

  console.log("=========for-of ループを実行： counterGen()")
  {
    const iterGen = counterGen(max);
    for (const value of iterGen) {
      console.log(value);
    }
    // counterGen
    // counterGen: next
    // 1
    // counterGen: next
    // 2
    // counterGen: next
    // 3
    // counterGen: finally
  }

  console.log("=========for-of ループを実行途中で break： counterIter()")
  {
    const iter: any = counterIter(max);
    for (const value of iter) {
      if (value > 2) {
        break;
      }
      console.log(value);
    }
    // 結果
    // counterIter
    // counterIter: Symbol.iterator
    // counterIter: next
    // 1
    // counterIter: next
    // 2
    // counterIter: next
    // counterIter: return: undefined
  }


  console.log("=========for-of ループを実行途中で break： counterGen()")
  {
    const iterGen = counterGen(max);
    for (const value of iterGen) {
      if (value > 2) {
        break;
      }
      console.log(value);
    }
    // 結果
    // counterGen
    // counterGen: next
    // 1
    // counterGen: next
    // 2
    // counterGen: next
    // counterGen: finally
  }

  console.log("=========for-of ループを実行中に例外発生： counterIter()")
  {
    const iter: any = counterIter(max);
    try {
      for (const value of iter) {
        if (value > 2) {
          throw Error("error thrown");
        }
        console.log(value);
      }
    } catch (e) {
      console.log("catch");
    } finally {
      console.log("finally");
    }
    // 結果
    //  counterIter
    // counterIter: Symbol.iterator
    // counterIter: next
    // 1
    // counterIter: next
    // 2
    // counterIter: next
    // counterIter: return: undefined
    // catch
    // finally
  }

  console.log("=========for-of ループ実行中に例外発生： counterGen()")
  {
    const iterGen = counterGen(max);
    try {
      for (const value of iterGen) {
        if (value > 2) {
          throw Error("error thrown");
        }
        console.log(value);
      }
    } catch {
      console.log("thrown");
    } finally {
      console.log("finally");
    }
    // 結果
    // counterGen
    // counterGen: next
    // 1
    // counterGen: next
    // 2
    // counterGen: next
    // counterGen: finally
    // thrown
    // finally
  }
}



// 以下は、旧内容
// まとめ１
// * 直接呼び出す場合、iteratorは期待通りの箇所が実行されるが、generatorはiterationの途中でない場合はコード実行が省略される箇所がある。
// * 省略されるのは、generator関数内部の実行やfinally文。
// * breakをすると、iteratorはreturn()が実行され、generatorはfinally節が実行される。
// console.log("========================");

// 「ジェネレータ関数によって生成されたオブジェクトがイテレータインタフェースを満たしていることを確認する」
// {
// const iterGen = counterGen(max);
// console.log(iterGen.next);
// console.log(iterGen.return);
// console.log(iterGen.throw);
// console.log(iterGen[Symbol.iterator]);

// プロパティの取得
// console.log(Object.getOwnPropertyNames(iterGen));
// const proto = Object.getPrototypeOf(iterGen);
// console.log(Object.getOwnPropertyNames(proto));
// const proto2 = Object.getPrototypeOf(proto);
// console.log(Object.getOwnPropertyNames(proto2));
// const proto3 = Object.getPrototypeOf(proto2);
// console.log(Object.getOwnPropertyNames(proto3));
// const proto4 = Object.getPrototypeOf(proto3);
// console.log(Object.getOwnPropertyNames(proto4));
// const proto5 = Object.getPrototypeOf(proto4);
// console.log(Object.getOwnPropertyNames(proto5));
// }
// 結果
// イテレータインターフェースを満たしている。2階層下のプロトタイプに存在する。
// [Function: next]
// [Function: return]
// [Function: throw]
// [Function: [Symbol.iterator]]
// []
// []
// [ 'constructor', 'next', 'return', 'throw' ]

// 「return() や throw() がどのようなときに呼ばれるのか確認する」
// breakをすると、iteratorで作成したオブジェクトはreturn()が実行され、generatorで作成したオブジェクトはfinally節が実行される。

// 「ジェネレータ関数の中身がどのタイミングで初めて実行されるか確認する」
// オブジェクト作成時ではなく、next()が呼び出されたときに
// next()が呼び出されたときにはじめて実行される。next()が呼ばれずにreturn()やthrow()が呼び出されるとジェネレータ関数の中身はスキップされる。
