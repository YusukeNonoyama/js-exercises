## ブラウザの開発者ツールを使うと CSS のデバッグを効率的に行うことができる。CSS のデバッグ を参考にして以下を実施しなさい
[CSSのデバッグ](https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Debugging_CSS)

1. 15.4-10.1 および 15.4-10.2 の ToDo アプリに対してブラウザの開発者ツールから値の変更やプロパティの追加を試してみなさい
    * ex01のcontentクラスにmarginを足す
        * before
            ![alt text]({ED4EA983-D93B-4DEC-8A58-ADD68026C438}.png)
        * after
    ![ex01のcontentクラスにmarginを足す](/ch15.04-10/ex03/addStyleToContent.png)
    * ex02のborderクラスのborder-widthを変更
        * before
            ![alt text]({CB1B25F4-8044-45A6-9EFC-9A1943170C12}.png)
        * after
            ![alt text]({B8C8EC2B-8510-4911-ADF7-211F1528B9E9}.png)

2. 開発者ツールで CSS に関して実行できる操作を検索エンジンで調べ、便利だと思ったものを 3 つ挙げなさい
    * 無効なスタイルを確認できる（取り消し線になっている）
    * `:hob`ボタンを押してhoverにチェックを入れると`:hover`時のスタイルを確認できる
    * rotate、shadow、flexなどは直感的なUIで数値やレイアウトをリアルタイムで調整して結果を確認できる

    https://ics.media/entry/230317/

3. 15.4-10.2 のアプリの body 要素に対し、元々 HTML および JS 内で利用していなかった Tailwind CSS のクラス (bg-rose-600 など何でも良い) を開発者ツールから追加すると変更が反映されないが、これは何故か調べなさい
    * ビルド時に必要なクラスだけをCSSに抽出しているため、HTMLの変更をCSSに反映する操作がないと直ちには反映されない。