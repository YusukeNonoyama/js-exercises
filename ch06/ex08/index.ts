export function restrict(target: any, template: any) {
    // templateのプロパティを配列化
    const template_array = Object.keys(template);
    // targetのプロパティを巡回
    for (const p of Object.getOwnPropertyNames(target)) {
        // templateのプロパティに存在しなければ削除
        if (!template_array.includes(p)) {
            delete target[p]
        };
    }
    return target;
}

export function substract(target: any, ...sources: any) {
    // source(配列)のkeyのみの配列を作成
    const source_array = [];
    for (const source of sources) {
        source_array.push(...Object.keys(source));
    }
    // targetのプロパティを巡回
    for (const p of Object.getOwnPropertyNames(target)) {
        // sourcesのプロパティに含まれていたら削除
        if (source_array.includes(p)) {
            delete target[p]
        };
    }
    return target;
}


// const symbol = Symbol("test");
// const parent = { parent: "parent" };
// // let target = { a: {}, 1: [], [symbol]: 3 };
// // let template = {};

// let target = { a: {}, 1: [], [symbol]: 3 };
// let sources = [{ a: {} }, { 1: [] }];

// console.log(substract(target, ...sources));

// console.log(sources);
// let source_array = [];
// for (const source of sources) {
//     source_array.push(...Object.keys(source));
//     console.log(source_array);
// }
