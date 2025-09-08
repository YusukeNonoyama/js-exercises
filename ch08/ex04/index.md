## 予想

- false, false // thisはundefinedになると予想（呼び出しもとを継承しないため）
- true, false // thisはobjになると予想（呼び出し元を継承するため）

## 結果

- false, true
- true, false

## 説明

- 始めのthisはnestオブジェクトから呼び出されて、かつその呼び出し元のobjからは継承しないため、nestとなる。
- arrow関数のthisは呼び出し元を継承するため、objとなる。
