type PromiseStatus = "Created" | "Started" | "Ended";

export class PromisePool {
  /**
   * Constructs PromisePool.
   *
   * @param queueSize the max size of queue
   * @param maxRunningPromises the maximum number of running promises at the same time.
   *
   * @throws Error if either queueSize or maxRunningPromises is less than 1
   */
  #queueSize: number;
  #maxRunningPromises: number;
  #promiseNum: number;
  #promiseStatus: PromiseStatus;
  constructor(queueSize: number, maxRunningPromises: number) {
    if (queueSize < 1) {
      throw new Error("queueSize should be more than 1");
    }
    if (maxRunningPromises < 1) {
      throw new Error("maxRunnningPromises should be more than 1");
    }
    this.#queueSize = queueSize;
    this.#maxRunningPromises = maxRunningPromises;
    this.#promiseNum = 0;
    this.#promiseStatus = "Created";
  }

  /**
   * Starts PromisePool.
   *
   * @returns Promise, which will be rejected if this pool is already started
   */
  async start() {
    return new Promise((resolve, reject) => {
      this.#promiseNum++;
      if (this.#promiseStatus === "Started") {
        reject("promise has already started");
      }
      if (this.#promiseNum > this.#queueSize) {
        reject("PromisePool is full");
      }
      resolve("Promise resolved");
      this.#promiseStatus = "Started";
    });
  }

  /**
   * Wait all promises for their terminations.
   * All requests dispatched before this method is invoked must complete
   * and this method also will wait for their completion.
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async stop() {
    return new Promise((resolve, reject) => {
      if (this.#promiseStatus === "Created") {
        reject("promise has not started yet");
      }
      if (this.#promiseStatus === "Ended") {
        reject("promise has already ended");
      }
      resolve("promise has stopped");
      this.#promiseStatus = "Ended";
    });
  }

  /**
   * Executes the specified promise from the given factory using this pool.
   * If the queue is full, then the returned Promise will not be fulfilled until the queue is not full.
   *
   * @param promiseFactory the function that retuns Promsie
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async dispatch(promiseFactory: () => Promise<void>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.#promiseStatus === "Created") {
        reject("promise has not started yet");
      }
      promiseFactory();
      resolve();
    });
  }
}
