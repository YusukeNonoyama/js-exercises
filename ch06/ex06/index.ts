// オブジェクトのすべての独自プロパティおよび列挙可能な継承プロパティのプロパティ名の配列を返す関数
export function showProperties(o: {}) {
    if (typeof o !== "object") {
        throw new Error(`invalid input: ${o}`);
    }
    if (o === null) {
        throw new Error(`invalid input: ${o}`);
    }
    return [
        ...Object.getOwnPropertyNames(o),   // Symbol以外の全ての独自プロパティ（列挙不可含む）
        ...Object.getOwnPropertySymbols(o),     // 独自プロパティのSymbol
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(o)),    // Symbol以外の全ての継承プロパティ
    ]
}