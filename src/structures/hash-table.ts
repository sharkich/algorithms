interface IHash {
  [hash: number]: any;
}

interface IKeyHashMap {
  [key: string]: number;
}

const DEFAULT_HASH_TABLE_SIZE = 32;

export class HashTable {
  private keysHashMap: IKeyHashMap = {};
  private hashMap: IHash = {};

  constructor(private hashTableSize = DEFAULT_HASH_TABLE_SIZE) {}

  private hash(key: string): number {
    const hash = Array.from(key).reduce((sum, symbol) => (sum + symbol.charCodeAt(0)),0);
    return hash % this.hashTableSize;
  }

  get(key: string): any {
    const hash = this.hash(key);
    return this.hashMap[hash];
  }

  add(key: string, value: any) {
    return this.set(key, value);
  }

  set(key: string, value: any) {
    const hash = this.hash(key);
    this.keysHashMap[key] = hash;
    this.hashMap[hash] = value;
  }

  pop(key: string): any {
    const hash = this.hash(key);
    const value = this.hashMap[hash];
    delete this.hashMap[key]; // TODO
    return value;
  }

  delete(key: string) {
    this.pop(key);
    delete this.keysHashMap[key];
  }

  has(key: string): boolean {
    const hash = this.hash(key);
    return !!(this.keysHashMap[key] && this.hashMap[hash]);
  }

  keys(): Array<string> {
    return Object.keys(this.keysHashMap);
  }

}
