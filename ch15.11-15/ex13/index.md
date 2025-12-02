## 環境準備
* `export OLLAMA_ORIGINS="http://localhost:3000"`
* `export OLLAMA_HOST="::"`
* `ollama serve`
* `ollama run gemma:2b` 
  * `http://127.0.0.1:11434/api/chat` からレスポンス返ってきた。`http://127.0.0.1:11434/api/tags`も同様。
  * WSLを立ち上げ直したらモデルの再ロードが必要になり状況がわからない
  * 少し時間がたった後にブラウザから`http://127.0.0.1:11434`が返ってくるようになるので、サーバーの立ち上げ直しに時間がかかるのかも

## サーバー停止
* `sudo systemctl stop ollama`

## サーバー立ち上げ直し
* `sudo systemctl daemon-reload`
* `sudo systemctl restart ollama`

