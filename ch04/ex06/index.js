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


function resize1(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // paramsがundefinedの場合はparams.maxWidthは評価されずにparamsのundefinedが返る
    // 次にundefined || maxWidthによりmaxWidthが代入される
    // paramsがオブジェクトの場合は戻り値がparams.maxWidthになりそれ以降が評価されない
    maxWidth = params && params.maxWidth || maxWidth;
    maxHeight = params && params.maxHeight || maxHeight;

    console.log({ maxWidth, maxHeight });
}


function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // .?はプロパティがない場合(nullとundefined)にundefinedを返す。??は左の値を採用するが、左の値がnullかundefinedの場合は右の値を採用する。
    maxWidth = params?.maxWidth ?? maxWidth;
    maxHeight = params?.maxHeight ?? maxHeight;

    console.log({ maxWidth, maxHeight });
}

resize({ maxWidth: 200, maxHeight: 150 });
resize1({ maxWidth: 200, maxHeight: 150 });
resize2({ maxWidth: 200, maxHeight: 150 });
resize(undefined);
resize1(undefined);
resize2(undefined);

console.log(null?.test);