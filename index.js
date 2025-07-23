import QuickSort from "./sort/QuickSort.js";

const quickSort = new QuickSort([5, 3, 8, 4, 2, 7, 6, 1]);
quickSort.onSwap(() => {
  console.log("Swapped:", quickSort);
});

quickSort.sort((a, b) => a - b);
