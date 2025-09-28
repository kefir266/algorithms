import { type CompareFn, Sort } from "./Sort.ts";

export default class BubbleSort<T> extends Sort<T> {
  constructor(array: Array<T>) {
    super(array);
  }

  async asyncSort(comparatorFn: CompareFn) {
    let firstUnsorted = 0;
    let lastUnsorted = this.length - 1;
    do {
      for (let i = firstUnsorted; i < lastUnsorted; i++) {
        while (this.isPaused) {
          await this.wait();
        }
        if (comparatorFn(this.at(i + 1), this.at(i)) < 1) {
          await this.swap(i, i + 1);
        }
      }
      lastUnsorted--;
    } while (firstUnsorted < lastUnsorted);
  }
}
