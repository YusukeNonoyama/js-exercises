## h1()
### 説明
await wait3()はwait3()が完了するのを待つ。そのためwait3(), wait2(), wait1()は非同期に順番に実行される。
### 図解
wait3
|---------------|
                logA
                |-|
                  wait2
                  |----------|
                             logB
                             |-|
                             wait1
                             |-----|
                                   logC
                                   |-|

## h2()
### 説明
errX()の実行は同期関数の中なので、プロミスがrejectで満たされてエラーはcatchされる
### 図解
errX
|-|
  catch: Xを出力
  |-|

## h3()
### 説明
asyncによりerrX()の実行が非同期になるため、エラーがcatchされない
### 図解
errX
|-|
  throwしたエラー内容を出力（catchされない）
  |-|

## h4()
### 説明
await p1で非同期にp1の解決を待っている間に、p2が非同期でエラーをスローするためcatchできずにエラーとなる。
### 図解
wait2
|-----
wait1
|-----|
      errYが非同期にエラーをスロー
      |-|