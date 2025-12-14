## 問題
* オリジン間リソース共有（CORS）について、以下の問いに答えなさい。
  1. クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい
  2. クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい

## 解答
1. クロスオリジンリクエストに制約がないというのは、あるWebサイトのJavaScriptコードが、別のオリジンのWebサイトへリクエストを送信でき、そのレスポンスをJavaScriptで読み取れるという状況を指す。これができると、同一のブラウザで開いた悪意のあるサイトのJavaScriptコードが、ユーザーの認証情報を利用して勝手にターゲットWebサイトにリクエストを送り、情報を改ざんしたり（CSRF）、機密情報を取得したりできてしまう。
    * 参考リンク
      * https://cdn.sakura.ad.jp/column/cors/
      * https://cyber-insurance.jp/column/1630/

2. 単純リクエストと呼ばれる以下のような条件を満たすものは、サーバーに予期しない状態変更をしないとみなされPreflightリクエストは発生しない
    * 以下のHTTPメソッドを使用している
      * GET
      * HEAD
      * POST
    * 安全とみなされる以下のようなヘッダーを使用している
      * Accept
      * Accept-Language
      * Content-Language
      * Content-Type（但し、下記の追加の要件に注意）
      * Range(単純範囲ヘッダー値、例えば bytes=256- や bytes=127-255 の場合)
    * 以下のContent-Type ヘッダーで指定できるメディア種別に許されるタイプ/サブタイプ
      * application/x-www-form-urlencoded
      * multipart/form-data
      * text/plain
    * XMLHttpRequest オブジェクトを使用してリクエストを行う場合は、 XMLHttpRequest.upload プロパティから返されるオブジェクトにイベントリスナーが登録されていないこと
    * リクエストに ReadableStream オブジェクトが使用されていないこと（ストリームAPI、ollamaの課題で使ったやつ）