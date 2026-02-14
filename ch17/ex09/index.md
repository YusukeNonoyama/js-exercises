## Flowの実行について

- ファイルの先頭に `@flow` を付けて確認対象にする
- FLOWの構文を確認するコマンド `npx flow`
- そのままではJavaScript構文として無効で実行できないため型表現を剥がす
  - `npm install --save-dev   @babel/core   @babel/cli   @babel/preset-flow`
  - `npx babel ex09/src --out-dir ex09`
- 型表現を剥がした後のファイルを参照して実行する

## 実行結果

```
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
```
