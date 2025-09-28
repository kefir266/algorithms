import QuickSort from "./sort/QuickSort.ts";
import BubbleSort from "./sort/BubbleSort.ts";
import MergeSort from "./sort/MergeSort.ts";

const array = [5, 3, 8, 4, 2, 7, 6, 1, 0, 11, 9, 10];
console.dir(array);

const quickSort = new QuickSort(array);
quickSort
  .asyncSort((a: any, b: any) => a - b)
  .then(() => console.dir(quickSort));

const bubbleSort = new BubbleSort(array);
bubbleSort
  .asyncSort((a: any, b: any) => a - b)
  .then(() => console.dir(bubbleSort));

const mergeSort = new MergeSort(array);
mergeSort
  .asyncSort((a: any, b: any) => a - b)
  .then(() => console.dir(mergeSort));
