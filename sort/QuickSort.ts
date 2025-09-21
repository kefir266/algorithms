import { type CompareFn, Sort } from "./Sort.ts";

export default class QuickSort<T> extends Sort<T> {
  constructor(array: Array<T>) {
    super(array);
  }

  async asyncSort(comparatorFn: CompareFn, start = 0, end = this.length - 1) {
    if (end - start < 1) {
      return;
    }

    let lessPointer = null;
    let morePointer = null;
    for (let i = start + 1; i <= end; i++) {
      while (this.isPaused) {
        await this.wait();
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
      await this.asyncSort(comparatorFn, start, lessPointer - 1);
      await this.asyncSort(comparatorFn, lessPointer + 1, end);
    } else {
      await this.asyncSort(comparatorFn, start + 1, end);
    }
  }

  sort(compareFn?: CompareFn): this {
    if (compareFn) {
      this.asyncSort(compareFn)
        .then(() => this.onFinishedFn())
        .then(() => this);
    }

    return this;
  }
}
