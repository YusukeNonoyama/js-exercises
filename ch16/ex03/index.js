import crypto from "crypto";
// ここを埋める
import fs from "fs/promises";

const keyPath = "ch16/ex03/key.json";
const dataPath = "ch16/ex03/data.json";


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
    const iv = crypto.randomBytes(16);

    // 暗号化とBase64エンコード
    // ここを埋める
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); //crypto.Cipherに相当?
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
    // そのままシリアライズするとファイルサイズが大きくなるためbase64変換する
    await fs.writeFile(keyPath, JSON.stringify({ key: key.toString("base64") }));
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
    // ここを埋める（fsで暗号データを保存）
    await fs.writeFile(dataPath, JSON.stringify(data));
}

async function readKey() {
    // ここを埋める（return Promise<鍵>）
    const json = await fs.readFile(keyPath);
    const data = JSON.parse(json);
    // ArrayBufferに戻して返す
    return Buffer.from(data.key, "base64");
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
    // ここを埋める（return Promise<data>）
    const json = await fs.readFile(dataPath);
    return JSON.parse(json);
}

// 復号して平文を返す
function decrypt64(data, key) {
    const iv = Buffer.from(data.iv, "base64");
    const encrypted = Buffer.from(data.value, "base64");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv); //crypto.Cipherに相当?
    let decrypted = decipher.update(encrypted);
    decrypted += decipher.final("utf8");

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
