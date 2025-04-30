function newHashTable(capacity) {
    return {
        size: 0, // マッピング数を示すプロパティ
        entries: new Array(capacity), // マッピングを格納する固定長の配列
        get(key) {
            // keyにマップされた値を取得する
            for (let element of this.entries) {
                if (element === undefined) continue;
                if (element["key"] === key) return element["value"];
                if (element["next"] !== undefined) {
                    let a = getValue(element["next"], key);
                    if(a){
                        return a;
                    } else{
                        continue;
                    }
                };
            }
            return `${key} does not exist`;
        },
        put(key, value) {
            // keyが存在する場合はvalueを更新、再帰的にkeyを確認
            for (let element of this.entries) {
                if (element === undefined) continue;
                if (element["key"] === key) {
                    element["value"] = value;
                    return;
                } else {
                    if (element["next"] === undefined) continue;
                    updateValue(element["next"], key, value);
                };
            }
            let hashValue = createHash(this);
            // ハッシュテーブルに文字列が存在していなければ新しく登録
            // ハッシュ値が衝突していなければペアを登録
            if (this.entries[hashValue] === undefined) {
                this.entries[hashValue] = { key: key, value: value, next: undefined };
                this.size += 1;
                // ハッシュ値が衝突していたら再帰的に調べてnextに登録
            } else {
                this.size = createObject(this.entries[hashValue], this.size, key, value);
            }
        },
        remove(key) {
            // keyのマッピングを削除する
            for (let index in this.entries) {
                if (this.entries[index] === undefined) continue;
                if (this.entries[index]["key"] === key) {
                    this.entries[index] = this.entries[index]["next"]
                    this.size -= 1;
                };
                if (this.entries[index]["next"] !== undefined) {
                    [this.entries[index]["next"], this.size] = removePair(this.entries[index]["next"], key, this.size);
                };
            }
        },
    };
}

// エントリー数を配列の固定長で割った値をhash値として返す
function createHash(hashTable) {
    return (hashTable.size) % hashTable.entries.length;
}

// 次のレイヤーのkeyを再帰的に探してget
function getValue(o, targetKey) {
    if (o["key"] === targetKey) return o["value"];
    if (o["next"] !== undefined) return getValue(o["next"], targetKey);
}

// 次のレイヤーのkeyを再帰的に探してput
function updateValue(o, targetKey, targetValue) {
    // console.log("o:", o);
    if (o["key"] === targetKey) {
        // オブジェクトは参照を受け取っているからそのまま代入してOK
        o["value"] = targetValue;
    } else {
        // リンクリストの先がなければupdateValueを終了（呼び出し元に戻って次のループ）
        if (o["next"] === undefined) return;
        updateValue(o["next"], targetKey, targetValue);
    }
}

// リンクリストの次のobjectに対して同じ評価を再帰的に繰り返す
function createObject(o, size, key, value) {
    if (o["next"] === undefined) {
        o["next"] = { key: key, value: value, next: undefined };
        return ++size;
    } else {
        return createObject(o["next"], size, key, value);
    }
}

// 次のレイヤーのkeyを再帰的に探してremove
function removePair(o, targetKey, size) {
    if (o["key"] === targetKey) {
        return [o["next"], --size];
    };
    if (o["next"] !== undefined) [o["next"], size] = removePair(o["next"], targetKey, size);
    return [o, size];
}

function sample() {
    const hashTable = newHashTable(10);
    hashTable.put("key1", "value1");
    hashTable.put("key2", { value: "value2" });

    console.log(`size=${hashTable.size}`); // => size=2
    console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
    console.log(`${hashTable.get("key5")}`); // => key1=value1
    console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

    hashTable.put("key2", "new value");

    console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

    hashTable.remove("key2");

    console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
    console.log(`size=${hashTable.size}`); // => size=1
}

function sample2() {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    console.log(hashTable.size);
    hashTable.put("key2", "value2");
    console.log(hashTable.size);
    hashTable.put("key3", "value3");
    console.log(hashTable.size);
    hashTable.put("key4", "value4");
    console.log(hashTable.size);
    hashTable.put("key5", "value5");
    console.log(hashTable.size);
    hashTable.put("key6", "value6");
    hashTable.put("key3", "value33");
    console.log(hashTable.size);
    hashTable.put("key7", "value7");
    console.log(hashTable.size);
    hashTable.put("key8", "value8");
    console.log(hashTable.size);
    hashTable.put("key9", "value9");
    console.log(hashTable.size);
    hashTable.put("key10", "value10");
    console.log(hashTable.size);
    console.log(hashTable.get("key3"));
    console.log(hashTable.get("key4"));
    console.log(hashTable.get("key6"));
    console.log(hashTable.get("key9"));

    console.log(hashTable.entries);

    console.log(JSON.stringify(hashTable.entries));
    console.log(`size=${hashTable.size}`);
    hashTable.remove("key9");
    console.log(JSON.stringify(hashTable.entries));
    console.log(`size=${hashTable.size}`);
    hashTable.remove("key5");
    console.log(JSON.stringify(hashTable.entries));
    console.log(`size=${hashTable.size}`);
    hashTable.remove("key3");
    console.log(JSON.stringify(hashTable.entries));
    console.log(`size=${hashTable.size}`);
    hashTable.remove("key5");
    console.log(JSON.stringify(hashTable.entries));
    console.log(`size=${hashTable.size}`);
}

// sample();
// console.log("=================================");
sample2();