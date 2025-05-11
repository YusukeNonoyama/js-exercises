// 問題文
// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    if (params && params.maxWidth) {
        maxWidth = params.maxWidth;
    }

    if (params && params.maxHeight) {
        maxHeight = params.maxHeight;
    }

    console.log({ maxWidth, maxHeight });
}

// 回答 resize1
function resize1(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // paramsがundefinedの場合はparams.maxWidthは評価されずにparamsのundefinedと評価される
    // 次に(undefined || maxWidth)を評価されmaxWidthが代入される
    // paramsがオブジェクト(trueで評価される)でかつparams.maxWidthが定義されている場合は、
    // 戻り値がparams.maxwidthになり、それ以降が評価されない
    maxWidth = params && params.maxWidth || maxWidth;
    maxHeight = params && params.maxHeight || maxHeight;

    console.log({ maxWidth, maxHeight });
}

// 回答 resize2
function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // .?はプロパティがない場合(nullとundefined)にundefinedを返す。
    // ??(first-defined)は定義されている最初の値を採用するため、左の値がnullかundefinedの場合は右の値を採用する。
    maxWidth = params?.maxWidth ?? maxWidth;
    maxHeight = params?.maxHeight ?? maxHeight;

    console.log({ maxWidth, maxHeight });
}

resize({ maxWidth: 200, maxHeight: 150 });  // => { maxWidth: 200, maxHeight: 150 }
resize1({ maxWidth: 200, maxHeight: 150 }); // => { maxWidth: 200, maxHeight: 150 }
resize2({ maxWidth: 200, maxHeight: 150 }); // => { maxWidth: 200, maxHeight: 150 }
resize(undefined);  // => { maxWidth: 600, maxHeight: 480 }
resize1(undefined); // => { maxWidth: 600, maxHeight: 480 }
resize2(undefined); // => { maxWidth: 600, maxHeight: 480 }

