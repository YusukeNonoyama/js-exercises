function wait(msec: number) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}
// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v: any) => console.log(v);
const logA = () => console.log("A");
const logB = () => console.log("B");
const logC = () => console.log("C");

// 例外
const errX = () => {
    throw new Error("X");
};
const errY = () => {
    throw new Error("Y");
};


async function h1() {
    try {
        await wait3();
        logA();
        await wait2();
        logB();
        await wait1();
        logC();
    } catch (e: any) {
        log(e.message);
    }
}

function h2() {
    // NOTE: h3 との比較用
    new Promise(() => {
        errX();
    }).catch((e) => log(e.message));
}

function h3() {
    // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
    new Promise(async () => {
        errX();
    }).catch((e) => log(e.message));
}

async function h4() {
    // NOTE: 2つの例外は両方 catch できるか？
    try {
        const p1 = wait2().then(() => {
            errX();
        });
        const p2 = wait1().then(() => {
            errY();
        });
        await p1;
        await p2;
    } catch (e: any) {
        log(e.message);
    }
}
h4();