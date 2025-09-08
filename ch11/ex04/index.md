## 結果の予想

- 型付き配列の方がメモリ管理が容易になり高速になるのではないか

## 結果

- 条件によっては型付き配列の方が遅くなる場合もあるし、非常に高速になる場合もある。
- 行列の大きさの影響

  - Kの値が大きくない方が実行速度に差が出やすいように見える（Float64Array）
    - [10, 10000, 10]だと10倍高速
      - arrayMultiply: 1345.5778470000002
      - typedArrayMultiply: 124.17676200000005
    - [100, 1000, 100]だと高速にはなるが２倍もいかない
      - arrayMultiply: 2408.0640479999997
      - typedArrayMultiply: 1929.8259930000004
    - [1000, 10, 1000]だと逆に遅くなる
      - arrayMultiply: 1899.086999
      - typedArrayMultiply: 2277.7727000000004

- 型付き配列種類の影響
  - Float64ArrayよりFloat32Arrayの方が遅くなる場合もある（[100, 200, 300]）
    - Float64Array
      - arrayMultiply: 1173.9421670000002
      - typedArrayMultiply: 1056.096517
    - Float32Array
      - arrayMultiply: 1240.9420730000002
      - typedArrayMultiply: 2423.7846120000004
  - ↑でない場合もある（[10, 2000, 30]）　→ 型種類でほとんど変わらない。
    - Float64Array
      - arrayMultiply: 427.8730670000001
      - typedArrayMultiply: 66.45213999999999
    - Float32Array
      - arrayMultiply: 646.5512809999999
      - typedArrayMultiply: 73.45996999999988
  - Int8Arrayだと高速になるかと思ったがそうでもない（[100, 200, 300]）
    - arrayMultiply: 1139.7881189999998
    - typedArrayMultiply: 886.9321669999999
  - Uint8ClampedArrayでも遅くなることがある
    - arrayMultiply: 1117.8329399999998
    - typedArrayMultiply: 1791.168667
