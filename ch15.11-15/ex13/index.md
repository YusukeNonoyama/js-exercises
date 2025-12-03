## 環境準備
* `export OLLAMA_ORIGINS="http://localhost:3000"`
* `export OLLAMA_HOST="::"`
* `ollama serve`
* `ollama run gemma:2b` 
  * `http://127.0.0.1:11434/api/chat` からレスポンス返ってきた。
  * WSLを立ち上げ直したらモデルの再ロードが必要になり状況がわからない
  * 少し時間がたった後にブラウザから`http://127.0.0.1:11434`が返ってくるようになるので、サーバーの立ち上げ直しに時間がかかるのかも

## サーバー停止
* `sudo systemctl stop ollama`

## サーバー立ち上げ直し
* `sudo systemctl daemon-reload`
* `sudo systemctl restart ollama`

## レスポンス例
* `http://127.0.0.1:11434/api/tags`
```
{"models":[{"name":"gemma:2b","model":"gemma:2b","modified_at":"2025-12-02T07:23:26.080375242+09:00","size":1678456656,"digest":"b50d6c999e592ae4f79acae23b4feaefbdfceaa7cd366df2610e3072c052a160","details":{"parent_model":"","format":"gguf","family":"gemma","families":["gemma"],"parameter_size":"3B","quantization_level":"Q4_0"}}]}
```