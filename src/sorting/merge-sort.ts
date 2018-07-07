let tick = 0;

export function mergeSort(input: Array<number>): Array<number> {
  const result = [...input];

  const length = result.length;
  if (length === 1) {
    return result;
  }

  const middleIndex = Math.floor(length / 2);

  const leftArray = result.slice(0, middleIndex);
  const rightArray = result.slice(middleIndex, length);

  const mergeSortedArrays = (leftArray: Array<number>, rightArray: Array<number>): Array<number> => {
    const sortedArray = [];

    while(leftArray.length && rightArray.length) {
      tick++;
      const changingArray = leftArray[0] < rightArray[0] ? leftArray: rightArray;
      sortedArray.push(changingArray.shift());
    }

    if (leftArray.length) {
      return sortedArray.concat(leftArray);
    }

    if (rightArray.length) {
      return sortedArray.concat(rightArray);
    }

    return sortedArray;
  };

  console.log("tick", tick);
  return mergeSortedArrays(mergeSort(leftArray), mergeSort(rightArray));
}
