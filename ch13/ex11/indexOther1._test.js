import { jest } from "@jest/globals";
import { retryWithExponentialBackoff } from "./indexOther1.ts";

describe("retryWithExponentialBackoff", () => {
  it("全て失敗", async () => {
    const func = jest.fn().mockRejectedValue(new Error("always fail"));

    const originalSetTimeout = global.setTimeout;
    global.setTimeout = (fn) => originalSetTimeout(fn, 0);

    await expect(
      retryWithExponentialBackoff(func, 2).rejects.toThrow("always fail"),
    );

    expect(func).toHaveBeenCalledTimes(3); // 4回リトライ
    global.setTimeout = originalSetTimeout;
  });
});
