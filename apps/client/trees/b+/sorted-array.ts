/* eslint-disable */
import { IMap } from './interface';

export default class SortedArray<K = any, V = any> implements IMap<K, V> {
  a: [K, V][];

  cmp: (a: K, b: K) => number;

  public constructor(entries?: [K, V][], compare?: (a: K, b: K) => number) {
    this.cmp =
      compare ||
      ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : a === b ? 0 : a - b));
    this.a = [];
    if (entries !== undefined) for (const e of entries) this.set(e[0], e[1]);
  }

  get size() {
    return this.a.length;
  }

  get(key: K, defaultValue?: V): V | undefined {
    const pair = this.a[this.indexOf(key, -1)];
    return pair === undefined ? defaultValue : pair[1];
  }

  set(key: K, value: V, overwrite?: boolean): boolean {
    const i = this.indexOf(key, -1);
    if (i <= -1) this.a.splice(~i, 0, [key, value]);
    else this.a[i] = [key, value];
    return i <= -1;
  }

  has(key: K): boolean {
    return this.indexOf(key, -1) >= 0;
  }

  delete(key: K): boolean {
    const i = this.indexOf(key, -1);
    if (i > -1) this.a.splice(i, 1);
    return i > -1;
  }

  clear() {
    this.a = [];
  }

  getArray() {
    return this.a;
  }

  minKey(): K | undefined {
    return this.a[0][0];
  }

  maxKey(): K | undefined {
    return this.a[this.a.length - 1][0];
  }

  forEach(callbackFn: (v: V, k: K, list: SortedArray<K, V>) => void) {
    this.a.forEach(pair => callbackFn(pair[1], pair[0], this));
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.a.values();
  }

  entries(): IterableIterator<[K, V]> {
    return this.a.values();
  }

  keys(): IterableIterator<K> {
    return this.a.map(pair => pair[0]).values();
  }

  values(): IterableIterator<V> {
    return this.a.map(pair => pair[1]).values();
  }

  indexOf(key: K, failXor: number): number {
    let lo = 0;
    let hi = this.a.length;
    let mid = hi >> 1;
    while (lo < hi) {
      const c = this.cmp(this.a[mid][0], key);
      if (c < 0) lo = mid + 1;
      else if (c > 0) hi = mid;
      else if (c === 0) return mid;
      else throw new Error('Problem: compare failed');
      mid = (lo + hi) >> 1;
    }
    return mid ^ failXor;
  }
}
