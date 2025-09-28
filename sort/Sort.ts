export type CompareFn = (a: any, b: any) => number;

export abstract class Sort<T> extends Array<T> {
  isPaused = false;

  constructor(array: Array<T>) {
    super(array.length);
    for (let i = 0; i < array.length; i++) {
      this[i] = array[i];
    }
  }

  at(index: number): T | undefined {
    return this[index];
  }

  resumeResolver?: (resolve: void | PromiseLike<void>) => void;
  onSwapFn: () => Promise<void> = () => Promise.resolve();
  onFinishedFn: () => void = () => {};

  onSwap(fn: () => Promise<void>) {
    this.onSwapFn = fn;
  }

  onFinished(fn: () => void) {
    this.onFinishedFn = fn;
  }

  async swap(a1: any, a2: any) {
    const t = this[a1];
    this[a1] = this[a2];
    this[a2] = t;
    await this.onSwapFn();
  }

  async wait() {
    await new Promise<void>((resolve) => {
      this.resumeResolver = resolve;
    });
  }

  abstract asyncSort(comparatorFn: CompareFn): Promise<void>;

  sort(compareFn?: CompareFn): this {
    if (compareFn) {
      this.asyncSort(compareFn)
        .then(() => this.onFinishedFn())
        .then(() => this);
    }

    return this;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    if (this.resumeResolver) {
      this.resumeResolver();
    }
  }
}
