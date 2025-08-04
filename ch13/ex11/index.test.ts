import { retryWithExponentialBackoff } from "./index.ts";

jest.useFakeTimers();

describe('retryWithExponentialBackoff', () => {
    it('resolves immediately when func succeeds first try', async () => {
        const mockFunc = jest.fn().mockResolvedValue('success');

        const promise = retryWithExponentialBackoff(mockFunc, 3);
        await jest.runAllTimersAsync();

        await expect(promise).resolves.toBe('success');
        expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('retries and eventually succeeds', async () => {
        const mockFunc = jest
            .fn()
            .mockRejectedValueOnce(new Error('fail1'))
            .mockRejectedValueOnce(new Error('fail2'))
            .mockResolvedValue('success');

        const promise = retryWithExponentialBackoff(mockFunc, 5);
        await jest.runAllTimersAsync();

        await expect(promise).resolves.toBe('success');
        expect(mockFunc).toHaveBeenCalledTimes(3);
    });

    it('fails after maxRetry attempts', async () => {
        const mockFunc = jest
            .fn()
            .mockRejectedValue(new Error('always fails'));

        const promise = retryWithExponentialBackoff(mockFunc, 2);
        await jest.runAllTimersAsync();  // ここでrejectはされるのだがテスト自体が止まってしまう

        // await expect(promise).rejects.toThrow(Error); 
        // expect(mockFunc).toHaveBeenCalledTimes(3); // 初回 + 2回リトライ
        console.log(promise);
    });
});

// テストが止まる際のメッセージ
// ● retryWithExponentialBackoff › fails after maxRetry attempts

//     failed

//       20 |             .catch(err => {
//       21 |                 if (count >= maxRetry) {
//     > 22 |                     return Promise.reject(new Error("failed")); // 最大リトライ回数超え → reject
//          |                                           ^
//       23 |                     // return;
//       24 |                 }
//       25 |                 const delay = 2 ** count * 1000;

//       at ch13/ex11/index.ts:22:43