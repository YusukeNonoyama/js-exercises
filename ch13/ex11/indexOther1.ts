/* eslint-disable no-constant-condition*/
export async function retryWithExponentialBackoff<T>(
  func: () => Promise<T>,
  maxRetry: number,
): Promise<T> {
  let attempts = 0;

  while (true) {
    try {
      return await func();
    } catch (err) {
      if (attempts++ >= maxRetry) throw err;
      const delay = 2 ** (attempts - 1) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
