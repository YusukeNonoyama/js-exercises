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

        const promise = retryWithExponentialBackoff(mockFunc, 4);
        await jest.runAllTimersAsync();  // ここでrejectはされるのだがテスト自体が止まってしまう

        await expect(promise).rejects.toThrow(Error);
        expect(mockFunc).toHaveBeenCalledTimes(4); // 初回 + 2回リトライ
        console.log(promise);
    });
});

// テストが止まる際のメッセージ
// プロミスがrejectedで返っているのにテストが成功しない

// npm run test:ts ch13/ex11

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ch13/ex11

//   console.log
//     Promise {
//       <rejected> Error: failed
//           at tryFunc (/home/nonoyama/js/js-exercises/ch13/ex11/index.ts:36:15)
//     }

//       at Object.<anonymous> (ch13/ex11/index.test.ts:40:17)

// (node:3467) PromiseRejectionHandledWarning: Promise rejection was handled asynchronously (rejection id: 7)
// (Use `node --trace-warnings ...` to show where the warning was created)
//  FAIL  ch13/ex11/index.test.ts
//   retryWithExponentialBackoff
//     ✓ resolves immediately when func succeeds first try (3 ms)
//     ✓ retries and eventually succeeds (2 ms)
//     ✕ fails after maxRetry attempts (33 ms)

//   ● retryWithExponentialBackoff › fails after maxRetry attempts

//     failed

//       34 |             }
//       35 |         }
//     > 36 |         throw new Error("failed"); // After exhausting retries
//          |               ^
//       37 |     }
//       38 |
//       39 |     return tryFunc();

//       at tryFunc (ch13/ex11/index.ts:36:15)