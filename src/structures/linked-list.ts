import {LinkedListNode} from './linked-list-node';

export interface IComparatorFn {
  (value1: any, value2: any): number;
}

const dafaultComparatorFn: IComparatorFn = (value1: any, value2: any): number => {
  return ('' + value1).length - ('' + value2).length;
};

export class LinkedList {

  private _head: LinkedListNode;
  private _tail: LinkedListNode;
  private comparatorFn: IComparatorFn;

  constructor(customComparatorFn?: IComparatorFn) {
    this.comparatorFn = customComparatorFn || dafaultComparatorFn;
  }

  append(value: any): LinkedList {
    const node = new LinkedListNode(value);

    if (!this._head) {
      // Create new Head (for empty list)
      this._head = node;
    }

    // If new empty list
    if (this._tail) {
      // Save link to new Node
      this._tail.next = node;
    }

    // Rewrite tail node
    this._tail = node;

    return this;
  }

  prepend(value: any): LinkedList {
    const node = new LinkedListNode(value, this._head);

    if (!this._tail) {
      // Create new Tail (for empty list)
      this._tail = node;
    }

    // Rewrite tail node
    this._head = node;

    return this;
  }

  has(value: any): boolean {
    const node = this.findNode(value);
    return !!node;
  }

  head(): any {
    return this._head && this._head.value;
  }

  tail(): any {
    return this._tail && this._tail.value;
  }

  /**
   * Delete Head
   */
  shift(): any {
    const deletedHead = this._head;
    if (this._head.next) {
      this._head = this._head.next;
    } else {
      this._head = null;
      this._tail = null;
    }
    return deletedHead;
  }

  /**
   * Delete Tail
   */
  pop(): any {
    const deletedNode = this._tail;

    // Optimize to O(1)
    if (this._head === this._tail) {
      this._head = null;
      this._tail = null;
      return deletedNode;
    }

    // Find provious node before the Tail
    let node = this._head;
    while (node.next) {
      if (!node.next.next) {
        node.next = null;
      } else {
        node = node.next;
      }
    }

    this._tail = node;

    return deletedNode;
  }

  findNode(value: any): LinkedListNode {
    let node = this._head;
    while (node) {
      if (this.comparatorFn(node.value, value) === 0) {
        return node;
      }
      node = node.next;
    }
  }

  toList(): Array<any> {
    const result = [];
    let node = this._head;
    while (node) {
      result.push(node.value);
      node = node.next;
    }
    return result
  }

}
