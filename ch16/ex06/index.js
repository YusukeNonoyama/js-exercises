import fs from "fs";

fs.truncate("ch16/ex06/hello.txt", 10, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("truncate done")
});