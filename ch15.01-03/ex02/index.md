## 動作確認方法
VScode extension の Live Server で２つのローカルサーバーを立てて動作確認する。
1. このリポジトリのルートで localhost:5500 に サーバーを立てる
2. ch15.1-3/ex02/src をルートとして localhost:5501 にサーバーを立てる（別ウィンドウで開けば別のポートでサーバー立てられる）
3. ブラウザで http://localhost:5500/ch15.1-3/ex02/index.html にアクセスする
4. 「動的インポート」を押すと await import("http://localhost:5501/index.js") が実行して動的インポートができる