console.log("cruncher");

addEventListener("message", (event) => {
    // console.log("message recieved at WorkerGlobalObject: ", event);
    postMessage(`request: ${event.data}`);
})

