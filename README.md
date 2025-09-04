## 実行方法

### js/ts

- `npm run exec ch00/ex01/sum.js` // js
- `npm run exec ch00/ex01/sum.ts` // ts

### test

- `npm run test:js ./ch00/ex01/sum.test.js` // js
- `npm run test:ts ./ch00/ex01/sum.test.ts` // ts

### ブラウザテスト

- `npm run test:browser ch00.1/ex01/`

## 環境構築方法

- WSL環境（Ubuntu-22.04）

  - WindowsではTS実行がうまくいかなかった
  - WSLでもWindowsマウント下ではうまくいかなかった（/mnt/\*）

- 手順
  - ルート直下のフォルダ以外のファイルをコピー
  - ルートで以下をインストール（これで上記のjs/ts、testまでが動くようになる）
    - `npm install`
    - `npm install -g ts-node typescript`
  - ブラウザ実行用に以下をインストール
    - `npx playwright install`
    - `npm install serve --save-dev`
    - `npx playwright install chromium`
    - `ch00/ex01/placeholder.worker.ts`を追加（空ファイル）
