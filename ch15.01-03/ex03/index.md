## どのような攻撃を防御できるか?

- CDN などから取得したスクリプトに第三者によって意図しない改ざんが加えられていないかを検証し、クロスサイトスクリプティングなどのインジェクション攻撃の防御できる
  - CDN(Content Delivery Network) は、コンテンツを複数のキャッシュサーバにキャッシュしておき、ユーザーなどへ配信する時には配信先に近いサーバーからコンテンツを配信する仕組み
  - クロスサイトスクリプティングは、攻撃者が送り込んだ悪意のコードをそのページを閲覧した不特定多数のユーザーに、スクリプトとして実行させる可能性があること

https://web.havincoffee.com/html/tag/script/integrity.html

## integrity 値を得る方法

- SRI Hash Generator
  https://www.srihash.org/

- opensslで生成
  - コマンド：`openssl dgst -sha384 -binary ch15.01-03/ex03/js/index.js | openssl base64 -A`
  - 出力：`DRSAcJMekRstEv0i2Rpgr9YrF8qenjmVWDQbrUH8/qof9id/cpqT62uZSZYL/YLp`

## 結果

- そのまま integrity 属性に付加すれば 読込み OK

- integrity を一文字変えると以下のエラー
```
ex03/:1 Failed to find a valid digest in the 'integrity' attribute for resource 'http://localhost:5500/ch15.01-03/ex03/js/index.js' with computed SHA-384 integrity 'DRSAcJMekRstEv0i2Rpgr9YrF8qenjmVWDQbrUH8/qof9id/cpqT62uZSZYL/YLp'. The resource has been blocked.
```


