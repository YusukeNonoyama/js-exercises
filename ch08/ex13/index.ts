function f(input: string) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

// returnされる前に即時実行関数の中でwhileで無限ループを実行
f("`${(function(){while(true) console.log('infinite loop')}())};`");

// 上の即時実行関数の中でユーザーが何でもできてしまうので、eval()と同様で危険