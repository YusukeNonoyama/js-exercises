import { retryWithExponentialBackoff } from "./index.ts";

// setTimeout等のタイマーを実行せずにテストできるようにする
jest.useFakeTimers();

describe('retryWithExponentialBackoff()', () => {
    it('maxRetryに到達する前にfuncがtrueを返す', () => {
        const func = jest.fn();
        const callback = jest.fn();

        // 3回目でtrueを返すようにfuncのmockを設定
        func.mockReturnValueOnce(false)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        retryWithExponentialBackoff(func, 5, callback);

        // setTimeout()を呼び出す前の1回の呼び出し
        expect(func).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(1000);
        expect(func).toHaveBeenCalledTimes(2);

        jest.advanceTimersByTime(2000);
        expect(func).toHaveBeenCalledTimes(3);

        // 3回目の後にcallbackがtrueで呼び出される
        expect(callback).toHaveBeenCalledWith(true);
        // trueを引数にcallbackが呼ばれていること
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call callback with false after maxRetry', () => {
        // funcは必ずfalseを返す
        const func = jest.fn(() => false);
        const callback = jest.fn();

        retryWithExponentialBackoff(func, 3, callback);

        //最初の1回
        expect(func).toHaveBeenCalledTimes(1);

        // retryの3回
        jest.advanceTimersByTime(1000);
        expect(func).toHaveBeenCalledTimes(2);

        jest.advanceTimersByTime(2000);
        expect(func).toHaveBeenCalledTimes(3);

        jest.advanceTimersByTime(4000);
        expect(func).toHaveBeenCalledTimes(4); // initial + 3 retries

        // 3回目にfalseを引数にcallbackが呼ばれる
        expect(callback).toHaveBeenCalledWith(false);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});


// import { retryWithExponentialBackoff } from "./index.ts";

// describe("retryWithExponentialBackoff()", () => {
//     it("funcが必ずtrueを返す場合funcの実行は1回", () => {
//         let count = 0;
//         retryWithExponentialBackoff(() => {
//             count++;
//             return true;
//         }, 5, (result: boolean) => { })
//         expect(count).toBe(1);
//     });
//     it("funcがretry4回目にtrueを返す場合funcの実行は5回", () => {
//         let count = 0;
//         retryWithExponentialBackoff(() => {
//             count++;
//             if (count === 5) {
//                 return true;
//             } else {
//                 return false;
//             }
//         }, 5, (result: boolean) => { })
//         expect(count).toBe(5);
//     });
// });


// 受け取った関数 func を呼び出し、func が true を返せばそこで終了する

// func が false を返した場合は以下の待ち時間後に func 呼び出しをリトライする
// 待ち時間はfuncの呼び出し回数に応じて 1 秒, 2 秒, 4 秒, ...と 2 倍に増えていく

// maxRetry 回リトライしても成功しない場合はそこで終了する

// retryWithExponentialBackoffに対する呼び出しは即座に完了し、func の呼び出しは非同期に行われる

// func が true を返す、または maxRetry 回のリトライが失敗し終了する際、その結果(true/false)を引数として関数 callback が呼び出される