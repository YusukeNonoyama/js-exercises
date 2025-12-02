const requestLabel = document.querySelector("#request");
const responseLabel = document.querySelector("#response");
const start = document.querySelector("#start");
const input = document.querySelector("#input");

start.addEventListener("click", async (event) => {
    requestLabel.textContent = input.value.trim();
    console.log(input.value.trim());
    const URL = "http://127.0.0.1:11434/api/chat";
    const requestBody = {
        "model": "gemma:2b",
        "messages": [
            { "role": "user", "content": input.value.trim() }
        ]
    };

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    console.log(response);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let outputText = "";
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        let text = decoder.decode(value, { stream: true });

        text.split("\n").forEach(line => {
            if (!line.trim()) return;
            const json = JSON.parse(line);
            outputText += json.message?.content ?? json;
            responseLabel.textContent = outputText;
        });
    }
    console.log(outputText);
})