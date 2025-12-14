const requestLabel = document.querySelector("#request");
const responseLabel = document.querySelector("#response");
const start = document.querySelector("#start");
const input = document.querySelector("#input");

// 送信ボタンを押したときのイベント
start.addEventListener("click", async (event) => {

    requestLabel.textContent = input.value.trim();
    const URL = "http://127.0.0.1:11434/api/chat";

    // リクエストボディの設定
    const requestBody = {
        "model": "gemma:2b",
        "messages": [
            { "role": "user", "content": input.value.trim() }
        ]
    };

    // リクエストの送信
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    // ストリーム呼び出しオブジェクト
    const reader = response.body.getReader();
    // バイトデータをテキストデータに変換する
    const decoder = new TextDecoder("utf-8");

    let outputText = "";
    while (true) {
        // チャンクの読み出し
        const { value, done } = await reader.read();
        // 最後のチャンクならループを抜ける
        if (done) break;

        // Unit8Array形式のvalueをテキストにする
        let text = decoder.decode(value, { stream: true });

        text.split("\n").forEach(line => {
            if (!line.trim()) return;
            const json = JSON.parse(line);
            // 各チャンクからメッセージの部分を抽出
            outputText += json.message.content;
            responseLabel.textContent = outputText;
        });
    }
})