## 予想

0から9までがコンソールに出力されて、forループの外のコンソール出力ではiが定義されていないためエラーとなる

## 結果

予想の通りに出力された

```
0
1
2
3
4
5
6
7
8
9
file:///C:/Users/r00481995/Documents/javascript/js-exercises/ch03/ex15/index.js:8
  console.log(i);
              ^

ReferenceError: i is not defined
    at file:///C:/Users/r00481995/Documents/javascript/js-exercises/ch03/ex15/index.js:8:15
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)

Node.js v18.11.0
```

## letをvarに変えた場合

- 実行結果

```
0
1
2
3
4
5
6
7
8
9
10
```

- 理由  
  varで宣言された場合の変数iはletと異なりブロックスコープにならないため、このケースではindex.js内がスコープとなる。forループから抜ける直前の動作としては、コンソールに`i = 9`が出力された後、変数iがインクリメントされ、`i > 10`で条件判定されてforループを終了する。そのためforループ外の`console.log(i)`の時点で変数`i = 10`が引き継がれて最後に10が出力される。

## 全ての let を消した場合 (非 strict モードでのみ実行可能)

[ここ](https://es5-playground.vercel.app/)のES5環境で実行してみた

- 実行結果

```
100
101
```

- 理由
  変数iが最初の実行時点でグローバル変数になり、forループ内でグローバル変数iに100が代入される。forループ内のconsole.log()で100が出力されたあとiがインクリメントされ101となり、`i < 10`でforループを抜けて、最後にconsole.log()で101が出力される
