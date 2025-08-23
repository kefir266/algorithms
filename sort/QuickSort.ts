type ComparatorFn = (a: any, b: any) => number;

export default class QuickSort extends Array {
  onSwapFn: () => void = () => {};
  constructor(array: any) {
    super(array.length);
    for (let i = 0; i < array.length; i++) {
      this[i] = array[i];
    }
  }

  onSwap(fn: () => void) {
    this.onSwapFn = fn;
  }

  async swap(a1: any, a2: any) {
    const t = this[a1];
    this[a1] = this[a2];
    this[a2] = t;
    await this.onSwapFn();
  }

  async quickSort(
    comparatorFn: ComparatorFn,
    start = 0,
    end = this.length - 1,
  ) {
    if (end - start < 1) {
      return;
    }

    let lessPointer = null;
    let morePointer = null;
    for (let i = start + 1; i <= end; i++) {
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

  sort(compareFn?: ComparatorFn): this {
    if (compareFn) {
      this.quickSort(compareFn).then(() => console.log(this));
    }

    return this;
  }
}
