export function newHashTable(capacity) {
    // capacityのinput確認
    if (typeof capacity !== "number") return `Invalid input type: ${typeof capacity}`;
    if (capacity < 1) return `Invalid input number (capacity > 0): ${capacity}`;
    return {
        size: 0, // マッピング数を示すプロパティ
        entries: new Array(capacity), // マッピングを格納する固定長の配列
        get(key) {
            // keyにマップされた値を取得する
            if (typeof key !== "string") return `Invalid input type: ${typeof key}`;
            for (let element of this.entries) {
                if (!element) continue;
                let valueFetched = getValue(element, key);
                if (valueFetched) return valueFetched;
            }
            return `${key} does not exist`;
        },
        put(key, value) {
            // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
            if (typeof key !== "string") {
                console.log(`Invalid input type: ${typeof key}`);
                return;
            }
            // keyが存在する場合はvalueを更新、再帰的にkeyを確認
            for (let element of this.entries) {
                if (!element) continue;
                if (updateValue(element, key, value)) return;
            }
            let hashValue = createHash(this);
            // ハッシュテーブルに文字列が存在していなければ新しく登録
            // ハッシュ値が衝突していなければペアを登録
            if (!this.entries[hashValue]) {
                console.log(`key-value pair added: ${key}, ${value}`)
                this.entries[hashValue] = { key: key, value: value, next: undefined };
                this.size++;
            // ハッシュ値が衝突していたら再帰的に調べてnextに登録
            } else {
                this.size = addKeyValuePair(this.entries[hashValue], this.size, key, value);
            }
        },
        remove(key) {
            // keyのマッピングを削除する
            if (typeof key !== "string") {
                console.log(`Invalid input type: ${typeof key}`);
                return;
            }
            let keyExisted = false;
            for (let i = 0; i < this.entries.length; i++){
                if (!this.entries[i]) continue;
                [this.entries[i], this.size, keyExisted] = removeKeyValuePair(this.entries[i], key, this.size, keyExisted);
                if (keyExisted) return;
            }
            console.log(`${key} does not exist`);
        },
    };
}

// ハッシュ関数（エントリー数を配列の固定長で割った値をhash値として返す）
function createHash(hashTable) {
    return (hashTable.size) % hashTable.entries.length;
}

// 次のレイヤーのkeyを再帰的に探してget
function getValue(o, targetKey) {
    if (o["key"] === targetKey) return o["value"];
    if (o["next"]) return getValue(o["next"], targetKey);
}

// 次のレイヤーのkeyを再帰的に探してput
function updateValue(o, targetKey, targetValue) {
    if (o["key"] === targetKey) {
        // オブジェクトは参照を受け取っているからそのまま代入してOK
        console.log(`value updated to ${targetValue} for ${targetKey} `)
        o["value"] = targetValue;
        return true;
    } else {
        // リンクリストの先がなければupdateValueを終了（呼び出し元に戻って次のループ）
        if (!o["next"]) return;
        return updateValue(o["next"], targetKey, targetValue);
    }
}

// リンクリストの次のobjectに対して同じ評価を再帰的に繰り返す
function addKeyValuePair(o, size, key, value) {
    if (!o["next"]) {
        console.log(`key-value pair added: ${key}, ${value}`)
        o["next"] = { key: key, value: value, next: undefined };
        return ++size;
    } else {
        return addKeyValuePair(o["next"], size, key, value);
    }

    // if (!o["next"]) {
    //     console.log(`key-value pair added: ${key}, ${value}`)
    //     o["next"] = { key: key, value: value, next: undefined };
    //     return ++size;
    // } else {
    //     return addKeyValuePair(o["next"], size, key, value);
    // }
}

