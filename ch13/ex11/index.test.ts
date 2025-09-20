import { retryWithExponentialBackoff } from "./index.ts";

jest.useFakeTimers();

describe("retryWithExponentialBackoff", () => {
  it("最初に成功", async () => {
    const mockFunc = jest.fn().mockResolvedValue("success");

    const promise = retryWithExponentialBackoff(mockFunc, 3);
    await jest.runAllTimersAsync();

    await expect(promise).resolves.toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("失敗後に成功", async () => {
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockRejectedValueOnce(new Error("fail2"))
      .mockResolvedValue("success");

    const promise = retryWithExponentialBackoff(mockFunc, 5);
    await jest.runAllTimersAsync();

    await expect(promise).resolves.toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });

  it("全て失敗", async () => {
    const mockFunc = jest.fn().mockRejectedValue("fail always");

    const promise = retryWithExponentialBackoff(mockFunc, 4);
    await jest.runAllTimersAsync();

    // await expect(promise).rejects.toBe("fail always"); // エラーになる => thrown: "fail always" 
    await expect(promise).rejects.toThrow("fail always"); // エラーになる => thrown: "fail always" 
    expect(mockFunc).toHaveBeenCalledTimes(4); // 4回リトライ
  });
});
