## 問題
複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい。

## 解答
2万5千接続前後で新規接続を受け付けなくなる。固定値でなく変動する。
sokect.close()で接続を毎回閉じても同じ数で受け付けなくなる。（なぜ？）
 
``` error
node:events:486
      throw er; // Unhandled 'error' event
      ^

Error: connect EADDRNOTAVAIL 127.0.0.1:8000 - Local (0.0.0.0:0)
    at internalConnect (node:net:1110:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)
Emitted 'error' event on Socket instance at:
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -99,
  code: 'EADDRNOTAVAIL',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8000
}

Node.js v24.7.0
```