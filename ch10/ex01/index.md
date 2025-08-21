### none
全体が即時実行関数のスコープで定義されている。その中の"__webpack_modules__"にクロージャでsets.cjsとstats.cjsが定義され、"__webpack_exports__"というオブジェクトにindex.cjsがエントリポイントとして定義されている。（p.276はrequire()が返すmoduleオブジェクトの中に定義されている点で似ている）

### development
全体が即時実行関数のスコープで定義されていて、その中のクロージャ中のeval()の引数としてsets.cjsとstats.cjsが定義されている。index.cjsはコピーされずに読み込まれている。

### production
noneと同じ構成だが、変数名が変わり、コメントが削除され、１行で出力されている。