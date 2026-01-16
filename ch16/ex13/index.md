## 問題

- 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？

## 解答

- `cmd /c dir`はコマンドプロンプトを実行し、`dir`コマンドを実行後に`/c`で閉じる。パイプの右の`cmd /c "findstr dir"`は同様にコマンドプロンプトを開いて左の出力を入力にして、`findstr`コマンドを`dir`を引数にして実行する。`findstr`は正規表現を引数にとり文字列を検索するコマンド。
- `dir`だけをWindows環境で実行したshell.jsのプロンプトとして入れると以下のエラーが出力される（ENOENTは`Error NO ENTty`の意味でファイルやフォルダが存在しないという意味）
  ```
  C:\Users\r00481995>node .\Desktop\shell.js
  > dir
  Error: spawn dir ENOENT
      at ChildProcess._handle.onexit (node:internal/child_process:285:19)
      at onErrorNT (node:internal/child_process:483:16)
      at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'spawn dir',
  path: 'dir',
  spawnargs: []
  }
  ```
- Windows環境だと`dir`という実行コマンドは存在せず、コマンドプロンプトに`cmd.exe`ビルドされているコマンドであるためnodeから直接使えず、WSLではLinux環境となり`dir`コマンドがそのまま使える
