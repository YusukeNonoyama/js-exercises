// スプレッド演算子で配列を受け取れるようにした
{
    const m = function (...arg: any[]) {
        console.log(arg[1]);
    };
    m("a", "b");
}

// アロー関数
{
    const m = (...arg: any[]) => {
        console.log(arg[1]);
    };
    m("a", "b");
}


