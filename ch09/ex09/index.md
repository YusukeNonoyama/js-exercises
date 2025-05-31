## SOLID原則の説明
### 単一責任の原則 (single-responsibility principle)
* １つのクラスは、１つの責任のみ持つべき。変更する理由は複数あるべきではない。

### 開放閉鎖の原則（open/closed principle）
* クラスは、既存の動作に影響を与えないために修正にはクローズで、拡張にはオープンであるべき。

### リスコフの置換原則（Liskov substitution principle）
* 親クラスを継承する子クラスは、親クラスがと同じ動作をできるようにすべき。

### インターフェース分離の原則 (Interface segregation principle)
* インターフェースは、単一の一般用途のものよりも、複数のクライアント毎のものであるべき。一般用途のものだと使用しない特定のクライアントに不要なインターフェースが発生しバグの元になる。

### 依存性逆転の原則（dependency inversion principle）
* 上位モジュールは、下位モジュールに依存してはならず、どちらも抽象化に依存すべき


## 参考
https://blog.logrocket.com/applying-solid-principles-typescript/