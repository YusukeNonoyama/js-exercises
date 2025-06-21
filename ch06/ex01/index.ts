function djb2Hash(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + c
    }
    return hash >>> 0; // Convert to unsigned 32-bit integer
}


export function newHashTable(capacity: number) {
    // validation
    if (typeof capacity !== "number") {
        throw TypeError(`Invalid input type: ${typeof capacity}`);
    }
    if (capacity < 1) {
        throw RangeError(`Invalid input number (capacity > 0): ${capacity}`);
    }
    return {
        size: 0, // マッピング数を示すプロパティ
        entries: new Array(capacity), // マッピングを格納する固定長の配列
        get(key: string) {
            // keyにマップされた値を取得する
            if (typeof key !== "string") {
                throw TypeError(`Invalid input type: ${typeof key}`);
            }
            for (let element of this.entries) {
                while (element) {
                    // 入力のkeyが存在する場合は対応するvalueを返す
                    if (element["key"] === key) {
                        return element["value"];
                    }
                    // 入力のkeyが存在しなければ次の要素へ移動
                    element = element["next"];
                }
            }
            throw Error(`${key} does not exist`);
        },

        put(key: string, value: string) {
            // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
            if (typeof key !== "string" || typeof value !== "string") {
                throw TypeError(`Invalid input type: ${typeof key}, ${typeof value}`);
            }
            for (let element of this.entries) {
                while (element) {
                    // keyが存在する場合はvalueを更新
                    if (element["key"] === key) {
                        element["value"] = value;
                        return;
                    }
                    // 入力のkeyが存在しなければ次の要素へ移動
                    element = element["next"];
                }
            }
            // ハッシュ値を算出（マッピング数を固定長で割った余り）
            let hashValue = this.size % this.entries.length;
            // ハッシュテーブルに文字列が存在していなければ新しく登録
            // ハッシュ値が衝突していなければペアを登録
            if (!this.entries[hashValue]) {
                this.entries[hashValue] = { key: key, value: value, next: undefined };
                this.size++;
            } else {
                let element = this.entries[hashValue];
                // undefinedのnextプロパティを持つ要素までループしてペアを登録
                while (element["next"]) {
                    element = element["next"];
                }
                element["next"] = { key: key, value: value, next: undefined };
                this.size++;
            }
        },

        remove(key: string) {
            if (typeof key !== "string") {
                throw TypeError(`Invalid input type: ${typeof key}`);
            }
            for (let i = 0; i < this.entries.length; i++) {
                let currElement = this.entries[i];
                let prevElement = undefined;
                while (currElement) {
                    if (currElement["key"] === key) {
                        if (prevElement === undefined) {
                            // 始めのループで見つかる場合
                            this.entries[i] = currElement["next"];
                        } else {
                            // ２回目以降のループで見つかる場合（見つけたkeyの場所"prevElement["next"]に次のcurrElement["next"]を入れて、見つけたkeyを削除"）
                            prevElement["next"] = currElement["next"];
                        }
                        this.size--;
                        return;
                    }
                    prevElement = currElement;
                    currElement = currElement["next"];
                }
            }
            throw Error(`${key} does not exist`);
        }
    };
}
