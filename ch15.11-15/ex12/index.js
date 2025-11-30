const btnGetFileList = document.querySelector("#get-file-list");
const inputToken = document.querySelector("#token");


btnGetFileList.addEventListener("click", async (event) => {
    const TOKEN = inputToken.value.trim();

    console.log("TOKEN: ", TOKEN);
    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        method: "GET",
        headers: { 'Authorization': `Bearer ${TOKEN}` }

    })
    console.log("response: ", response);

    const body = await response.json();
    console.log("body: ", body);
})