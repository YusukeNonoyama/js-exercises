## 問題
index.js は一定確率で終了する子プロセスを spawn するようになっている。index.js に対して以下の処理を実装しなさい。

1. 子プロセスが異常終了した場合、再起動する
2. シグナルを 2 種類以上トラップし、そのシグナルと同じシグナルを子プロセスに通知し、子プロセスがそのシグナルによって終了したことを確認し、自身も終了する

主にクラウド上で動作するプログラムは、いわゆる Graceful Shutdown という動作が求められ、上記のような処理が必要な場合がある。Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か書きなさい。

## 解答
* Gracefull Shutdownのシグナルとして`SIGTERM`が送信される（`STOPSIGNAL`という値のデフォルト値が`SIGTERM`で変更も可能）
* もし設定時間内に終了しない場合は`SIGKILL`で強制終了する
* 参考リンク
  * ECS: https://aws.amazon.com/jp/blogs/news/graceful-shutdowns-with-ecs/
  * Kubernetes: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/

## メモ
* `SIGINT`のトリガは CTRL + C
* `SIGTERM`のトリガはターミナルから `kill -TERM {pid}`
  * pidは`process.pid`で出力
* [Node.js v24.12.0 documentation](https://nodejs.org/docs/latest-v24.x/api/child_process.html)