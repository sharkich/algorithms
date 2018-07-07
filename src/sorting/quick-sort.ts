let tick = 0;

export function quickSort(input: Array<number>): Array<number> {
  const result = [...input];

  const length = result.length;
  if (length <= 1) {
    return result;
  }

  const pivotElement: number = result.shift();

  const leftArray: Array<number> = [];
  const centerArray: Array<number> = [pivotElement];
  const rightArray: Array<number> = [];

  while (result.length) {
    tick++;
    const currentElement: number = result.shift();
    const changingArray = currentElement < pivotElement
      ? leftArray
      : currentElement > pivotElement
        ? rightArray
        : centerArray;
    changingArray.push(currentElement);
  }

  const leftSortedArray: Array<number> = quickSort(leftArray);
  const rightSortedArray: Array<number> = quickSort(rightArray);

  console.log("tick", tick);
  return leftSortedArray.concat(centerArray, rightSortedArray);
}
