### none
全体が即時実行関数のスコープで定義されていて、その中のクロージャでsets.cjsとstats.cjsが定義されている。
（p.276はrequire()が返すmoduleオブジェクトの中に定義されている）

### development
全体が即時実行関数のスコープで定義されていて、その中のクロージャ中のeval()の引数としてsets.cjsとstats.cjsが定義されている。

### production
noneと同じ構成だが、変数名が変わり、コメントが削除され、１行で出力されている。