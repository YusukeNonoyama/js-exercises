- ファイルサイズ
  - 359 MB
    ```
    $ ls -lh ch16/ex10/file.txt
    -rw-r--r-- 1 nonoyama nonoyama 359M Jan  7 08:39 ch16/ex10/file.txt
    ```
- 結果
  - ストリームを使わない方は実行前に対して画像分のメモリ容量がそのまま乗っている。ストリームの方は抑えられてはいるが40 MB程度は乗っている。
    - stream
      ```
      copy start (stream): 59 MB (rss)
      copy done (stream): 98 MB (rss)
      ```
    - non-stream
      ```
      copy start (non-Stream): 57 MB (rss)
      copy done (non-Stream): 418 MB (rss)
      ```
