import { Sort } from "./Sort.ts";

export default class MergeSort<T> extends Sort<T> {
  constructor(array: Array<T>) {
    super(array);
  }

  private async merge(
    comparatorFn: (a: any, b: any) => number,
    part1: Array<T>,
    part2: Array<T>,
    index: number,
  ): Promise<void> {
    let ind1 = 0;
    let ind2 = 0;
    const part1Ended = () => ind1 === part1.length;
    const part2Ended = () => ind2 === part2.length;

    do {
      while (this.isPaused) {
        await this.wait();
      }

      if (part1Ended()) {
        this[index] = part2.at(ind2) as T;
        ind2++;
        index++;
        continue;
      }

      if (part2Ended()) {
        this[index] = part1.at(ind1) as T;
        ind1++;
        index++;
        continue;
      }

      this[index] =
        comparatorFn(part1.at(ind1), part2.at(ind2)) < 1
          ? (part1.at(ind1++) as T)
          : (part2.at(ind2++) as T);
      index++;
    } while (!part1Ended() || !part2Ended());
  }

  async asyncSort(
    comparatorFn: (a: any, b: any) => number,
    divider: number = 2,
  ) {
    if (divider / 2 >= this.length) {
      return;
    }

    for (let i = 0; i < this.length; i = i + divider) {
      await this.merge(
        comparatorFn,
        this.slice(i, i + divider / 2),
        this.slice(i + divider / 2, i + divider),
        i,
      );

      // Notify only after each operation has been merged
      // to avoid the same key elements in the target array
      await this.onSwapFn();
    }
    await this.asyncSort(comparatorFn, divider * 2);
  }
}
