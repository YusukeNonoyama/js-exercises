## なぜ以下のようになるか？
* costOfLength が負の値を返すことがある ("Hello".length を実行すると時が巻き戻るのだろうか?)
* costOfLength の引数の値を大きくすれば大きくする程結果が小さくなる ("Hello".length を実行すればする程速くなるのだろうか?)

## 理由
* JIT compilersの最適化による
    * loop-invariant code motion (LICM)
        * ループ中で同じ結果に評価される式はループ外へ巻き上げられる。"Hello".lengthは毎回同じ数値5を返すため、ループを増やしても１度しか評価されない。つまり、始めの１度の"Hello".length以外は、costOfLength()とcostOfLengthPlusLoop()の差がないことになり、ループの回数が増えるほど始めの１度の影響が小さくなり、最終的にはcostOfLength()を２回やった時の差分と変わらない評価結果になる。つまり負の値にもなりえる。
    * Constant propagation
        * 定数が変数に代入されるコードの場合、実行前に定数を代入した状態にする最適化。この場合、ループ中に`res = str.length;`があるが、`str`が定数のため、`str.lentgh`も定数と評価され変数`res`は定数の状態でループをするため、毎回の評価がされなくなる。
    * Dead code elimination (DCE)
        * 残りのプログラム実行が結果に影響を与えないコードを排除しようとする最適化