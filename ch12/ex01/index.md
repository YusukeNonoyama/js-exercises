## 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の next() を呼び出す

### counterIter()
- next()が呼ばれ続ける
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

### counterGen()
- try節のforループ内のyeildが呼ばれ続け、yeildする値がなくなったら次のnext()呼び出してfinally節が呼ばれdoneがtrueのオブジェクトが返るようになる
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

## 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の return() を呼び出す

### counterIter()
- return()が呼ばれdoneがtrueのオブジェクトが返る
  // 結果
  // counterIter
  // counterIter: return: 2
  // { value: 2, done: true }

### counterGen()
- iteration中に明示的にreturn()を呼び出すと、finally節が呼ばれてvalueがundefinedにて、doneがtrueのオブジェクトが返る
  // 結果
  // counterGen
  // counterGen: next
  // { value: 1, done: false }
  // counterGen: finally
  // { value: undefined, done: true }

- iterationの途中でない場合はfinallyは実行されない（出力は以下の行だけ）
  // { value: undefined, done: true }

## 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の throw() を呼び出す
### counterIter()
- throw()が呼び出されてエラーをthrowする
  // 結果
  // counterIter
  // counterIter: throw: [Function: Error] { stackTraceLimit: 10 }
  // error from counterIter()

### counterGen()
- catch節の後にfinally節が呼ばれる
    // 結果
    // counterGen
    // counterGen: next
    // { value: 1, done: false }
    // counterGen: catch: [Function: Error] { stackTraceLimit: 10 }
    // counterGen: finally
    // error from counterGen()

- iterationの途中でないと呼ばれるのはcatch節のみで出力は以下のみ
    // error from counterGen()　　

## for-of ループを実行
### counterIter()
- インスタンス化したconterIter()がfor-ofループで呼ばれると、最初に[Symbol.iterator]()が実行され、続いてループの度にnext()が実行される。カウント数がmaxを超えてnext()が呼ばれるとdoneがtrueのオブジェクトが返り次のループは実行されない。
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

### counterGen()
- try節が指定した回数が呼ばれたのち最後にfinally節が呼ばれて終了。
    //結果
    // counterGen
    // counterGen: next
    // 1
    // counterGen: next
    // 2
    // counterGen: next
    // 3
    // counterGen: finally
## for-of ループを実行途中で break
### counterIter()
- 呼び出し時は上記と同様で、break時にreturn()がundefinedで呼ばれて終了する
    // 結果
    // counterIter
    // counterIter: Symbol.iterator
    // counterIter: next
    // 1
    // counterIter: next
    // 2
    // counterIter: next
    // counterIter: return: undefined
### counterGen()
- break時にfinally節が呼び出されて終了する
    // 結果
    // counterGen
    // counterGen: next
    // 1
    // counterGen: next
    // 2
    // counterGen: next
    // counterGen: finally

## for-of ループを実行中に例外発生
### counterIter()
- breakと同じ挙動（throw()は呼ばれずreturn()が呼ばれる）
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

### counterGen()
- breakと同じ挙動
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