// Web Workerオブジェクトを作成
// const dataCruncher = new Worker("utils/cruncher.js");
const dataCruncher = new Worker("/ch15.11-15/ex10/utils/cruncher.js");

// ファイル選択を押したときにイベント
document.getElementById("image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
        img.src = e.target.result;
    });

    img.addEventListener("load", () => {
        const originalCanvas = document.getElementById("original");
        const filteredCanvas = document.getElementById("filtered");
        const originalCtx = originalCanvas.getContext("2d");
        const filteredCtx = filteredCanvas.getContext("2d");

        originalCanvas.width = img.width;
        originalCanvas.height = img.height;
        filteredCanvas.width = img.width;
        filteredCanvas.height = img.height;

        originalCtx.drawImage(img, 0, 0);

        const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        // Workerへ処理する画像を送信
        dataCruncher.postMessage({
            type: "request",
            value: data,
            image: {
                width: img.width,
                height: img.height
            }
        })

        // Workerからresponseが返ってきたら処理後の画像をcanvasへ描画
        dataCruncher.addEventListener("message", (event) => {
            if (event.data.type === "response") {
                filteredCtx.putImageData(event.data.value, 0, 0);
            }
        });
    });

    reader.readAsDataURL(file);

});

