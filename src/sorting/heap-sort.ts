let tick = 0;

class Heap {
  private heap: Array<number> = [];

  constructor(input: Array<number>) {
    input.forEach((el) => this.add(el));
  }

  public add(value: number) {
    this.heap.push(value);
    this.normalize(this.heap.length - 1);
  }

  private normalize(fromIndex: number) {
  }

}

export function heapSortTODO(input: Array<number>): Array<number> {
  const result = [...input];
  const length = result.length;

  const swap = (index1: number, index2: number) => {
    const buffer = result[index1];
    result[index1] = result[index2];
    result[index2] = buffer;
  };

  // DO
  const heap = new Heap(result);
  console.log('heap', heap);

  console.log("tick", tick);
  return result;
}
