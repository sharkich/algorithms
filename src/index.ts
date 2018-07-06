import {bubbleSort, insertionSort} from './sorting';

(() => {

  // Sorting
  const input = [4, 2, 5, 1, 3, 0, 6];
  const output = insertionSort(input);
  console.log(input, '->', output);

})();
