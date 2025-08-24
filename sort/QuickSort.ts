import { Sort } from "./Sort";
type CompareFn = (a: any, b: any) => number;

export default class QuickSort extends Sort {
  constructor(array: any) {
    super(array.length);
    for (let i = 0; i < array.length; i++) {
      this[i] = array[i];
    }
  }

  async quickSort(comparatorFn: CompareFn, start = 0, end = this.length - 1) {
    if (end - start < 1) {
      return;
    }

    let lessPointer = null;
    let morePointer = null;
    for (let i = start + 1; i <= end; i++) {
      while (this.isPaused) {
        await new Promise<void>((resolve) => {
          this.resumeResolver = resolve;
        });
      }
      if (comparatorFn(this[i], this[start]) < 0) {
        lessPointer = i;
        if (morePointer) {
          await this.swap(i, morePointer);
          lessPointer = morePointer;
          morePointer = lessPointer + 1;
        }
      } else {
        if (morePointer === null) {
          morePointer = i;
        }
      }
    }

    if (lessPointer !== null) {
      await this.swap(start, lessPointer);
      await this.quickSort(comparatorFn, start, lessPointer - 1);
      await this.quickSort(comparatorFn, lessPointer + 1, end);
    } else {
      await this.quickSort(comparatorFn, start + 1, end);
    }
  }

  sort(compareFn?: CompareFn): this {
    if (compareFn) {
      this.quickSort(compareFn)
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
