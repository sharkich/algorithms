// import {bubbleSort, insertionSort, selectionSort,
//   heapSortTODO,
//   mergeSort, quickSort} from './sorting';

import { LinkedList } from "./structures/linked-list";
import { HashTable } from "./structures/";

(() => {
  // Sorting
  // const input = [4, 2, 5, 1, 3, 4, 0, 6];
  // const output = quickSort(input);
  // console.log(input, '->', output);

  // const hashTable = new HashTable();
  // hashTable.add('1', 11);
  // hashTable.add('2', 12);
  // hashTable.add('2', 22);
  // hashTable.add('3', 33);
  // console.log(hashTable.pop('2'));
  // console.log(hashTable.pop('2'));

  const hashTable = new LinkedList();
  hashTable.append(11);
  hashTable.append(12);
  hashTable.append(22);
  hashTable.append(33);
  hashTable.prepend(5);
  console.log(hashTable.toList());
  console.log(hashTable.shift());
  console.log(hashTable.toList());
})();
