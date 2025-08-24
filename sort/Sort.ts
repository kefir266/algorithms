export abstract class Sort extends Array {
  isPaused = false;
  resumeResolver?: (resolve: void | PromiseLike<void>) => void;
  onSwapFn: () => void = () => {};
  onFinishedFn: () => void = () => {};

  onSwap(fn: () => void) {
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

  abstract pause(): void;
  abstract resume(): void;
}
