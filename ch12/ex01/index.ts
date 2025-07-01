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
            return { value: undefined, done: true };
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

const max = 5;

// 「明示的にイテレータインタフェース のメソッドを呼んだり、」
{
    // counterIter()にてnext()を明示的に呼ぶ
    {
        const iter = counterIter(max);
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
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
    // { value: 4, done: false }
    // counterIter: next
    // { value: 5, done: false }
    // counterIter: next
    // { value: undefined, done: true }
    // counterIter: next
    // { value: undefined, done: true }

    // counterGen()にてnext()を明示的に呼ぶ
    {
        const iterGen = counterGen(max);
        console.log(iterGen.next());
        console.log(iterGen.next());
        console.log(iterGen.next());
        console.log(iterGen.next());
        console.log(iterGen.next());
        console.log(iterGen.next());
        console.log(iterGen.next());
    }
    // 結果
    // counterGen
    // counterGen: next
    // { value: 1, done: false }
    // counterGen: next
    // { value: 2, done: false }
    // counterGen: next
    // { value: 3, done: false }
    // counterGen: next
    // { value: 4, done: false }
    // counterGen: next
    // { value: 5, done: false }
    // counterGen: finally
    // { value: undefined, done: true }
    // { value: undefined, done: true }
    console.log("=====================================");

    // counterIter()にてreturn()を明示的に呼ぶ
    {
        const iter = counterIter(max);
        console.log(iter.return(5));  // iteratorはreturnに引数を渡してそれiteration終了
    }
    // 結果
    // counterIter
    // counterIter: return: 5
    // { value: 5, done: true }

    // counterGen()にてreturn()を明示的に呼ぶ
    {
        const iterGen = counterGen(max);
        console.log(iterGen.next());
        console.log(iterGen.return());
    }
    // 結果
    // counterGen
    // counterGen: next
    // { value: 1, done: false }
    // counterGen: finally  
    // { value: undefined, done: true }　　// iterationの途中でないと出力はこの行だけ
    console.log("=====================================");

    // counterIter()にてthrow()を明示的に呼ぶ
    {
        const iter = counterIter(max);
        try {
            iter.throw(Error);
        } catch (e) {
            console.log("error from counterIter()");
        }
    }
    // 結果
    // counterIter
    // counterIter: throw: [Function: Error] { stackTraceLimit: 10 }
    // error from counterIter()

    // counterGen()にてthrow()を明示的に呼ぶ
    {
        const iterGen = counterGen(max);
        console.log(iterGen.next());
        try {
            iterGen.throw(Error);
        } catch (e) {
            console.log("error from counterGen()");
        }
    }
    // 結果
    // counterGen
    // counterGen: next
    // { value: 1, done: false }
    // counterGen: catch: [Function: Error] { stackTraceLimit: 10 }
    // counterGen: finally  
    // error from counterGen()　　// iterationの途中でないと出力はこの行だけ
    console.log("=====================================");
}

// 「間接的に呼んだりする」
{
    // counterIter()のnext()を間接的に呼ぶ
    {
        const iter = counterIter(max);
        for (const value of iter) {
            if (!value) continue;
            console.log(value)
        }
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
    // 4
    // counterIter: next
    // 5
    // counterIter: next

    // counterGen()のnext()を間接的に呼ぶ
    {
        const iterGen = counterGen(max);
        for (const value of iterGen) {
            if (!value) continue;
            console.log(value)
        }
    }
    // 結果
    // counterGen
    // counterGen: next
    // 1
    // counterGen: next
    // 2
    // counterGen: next
    // 3
    // counterGen: next
    // 4
    // counterGen: next
    // 5
    // counterGen: finally
    console.log("=====================================");

    // counterIter()のreturn()を間接的に呼ぶ
    {
        const iter = counterIter(max);
        for (const value of iter) {
            if (!value) continue;
            if (value > 2) {
                break;
            }
            console.log(value)
        }
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
    console.log("========================");

    // counterGen()のreturn()を間接的に呼ぶ
    {
        const iterGen = counterGen(max);
        for (const value of iterGen) {
            if (!value) continue;
            if (value > 2) {
                break;
            }
            console.log(value)
        }
    }
    // 結果
    // counterGen
    // counterGen: next
    // 1
    // counterGen: next
    // 2
    // counterGen: next
    // counterGen: finally

    // throw()を間接的に呼ぶ方法はわからなかった
}

// まとめ１
// * 直接呼び出す場合、iteratorは期待通りの箇所が実行されるが、generatorはiterationの途中でない場合はコード実行が省略される箇所がある。
// * 省略されるのは、generator関数内部の実行やfinally文。
// * breakをすると、iteratorはreturn()が実行され、generatorはfinally節が実行される。
console.log("========================");


// 「ジェネレータ関数によって生成されたオブジェクトがイテレータインタフェースを満たしていることを確認する」
{
    const iterGen = counterGen(max);
    console.log(iterGen.next);
    console.log(iterGen.return);
    console.log(iterGen.throw);
    console.log(iterGen[Symbol.iterator]);

    // プロパティの取得
    console.log(Object.getOwnPropertyNames(iterGen));
    const proto = Object.getPrototypeOf(iterGen);
    console.log(Object.getOwnPropertyNames(proto));
    const proto2 = Object.getPrototypeOf(proto);
    console.log(Object.getOwnPropertyNames(proto2));
}
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

