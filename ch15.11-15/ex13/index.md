## サーバー立ち上げの手順
### 環境変数の設定
* OLLAMAサーバーへのクロスオリジンの許可の環境変数設定
  * `export OLLAMA_ORIGINS="http://localhost:3000"`
  * `export OLLAMA_HOST="::"`
* OLLAMAサーバー立ち上げ
  * `ollama serve`
  * `ollama run gemma:2b` 
    * `http://127.0.0.1:11434/api/chat` からレスポンス返ってくる

### サーバー停止
* `sudo systemctl stop ollama`

### サーバー立ち上げ直し
* `sudo systemctl daemon-reload`
* `sudo systemctl restart ollama`

### レスポンスの確認
* `http://127.0.0.1:11434/api/tags`
```
{"models":[{"name":"gemma:2b","model":"gemma:2b","modified_at":"2025-12-02T07:23:26.080375242+09:00","size":1678456656,"digest":"b50d6c999e592ae4f79acae23b4feaefbdfceaa7cd366df2610e3072c052a160","details":{"parent_model":"","format":"gguf","family":"gemma","families":["gemma"],"parameter_size":"3B","quantization_level":"Q4_0"}}]}
```