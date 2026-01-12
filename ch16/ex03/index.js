import crypto from "crypto";
// ここを埋める
import fs from "fs/promises";

const keyPath = "ch16/ex03/assets/key.json";
const dataPath = "ch16/ex03/assets/data.json";

// 鍵を生成する
function generateKey() {
    // 32バイトの暗号論的疑似乱数を生成する
    // ここを埋める
    return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
    // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
    // ここを埋める
    // note：IVは同じ鍵で複数回暗号化しても毎回異なる暗号文を生成させるためのランダムで固定長の「初期値」
    const iv = crypto.randomBytes(16);

    // 暗号化とBase64エンコード
    // ここを埋める
    // "aes-256-cbc"で暗号化
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedBase64 = cipher.update(text, "utf8", "base64");
    encryptedBase64 += cipher.final("base64");

    // 暗号文とIVをbase64で返す
    return {
        value: encryptedBase64,
        iv: iv.toString("base64"),
    };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
    // ここを埋める（fsで鍵を保存）
    // 質問：鍵もbase64に変換すべきでしょうか？（base64でなくても保存はできる）
    await fs.writeFile(keyPath, JSON.stringify({ key: key.toString("base64") }));
    // await fs.writeFile(keyPath, JSON.stringify(key));  // base64で保存しない場合
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
    // ここを埋める（fsで暗号データを保存）
    await fs.writeFile(dataPath, JSON.stringify(data));
}

async function readKey() {
    // ここを埋める（return Promise<鍵>）
    return fs.readFile(keyPath).then(response => JSON.parse(response));
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
    // ここを埋める（return Promise<data>）
    return fs.readFile(dataPath).then(response => JSON.parse(response));
}

// 復号して平文を返す
function decrypt64(data, key) {
    // ここを埋める
    // iv, data, keyをArrayBufferに変換
    const iv = Buffer.from(data.iv, "base64");
    const encrypted = Buffer.from(data.value, "base64");
    key = Buffer.from(key.key, "base64");
    // key = Buffer.from(key.data); // base64で保存しない場合

    // 復号
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);  // デコーダ
    let decrypted = decipher.update(encrypted); // デコード結果のバイト列を返す
    decrypted += decipher.final("utf8");    // utf8エンコードを返す（finalメソッドを呼ぶとこのDecipherivオブジェクトはもう使えなくなる）
    return decrypted;
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
    // 平文
    const text = "Hello, World!";

    // 暗号化とBase64エンコード
    const key = generateKey();
    const encryptedData = encrypt64(text, key);

    // 鍵と暗号データをJSONで保存
    await writeKey(key);
    await writeEncrypt64(encryptedData);

    console.log("Encrypted Text (Base64):", encryptedData.value);

    // Base64デコードと復号
    const storedKey = await readKey();
    const storedEncryptedData = await readEncrypt64();
    const decryptedText = decrypt64(storedEncryptedData, storedKey);

    console.log("Decrypted Text:", decryptedText);
})();
