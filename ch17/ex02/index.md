## 環境変数の設定方法

- `--env-file`で.envファイルを指定する： `node --env-file=../.env ex02/index.js list`
- `read -s TOKEN`でコマンドラインに見えないように変数を設定して、`export GITHUB_TOKEN=${TOKEN}`のようにする

## PollyJSの実行方法

- `js-exercises/ch17/ex02`をカレントフォルダにして`npm run test:js ./index-polly.test.js`
