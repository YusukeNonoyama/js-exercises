export class PromisePool {
  #queueSize: number;
  #maxRunningPromises: number;

  #started: boolean = false;
  #runningPromises: number = 0;
  #queues: (() => Promise<void>)[] = [];
  #blocked: [() => Promise<void>, () => void][] = [];
  #all: Promise<void> = Promise.resolve();

  constructor(queueSize: number, maxRunningPromises: number) {
    if (queueSize < 1) {
      throw new Error("invalid queueSize");
    }
    if (maxRunningPromises < 1) {
      throw new Error("invalid numberOfPromises");
    }

    this.#queueSize = queueSize;
    this.#maxRunningPromises = maxRunningPromises;
  }

  async start() {
    if (this.#started) {
      throw new Error("already started");
    }
    this.#started = true;
  }

  async stop(): Promise<void> {
    if (!this.#started) {
      throw new Error("not started");
    }
    this.#started = false;
    return this.#all;
  }

  async dispatch(promiseFactory: () => Promise<void>): Promise<void> {
    if (!this.#started) {
      throw new Error("not started");
    }
    if (this.#runningPromises < this.#maxRunningPromises) {
      const p = promiseFactory()
        .catch(() => {})
        .then(() => this.#enqueue());
      this.#all = this.#all.then(() => p);
      this.#runningPromises++;
      return Promise.resolve();
    }

    if (this.#queues.length < this.#queueSize) {
      this.#queues.push(promiseFactory);
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.#blocked.push([promiseFactory, resolve]);
    });
  }

  #enqueue() {
    this.#runningPromises--;

    while (
      this.#queues.length > 0 &&
      this.#runningPromises < this.#maxRunningPromises
    ) {
      const fn = this.#queues.shift()!;
      const p = fn()
        .catch(() => {})
        .then(() => this.#enqueue());
      this.#all = this.#all.then(() => p);
      this.#runningPromises++;

      while (
        this.#blocked.length > 0 &&
        this.#queues.length < this.#queueSize
      ) {
        const [factory, resolve] = this.#blocked.shift()!;
        const p = factory()
          .catch(() => {})
          .then(() => this.#enqueue());
        this.#all = this.#all.then(() => p);
        this.#runningPromises++;
        resolve();
      }
    }
  }
}
