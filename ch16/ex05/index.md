## 問題

- 標準入力、標準出力、標準エラー出力、リダイレクト、パイプという単語について調べなさい
- 以下のコードを cat.mjs というファイルに保存し、後述する実験の結果を予測し、実際に実験しなさい

## 解答

- 標準入力
  - プログラムが入力を受け取るための入り口（stdin）
- 標準出力
  - プログラムが結果を出力するための出口（stdout）
- 標準エラー出力
  - プログラムがエラーメッセージを出すための出口（stderr）
- リダイレクト
  - 入力や出力の向き先を変更すること
    - `ls > list.txt` ⇒ 標準出力をファイルに保存する
    - `cat < text.txt` ⇒ ファイルを標準入力として使う
    - `ls invalid-file 2> err.txt` ⇒ ファイルが存在しないなどエラーの内容が保存される
- パイプ
  - あるコマンドの標準出力を、別のコマンドの標準入力につなぐこと
    - `ls | grep txt`
- 予想/結果
  - `node cat.mjs`
    - 予想： 引数がないため`undefined`が標準出力に出力される
    - 結果： コンソールが入力を待ち続け、何かを入力するとそれを繰り返して出力する動作を続ける。（`process.argv.length > 2`の条件が満たされないためelse節が実行されstdinがstdoutに繋がった結果、stdinのコンソール入力を待ち続ける状態になり、stdinの入力内容がstdoutとしてそのまま出力される）
  - `echo FOO | node cat.mjs`
    - 予想： `FOO`が入力となるため`FOO`と表示される
    - 結果： 予想通り
  - `node cat.mjs > output.txt`
    - 予想： ファイルに`undefined`が保存される
    - 結果： コンソールが入力を待ち続け、何かを入力するとそれがファイルに保存する動作を続ける。（２つ上の状態と似ていて、stdinがstdoutに繋がりさらに`output.txt`に繋がる）
  - `node cat.mjs file`
    - 予想： ファイルの内容が標準出力に出力される
    - 結果： 予想通り
  - `node cat.mjs file > output.txt`
    - 予想： ファイルの内容が`output.txt`に保存される
    - 結果： 予想通り
  - `node cat.mjs invalid-file > output.txt`
    - 予想： 標準出力にエラーが表示され、ファイルは空になる
    - 結果： 予想通り
      - `Error: ENOENT: no such file or directory, open './ch16/ex05/hell.txt'`
  - `node cat.mjs invalid-file 2> error.txt`
    - 予想： ファイルにエラー内容が保存される
    - 結果： 予想通り
