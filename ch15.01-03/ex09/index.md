## ReactのXSS対策

- JSXの変数の中にHTMLタグが含まれる場合、デフォルトでHTMLエスケープされる
- HTMLを使用する際に、dangerouslySetInnerHTML タグで危険性を理解した上で使用することになっている

## Readcに残るXSS脆弱性

- dangerouslySetInnerHTML は入力をサニタイズされるわけではなく注意して使うというもの。外部ライブラリのDOMPurifyなどで入力をサニタイズする必要がある
- ユーザー入力をイベントにバインドする場合は、eval()と同じで任意の関数を実行できてしまう
- HTTPヘッダーへのユーザー入力などがある場合は、React外の操作のためHTMLエスケープがされない
