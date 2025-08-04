// 11 章の演習問題で作成した retryWithExponentialBackoff に対して Promise を返すように実装を変更しなさい。
// 引数の func は Promise を返す関数とし、
// func の返り値が成功した場合は retryWithExponentialBackoff の返り値をその値で解決しなさい。
// また func の返り値が失敗した場合は一定時間後にリトライしなさい。
// 一定回数以上 func が失敗した場合は retryWithExponentialBackoff の返り値を失敗させなさい。

// 作成した関数を使えば以下のようなコードで HTTP リクエストのリトライを行える:
// const resp = await retryWithExponentialBackoff(
//   () => fetch("https://example.com"),
//   5
// );

export function retryWithExponentialBackoff(func: () => Promise<any>, maxRetry: number): Promise<any> {
    let count = 0;
    function tryFunc(): Promise<any> {
        return func()
            .then(result => {
                return result; // 成功したらそのまま resolve
            })
            .catch(err => {
                if (count >= maxRetry) {
                    return Promise.reject(new Error("failed")); // 最大リトライ回数超え → reject
                    // return;
                }
                const delay = 2 ** count * 1000;
                count++;
                return new Promise((resolve) => setTimeout(resolve, delay)).then(tryFunc);
            });
    }
    return tryFunc();
}
