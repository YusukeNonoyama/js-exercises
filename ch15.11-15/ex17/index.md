## 問題
* 実際のサービスの通信をデベロッパーツールなどで眺めて CORS の設定を確認しなさい

## 解答
* 三菱UFJ銀行のログインページ
  * 設定されている
  ![alt text]({9A762C95-3051-4A4F-998C-BEFA2463CD08}.png)
* 三菱UFJ銀行のトップページ
  * "access-control-allow-credentials" と "access-control-allow-origin" だけが設定されている
  * この場合、単純リクエスト（Preflightが発生しないもの）は許可される
  ![alt text]({AA1B512B-E531-4051-B339-0F64F9492CD6}.png)
* Yahooショッピングのログインページ
  * 特になし
  ![alt text]({5E1199E0-D8FB-425B-B2DD-175A47CB08F3}.png)