export function newHashTable(capacity) {
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
        get(key) {
            // keyにマップされた値を取得する
            if (typeof key !== "string") {
                throw TypeError(`Invalid input type: ${typeof key}`);
            }
            for (let element of this.entries) {
                while (element) {
                    if (element["key"] === key) {
                        return element["value"];
                    }
                    element = element["next"];
                }
            }
            throw Error(`${key} does not exist`);
        },

        put(key, value) {
            // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
            if (typeof key !== "string") {
                throw TypeError(`Invalid input type: ${typeof key}`);
            }
            // keyが存在する場合はvalueを更新
            for (let element of this.entries) {
                while (element) {
                    if (element["key"] === key) {
                        // console.log(`value updated to ${value} for ${key} `)
                        element["value"] = value;
                        return true;
                    }
                    element = element["next"];
                }
            }

            // ハッシュテーブル作成
            let hashValue = (this.size) % this.entries.length;

            // ハッシュテーブルに文字列が存在していなければ新しく登録
            // ハッシュ値が衝突していなければペアを登録
            if (!this.entries[hashValue]) {
                // console.log(`key-value pair added: ${key}, ${value}`);
                this.entries[hashValue] = { key: key, value: value, next: undefined };
                this.size++;
            } else {
                let element = this.entries[hashValue];
                while (element["next"]) {
                    element = element["next"];
                }
                // console.log(`key-value pair added: ${key}, ${value}`);
                element["next"] = { key: key, value: value, next: undefined };
                this.size++;
            }
        },

        remove(key) {
            if (typeof key !== "string") {
                throw TypeError(`Invalid input type: ${typeof key}`);
            }
            for (let i = 0; i < this.entries.length; i++) {
                let currElement = this.entries[i];
                let prevElement = undefined;
                while (currElement) {
                    if (currElement["key"] === key) {
                        // console.log(`key-value pair removed: ${key}`);
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
