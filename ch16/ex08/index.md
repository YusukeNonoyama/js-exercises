### トークンの設定

```
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxx
```

### コマンド

```
node gh-issue.mjs list owner repo
node gh-issue.mjs create owner repo --title "bug" --body "details"
node gh-issue.mjs close owner repo --number 12
node gh-issue.mjs --help
node gh-issue.mjs -v list owner repo
```

### 参考

https://qiita.com/toshi-toma/items/ea76b8894e7771d47e10
