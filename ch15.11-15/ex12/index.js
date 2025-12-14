const btnGetFileList = document.querySelector("#get-file-list");
const btnPostFile = document.querySelector("#post-file");
const inputToken = document.querySelector("#token");

// OneDriveへファイルを送るPUTリクエストのボタン
btnPostFile.addEventListener("click", async (event) => {

    // ファイル指定をバリデーション
    const FILE = document.querySelector("#fileInput").files[0];
    if (!FILE) {
        console.log("no file was selected");
        return;
    }

    // TOKEN指定のバリデーション
    // TOKENはこちらから取得： https://developer.microsoft.com/en-us/graph/graph-explorer
    const TOKEN = inputToken.value.trim();
    if (!TOKEN) {
        console.log("no TOKEN was selected");
        return;
    }

    // OneDriveの自分のアカウントのルートに配置
    const URL = `https://graph.microsoft.com/v1.0/me/drive/root:/${FILE.name}:/content`;

    // OneDriveへPUTリクエスト送信
    const response = await fetch(URL, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': FILE.type
        },
        body: FILE
    })

    if (response.ok) {
        console.log("file was sent successfully");
    }
})

// 認証確認用のGETリクエスト
btnGetFileList.addEventListener("click", async (event) => {
    const TOKEN = inputToken.value.trim();
    if (!TOKEN) {
        console.log("no TOKEN was selected");
        return;
    }
    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        }
    })

    const body = await response.json();
    console.log("body: ", body);
})
