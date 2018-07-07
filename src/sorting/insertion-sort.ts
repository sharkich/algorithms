let tick = 0;

export function insertionSort(input: Array<number>): Array<number>  {
  const result = [...input];
  const length = result.length;

  const swap = (index1: number, index2: number) => {
    const buffer = result[index1];
    result[index1] = result[index2];
    result[index2] = buffer;
  };

  const insert = (index: number) => {
    const buffer = result[index];
    let i = index - 1;
    while (i !== -1 && result[i] > buffer) {
      tick++;
      swap(i, i + 1);
      i--;
    }
  };

  // DO
  for (let i = 0; i < length; i++) {
    for(let j = i + 1; j < length; j++) {
      tick++;
      if (result[j] < result[i]) {
        insert(j);
      }
    }
  }

  console.log('tick', tick);
  return result;
}
