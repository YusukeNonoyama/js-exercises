## どのような攻撃を防御できるか?
* CDNなどから取得したスクリプトに第三者によって意図しない改竄が加えられていないかを検証し、クロスサイトスクリプティングなどのインジェクション攻撃の防御できる
  * CDN(Content Delivery Network)は、コンテンツを複数のキャッシュサーバにキャッシュしておき、ユーザーなどへ配信する時には配信先に近いサーバーからコンテンツを配信する仕組み
  * クロスサイトスクリプティングは、攻撃者が送り込んだ悪意のコードをそのページを閲覧した不特定多数のユーザーに、スクリプトとして実行させる可能性があること

https://web.havincoffee.com/html/tag/script/integrity.html

* ブラウザのコンソールで

"""
Failed to find a valid digest in the 'integrity' attribute for resource 'http://localhost:5500/ch15.1-3/ex03/js/index.js' with computed SHA-384 integrity 'BsH/BM7MxFPWZclMYkyYiU330XnIJhbsiJiIcvmMSEOIobSg5WNy7LIifdcqfQdL'. The resource has been blocked.
"""

* SRI Hash Generator
https://www.srihash.org/

* opensslで生成
openssl dgst -sha384 -binary ch15.1-3/ex03/js/index.js | openssl base64 -A