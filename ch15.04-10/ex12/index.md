## Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい(ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。
### hashchange
* hash を除いたURLに更新される

### pushState
* `404 (Not Found)`と画面に表示される
* URL は `http://localhost:3000/ch15.04-10/ex12/active` に跳ぶが、HTML 自体は初期状態に更新されており、末尾に "active" を含む URL を状態を pushState() で保存されていないためページにたどり着けない

## ここまでの例は serve コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。
* 元の `index.html` ファイルを含むルート URL を更新時に返すようにする