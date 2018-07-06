import {bubbleSort, insertionSort, selectionSort} from './sorting';

(() => {

  // Sorting
  const input = [4, 2, 5, 1, 3, 0, 6];
  const output = selectionSort(input);
  console.log(input, '->', output);

})();
