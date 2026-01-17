## 問題
* [x] ESLint と Prettier は昨今よく使われおり、併用されることもよくある。この二つを package.json にscriptsを追加してそれぞれ実行できるようにしなさい。
* [x] 追加した Prettier の scripts 実行時は警告が表示されるだけでなく、コードの修正がされるようオプションで設定すること。 => `--write` を追加 
* [x] Prettier vs. Lintersにあるように ESLint ではバグ検知のための検知を、フォーマットに関しては Prettier で行うようにすること。
* [x] ESLint、Prettier の各種設定はプロジェクトで採用したスタイルによって設定すべき内容も変わるが、ここでは設定の練習としてGoogle JavaScript Style Guideになるべく従うように設定しなさい。
  * [x] 実行確認用のファイルはあくまで例として上記のガイドのいくつかを反映されているのみであるため、設定に関しては実行確認用ファイルがガイドに従う最小設定ではなく、Google JavaScript Style Guideに従うこと。
* [ ] 実行確認用のファイルとして ex01 にformat_sample.js と lint_sample.js を用意した。それぞれのファイルに追加した scripts を実行し、lint の警告は修正しなさい。ただし format_sample.js は lint の警告を修正するのではなく、ESLint の設定で lint 対象から除外し、警告がでないようにすること。


## メモ
* JavaScriptの構文エラーで止まってしまうので、InnerClassとa, b, c の変数名を書き換えた
  * 構文エラー
    ```
    $ npm run lint -- ex01/format_sample.js

    > ch17@1.0.0 lint
    > eslint ex01/format_sample.js


    /home/nonoyama/training/javascript/js-exercises/ch17/ex01/format_sample.js
      63:7  error  Parsing error: Identifier 'InnerClass' has already been declared

    ✖ 1 problem (1 error, 0 warnings)
    ```
  * Linter警告
    ```
      $ npm run lint -- ex01/format_sample.js

    > ch17@1.0.0 lint
    > eslint ex01/format_sample.js


    /home/nonoyama/training/javascript/js-exercises/ch17/ex01/format_sample.js
        3:10  error  'sample' is defined but never used                      no-unused-vars
        4:7   error  'a' is assigned a value but never used                  no-unused-vars
        5:9   error  'spaces' is assigned a value but never used             no-unused-vars
        6:7   error  'disallowedObj' is assigned a value but never used      no-unused-vars
      12:7   error  'jsx' is assigned a value but never used                no-unused-vars
      26:5   error  'someVeryLongCondition' is not defined                  no-undef
      26:30  error  'doSomething' is not defined                            no-undef
      28:21  error  'foo' is not defined                                    no-undef
      28:38  error  'bar' is not defined                                    no-undef
      28:42  error  'foo' is not defined                                    no-undef
      31:7   error  'InnerClass' is defined but never used                  no-unused-vars
      36:9   error  'condition' is not defined                              no-undef
      39:9   error  'something' is not defined                              no-undef
      40:16  error  'err' is defined but never used                         no-unused-vars
      41:9   error  'recover' is not defined                                no-undef
      48:10  error  'doNothing' is defined but never used                   no-unused-vars
      50:5   error  'condition' is not defined                              no-undef
      52:12  error  'otherCondition' is not defined                         no-undef
      52:28  error  Empty block statement                                   no-empty
      59:10  error  'e' is defined but never used                           no-unused-vars
      59:13  error  Empty block statement                                   no-empty
      63:7   error  'InnerClass2' is defined but never used                 no-unused-vars
      66:10  error  'foo' is defined but never used                         no-unused-vars
      70:7   error  'a' is assigned a value but never used                  no-unused-vars
      72:7   error  'b' is assigned a value but never used                  no-unused-vars
      74:7   error  'c' is assigned a value but never used                  no-unused-vars
      76:1   error  'someMethod' is not defined                             no-undef
      76:12  error  'foo' is not defined                                    no-undef
      76:28  error  'bar' is not defined                                    no-undef
      79:7   error  'a2' is assigned a value but never used                 no-unused-vars
      84:7   error  'b2' is assigned a value but never used                 no-unused-vars
      85:7   error  'c2' is assigned a value but never used                 no-unused-vars
      87:1   error  'someMethod' is not defined                             no-undef
      88:3   error  'foo' is not defined                                    no-undef
      93:3   error  'bar' is not defined                                    no-undef
      114:1   error  'exports' is not defined                                no-undef
      122:1   error  'exports' is not defined                                no-undef
      130:1   error  'prefix' is not defined                                 no-undef
      134:5   error  'someOtherLongFunctionName' is not defined              no-undef
      136:5   error  'andNowForSomethingCompletelyDifferent' is not defined  no-undef
      140:1   error  'some' is not defined                                   no-undef
      141:27  error  'arg1' is not defined                                   no-undef
      141:33  error  'arg2' is not defined                                   no-undef
      141:39  error  'arg3' is not defined                                   no-undef

    ✖ 44 problems (44 errors, 0 warnings)
    ```

  * ルールを追加するとエラーが消える
    ```
        rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-empty': 'off',
    },
    ```