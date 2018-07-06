let tick = 0;

export function selectionSort(input: Array<number>): Array<number>  {
  const result = [...input];
  const length = result.length;

  const swap = (index1: number, index2: number) => {
    const buffer = result[index1];
    result[index1] = result[index2];
    result[index2] = buffer;
  };

  for (let i = 0; i < length; i++) {
    let min = result[i];
    let minIndex = i;
    for(let j = i + 1; j < length; j++) {
      tick++;
      if (result[j] < min) {
        min = result[j];
        minIndex = j;
      }
    }
    swap(i, minIndex);
  }

  console.log('tick', tick);
  return result;
}