// 次のレイヤーのkeyを再帰的に探してremove
function removeKeyValuePair(o, targetKey, size, keyExisted) {
    // keyが見つかったらそのkeyのnextの中身を返して元のオブジェクトに代入（つまり見つかったkeyのペアだけ消える）
    if (o["key"] === targetKey) {
        console.log(`key-value pair removed: ${targetKey}`);
        return [o["next"], --size, true];
    }
    // nextにオブジェクトがある場合は再帰的に探す
    if (o["next"]) [o["next"], size, keyExisted] = removeKeyValuePair(o["next"], targetKey, size, keyExisted);
    // keyがない場合はそのまま返す、再帰的に見つかった場合のその返りをそのまま返す
    return [o, size ,keyExisted];
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

function test1() {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.put("key4", "value4");
    hashTable.put("key5", "value5");
    hashTable.put("key6", "value6");
    hashTable.put("key7", "value7");
    hashTable.put("key8", "value8");

    console.log(hashTable.get("key1"));
    console.log(hashTable.get("key2"));
    console.log(hashTable.get("key3"));
    console.log(hashTable.get("key4"));
    console.log(hashTable.get("key5"));
    console.log(hashTable.get("key6"));
    console.log(hashTable.get("key7"));
    console.log(hashTable.get("key8"));

    console.log(hashTable.get({x:1, y:2}));
    console.log(hashTable.get("key9"));
    console.log(hashTable.get(8));
    console.log(hashTable.get(true));
    console.log(hashTable.get(undefined));
    console.log(hashTable.get(null));

    console.log(JSON.stringify(hashTable.entries));
}

function test2() {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.put("key4", "value4");
    hashTable.put("key5", "value5");
    hashTable.put("key6", "value6");
    hashTable.put("key7", "value7");
    hashTable.put("key8", "value8");

    hashTable.put("key1", "value1_modified");
    hashTable.put("key2", "value2_modified");
    hashTable.put("key3", "value3_modified");
    hashTable.put("key4", "value4_modified");
    hashTable.put("key5", "value5_modified");
    hashTable.put("key6", "value6_modified");
    hashTable.put("key7", "value7_modified");
    hashTable.put("key8", "value8_modified");

    hashTable.put({x:1, y:2}, "object");
    hashTable.put(8, "value8");
    hashTable.put(true, "true");
    hashTable.put(undefined, "undefined");
    hashTable.put(null, "null");

    console.log(hashTable.get("key1"));
    console.log(hashTable.get("key2"));
    console.log(hashTable.get("key3"));
    console.log(hashTable.get("key4"));
    console.log(hashTable.get("key5"));
    console.log(hashTable.get("key6"));
    console.log(hashTable.get("key7"));
    console.log(hashTable.get("key8"));

    console.log(JSON.stringify(hashTable.entries));

}

function test3() {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.put("key4", "value4");
    hashTable.put("key5", "value5");
    hashTable.put("key6", "value6");
    hashTable.put("key7", "value7");
    hashTable.put("key8", "value8");

    console.log(JSON.stringify(hashTable.entries));

    hashTable.remove("key1");
    hashTable.remove("key2");
    hashTable.remove("key3");
    hashTable.remove("key4");
    hashTable.remove("key5");
    hashTable.remove("key6");
    hashTable.remove("key7");
    hashTable.remove("key8");
    hashTable.remove("key9");

    hashTable.remove({x:1, y:2}, "object");
    hashTable.remove(8, "value8");
    hashTable.remove(true, "true");
    hashTable.remove(undefined, "undefined");
    hashTable.remove(null, "null");

    console.log(JSON.stringify(hashTable.entries));

    console.log(hashTable.get("key1"));
    console.log(hashTable.get("key2"));
    console.log(hashTable.get("key3"));
    console.log(hashTable.get("key4"));
    console.log(hashTable.get("key5"));
    console.log(hashTable.get("key6"));
    console.log(hashTable.get("key7"));
    console.log(hashTable.get("key8"));
    console.log(hashTable.get("key1"));

    console.log(JSON.stringify(hashTable.entries));

}

function test4() {
    const hashTable = newHashTable(3);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.put("key4", "value4");
    hashTable.put("key5", "value5");
    hashTable.put("key6", "value6");
    hashTable.put("key7", "value7");
    hashTable.put("key8", "value8");

    console.log(JSON.stringify(hashTable.entries));

    hashTable.remove("key9");
    hashTable.remove("key8");
    hashTable.remove("key7");
    hashTable.remove("key6");
    hashTable.remove("key5");
    hashTable.remove("key4");
    hashTable.remove("key3");
    hashTable.remove("key2");
    hashTable.remove("key1");

    console.log(JSON.stringify(hashTable.entries));

}

function test5() {
    const hashTable1 = newHashTable(0);
    const hashTable2 = newHashTable(-5);
    const hashTable3 = newHashTable("10");
    const hashTable4 = newHashTable({x:1, y:2});
    const hashTable5 = newHashTable(true);
    const hashTable6 = newHashTable(undefined);
    const hashTable7 = newHashTable(null);

    const hashTable_01 = newHashTable(1);
    hashTable_01.put("key1", "value1");
    hashTable_01.put("key2", "value2");
    hashTable_01.put("key3", "value3");
    hashTable_01.put("key4", "value4");
    hashTable_01.put("key5", "value5");
    hashTable_01.put("key6", "value6");
    hashTable_01.put("key7", "value6");
    hashTable_01.put("key8", "value8");
    hashTable_01.put("key9", "value9");
    hashTable_01.put("key10", "value10");

    console.log(JSON.stringify(hashTable_01.entries));


    const hashTable_10 = newHashTable(10);
    
    hashTable_10.put("key1", "value1");
    hashTable_10.put("key2", "value2");
    hashTable_10.put("key3", "value3");
    hashTable_10.put("key4", "value4");
    hashTable_10.put("key5", "value5");
    hashTable_10.put("key6", "value6");
    hashTable_10.put("key7", "value6");
    hashTable_10.put("key8", "value8");
    hashTable_10.put("key9", "value9");
    hashTable_10.put("key10", "value10");
    hashTable_10.put("key11", "value11");

    console.log(JSON.stringify(hashTable_10.entries));
}

// console.log("=sample=================================================")
// sample();
// console.log("=sample2=================================================")
// sample2();
// console.log("=test1:get=================================================")
// test1();
// console.log("=test2:put=================================================")
// test2();
// console.log("=test3:remove=================================================")
// test3();
// console.log("=test4:remove=================================================")
// test4();
// console.log("=test5:array length=================================================")
// test5();
