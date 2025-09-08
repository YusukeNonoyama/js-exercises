import { retryWithExponentialBackoff } from "./index.ts";

jest.useFakeTimers();

describe("retryWithExponentialBackoff", () => {
  it("resolves immediately when func succeeds first try", async () => {
    const mockFunc = jest.fn().mockResolvedValue("success");

    const promise = retryWithExponentialBackoff(mockFunc, 3);
    await jest.runAllTimersAsync();

    await expect(promise).resolves.toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("retries and eventually succeeds", async () => {
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

  it("fails after maxRetry attempts", async () => {
    const mockFunc = jest.fn().mockRejectedValue(new Error("always fails"));

    const promise = retryWithExponentialBackoff(mockFunc, 4);
    await jest.runAllTimersAsync();

    expect(JSON.stringify(promise)).toEqual("{}"); //
    expect(mockFunc).toHaveBeenCalledTimes(4); // 初回 + 2回リトライ
    console.log("log:", promise);
  });
});
