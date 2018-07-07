import {bubbleSort, insertionSort, selectionSort,
  heapSortTODO,
  mergeSort, quickSort} from './sorting';

(() => {

  // Sorting
  const input = [4, 2, 5, 1, 3, 4, 0, 6];
  const output = quickSort(input);
  console.log(input, '->', output);

})();
