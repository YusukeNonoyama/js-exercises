## 予想
tryブロックでtrueがreturnされているので、finallyは実行されずにtrueが出力される

## 結果
falseが出力された。一回returnをしても強制的にfinallyは実行されそのreturnが返る