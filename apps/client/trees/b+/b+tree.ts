/* eslint-disable */
import { ISortedMap, ISortedMapF, ISortedSet } from './interface';

export type EditRangeResult<V, R = number> = {
  value?: V;
  break?: R;
  delete?: boolean;
};

type index = number;

export type DefaultComparable =
  | number
  | string
  | Date
  | boolean
  | null
  | undefined
  | (number | string)[]
  | {
      valueOf: () =>
        | number
        | string
        | Date
        | boolean
        | null
        | undefined
        | (number | string)[];
    };

export function defaultComparator(
  a: DefaultComparable,
  b: DefaultComparable
): number {
  if (Number.isFinite(a as any) && Number.isFinite(b as any)) {
    return (a as number) - (b as number);
  }

  let ta = typeof a;
  let tb = typeof b;
  if (ta !== tb) {
    return ta < tb ? -1 : 1;
  }

  if (ta === 'object') {
    if (a === null) return b === null ? 0 : -1;
    else if (b === null) return 1;

    a = a!.valueOf() as DefaultComparable;
    b = b!.valueOf() as DefaultComparable;
    ta = typeof a;
    tb = typeof b;
    if (ta !== tb) {
      return ta < tb ? -1 : 1;
    }
  }

  if (a! < b!) return -1;
  if (a! > b!) return 1;
  if (a === b) return 0;

  if (Number.isNaN(a as any)) return Number.isNaN(b as any) ? 0 : -1;
  else if (Number.isNaN(b as any)) return 1;
  return Array.isArray(a) ? 0 : Number.NaN;
}

export function simpleComparator(a: string, b: string): number;
export function simpleComparator(a: number | null, b: number | null): number;
export function simpleComparator(a: Date | null, b: Date | null): number;
export function simpleComparator(
  a: (number | string)[],
  b: (number | string)[]
): number;
export function simpleComparator(a: any, b: any): number {
  return a > b ? 1 : a < b ? -1 : 0;
}

export default class BTree<K = any, V = any>
  implements ISortedMapF<K, V>, ISortedMap<K, V>
{
  private _root: BNode<K, V> = EmptyLeaf as BNode<K, V>;
  _size: number = 0;
  _maxNodeSize: number;

  _compare: (a: K, b: K) => number;

  public constructor(
    entries?: [K, V][],
    compare?: (a: K, b: K) => number,
    maxNodeSize?: number
  ) {
    this._maxNodeSize = maxNodeSize! >= 4 ? Math.min(maxNodeSize!, 256) : 32;
    this._compare =
      compare || (defaultComparator as any as (a: K, b: K) => number);
    if (entries) this.setPairs(entries);
  }

  get size() {
    return this._size;
  }
  get length() {
    return this._size;
  }
  get isEmpty() {
    return this._size === 0;
  }

  clear() {
    this._root = EmptyLeaf as BNode<K, V>;
    this._size = 0;
  }

  forEach(
    callback: (v: V, k: K, tree: BTree<K, V>) => void,
    thisArg?: any
  ): number;

  forEach<R = number>(
    callback: (v: V, k: K, tree: BTree<K, V>) => { break?: R } | void,
    thisArg?: any
  ): R | number {
    if (thisArg !== undefined) callback = callback.bind(thisArg);
    return this.forEachPair((k, v) => callback(v, k, this));
  }

  forEachPair<R = number>(
    callback: (k: K, v: V, counter: number) => { break?: R } | void,
    initialCounter?: number
  ): R | number {
    var low = this.minKey(),
      high = this.maxKey();
    return this.forRange(low!, high!, true, callback, initialCounter);
  }

  get(key: K, defaultValue?: V): V | undefined {
    return this._root.get(key, defaultValue, this);
  }

  set(key: K, value: V, overwrite?: boolean): boolean {
    if (this._root.isShared) this._root = this._root.clone();
    var result = this._root.set(key, value, overwrite, this);
    if (result === true || result === false) return result;
    this._root = new BNodeInternal<K, V>([this._root, result]);
    return true;
  }

  has(key: K): boolean {
    return this.forRange(key, key, true, undefined) !== 0;
  }

  delete(key: K): boolean {
    return this.editRange(key, key, true, DeleteRange) !== 0;
  }

  with(key: K): BTree<K, V | undefined>;
  with<V2>(key: K, value: V2, overwrite?: boolean): BTree<K, V | V2>;
  with<V2>(
    key: K,
    value?: V2,
    overwrite?: boolean
  ): BTree<K, V | V2 | undefined> {
    let nu = this.clone() as BTree<K, V | V2 | undefined>;
    return nu.set(key, value, overwrite) || overwrite ? nu : this;
  }

  withPairs<V2>(pairs: [K, V | V2][], overwrite: boolean): BTree<K, V | V2> {
    let nu = this.clone() as BTree<K, V | V2>;
    return nu.setPairs(pairs, overwrite) !== 0 || overwrite ? nu : this;
  }

  withKeys(
    keys: K[],
    returnThisIfUnchanged?: boolean
  ): BTree<K, V | undefined> {
    let nu = this.clone() as BTree<K, V | undefined>,
      changed = false;
    for (var i = 0; i < keys.length; i++)
      changed = nu.set(keys[i], undefined, false) || changed;
    return returnThisIfUnchanged && !changed ? this : nu;
  }

  without(key: K, returnThisIfUnchanged?: boolean): BTree<K, V> {
    return this.withoutRange(key, key, true, returnThisIfUnchanged);
  }

  withoutKeys(keys: K[], returnThisIfUnchanged?: boolean): BTree<K, V> {
    let nu = this.clone();
    return nu.deleteKeys(keys) || !returnThisIfUnchanged ? nu : this;
  }

  withoutRange(
    low: K,
    high: K,
    includeHigh: boolean,
    returnThisIfUnchanged?: boolean
  ): BTree<K, V> {
    let nu = this.clone();
    if (nu.deleteRange(low, high, includeHigh) === 0 && returnThisIfUnchanged)
      return this;
    return nu;
  }

  filter(
    callback: (k: K, v: V, counter: number) => boolean,
    returnThisIfUnchanged?: boolean
  ): BTree<K, V> {
    var nu = this.greedyClone();
    var del: any;
    nu.editAll((k, v, i) => {
      if (!callback(k, v, i)) return (del = Delete);
    });
    if (!del && returnThisIfUnchanged) return this;
    return nu;
  }

  mapValues<R>(callback: (v: V, k: K, counter: number) => R): BTree<K, R> {
    var tmp = {} as { value: R };
    var nu = this.greedyClone();
    nu.editAll((k, v, i) => {
      return (tmp.value = callback(v, k, i)), tmp as any;
    });
    return nu as any as BTree<K, R>;
  }

  reduce<R>(
    callback: (
      previous: R,
      currentPair: [K, V],
      counter: number,
      tree: BTree<K, V>
    ) => R,
    initialValue: R
  ): R;
  reduce<R>(
    callback: (
      previous: R | undefined,
      currentPair: [K, V],
      counter: number,
      tree: BTree<K, V>
    ) => R
  ): R | undefined;
  reduce<R>(
    callback: (
      previous: R | undefined,
      currentPair: [K, V],
      counter: number,
      tree: BTree<K, V>
    ) => R,
    initialValue?: R
  ): R | undefined {
    let i = 0,
      p = initialValue;
    var it = this.entries(this.minKey(), ReusedArray),
      next;
    while (!(next = it.next()).done) p = callback(p, next.value, i++, this);
    return p;
  }

  entries(lowestKey?: K, reusedArray?: (K | V)[]): IterableIterator<[K, V]> {
    var info = this.findPath(lowestKey);
    if (info === undefined) return iterator<[K, V]>();
    var { nodequeue, nodeindex, leaf } = info;
    var state = reusedArray !== undefined ? 1 : 0;
    var i =
      lowestKey === undefined
        ? -1
        : leaf.indexOf(lowestKey, 0, this._compare) - 1;

    return iterator<[K, V]>(() => {
      jump: for (;;) {
        switch (state) {
          case 0:
            if (++i < leaf.keys.length)
              return { done: false, value: [leaf.keys[i], leaf.values[i]] };
            state = 2;
            continue;
          case 1:
            if (++i < leaf.keys.length) {
              (reusedArray![0] = leaf.keys[i]),
                (reusedArray![1] = leaf.values[i]);
              return { done: false, value: reusedArray as [K, V] };
            }
            state = 2;
          case 2:
            for (var level = -1; ; ) {
              if (++level >= nodequeue.length) {
                state = 3;
                continue jump;
              }
              if (++nodeindex[level] < nodequeue[level].length) break;
            }
            for (; level > 0; level--) {
              nodequeue[level - 1] = (
                nodequeue[level][nodeindex[level]] as BNodeInternal<K, V>
              ).children;
              nodeindex[level - 1] = 0;
            }
            leaf = nodequeue[0][nodeindex[0]];
            i = -1;
            state = reusedArray !== undefined ? 1 : 0;
            continue;
          case 3:
            return { done: true, value: undefined };
        }
      }
    });
  }

  entriesReversed(
    highestKey?: K,
    reusedArray?: (K | V)[],
    skipHighest?: boolean
  ): IterableIterator<[K, V]> {
    if (highestKey === undefined) {
      highestKey = this.maxKey();
      skipHighest = undefined;
      if (highestKey === undefined) return iterator<[K, V]>();
    }
    var { nodequeue, nodeindex, leaf } =
      this.findPath(highestKey) || this.findPath(this.maxKey())!;
    check(!nodequeue[0] || leaf === nodequeue[0][nodeindex[0]], 'wat!');
    var i = leaf.indexOf(highestKey, 0, this._compare);
    if (
      !skipHighest &&
      i < leaf.keys.length &&
      this._compare(leaf.keys[i], highestKey) <= 0
    )
      i++;
    var state = reusedArray !== undefined ? 1 : 0;

    return iterator<[K, V]>(() => {
      jump: for (;;) {
        switch (state) {
          case 0:
            if (--i >= 0)
              return { done: false, value: [leaf.keys[i], leaf.values[i]] };
            state = 2;
            continue;
          case 1:
            if (--i >= 0) {
              (reusedArray![0] = leaf.keys[i]),
                (reusedArray![1] = leaf.values[i]);
              return { done: false, value: reusedArray as [K, V] };
            }
            state = 2;
          case 2:
            for (var level = -1; ; ) {
              if (++level >= nodequeue.length) {
                state = 3;
                continue jump;
              }
              if (--nodeindex[level] >= 0) break;
            }
            for (; level > 0; level--) {
              nodequeue[level - 1] = (
                nodequeue[level][nodeindex[level]] as BNodeInternal<K, V>
              ).children;
              nodeindex[level - 1] = nodequeue[level - 1].length - 1;
            }
            leaf = nodequeue[0][nodeindex[0]];
            i = leaf.keys.length;
            state = reusedArray !== undefined ? 1 : 0;
            continue;
          case 3:
            return { done: true, value: undefined };
        }
      }
    });
  }

  private findPath(
    key?: K
  ):
    | { nodequeue: BNode<K, V>[][]; nodeindex: number[]; leaf: BNode<K, V> }
    | undefined {
    var nextnode = this._root;
    var nodequeue: BNode<K, V>[][], nodeindex: number[];

    if (nextnode.isLeaf) {
      (nodequeue = EmptyArray), (nodeindex = EmptyArray);
    } else {
      (nodequeue = []), (nodeindex = []);
      for (var d = 0; !nextnode.isLeaf; d++) {
        nodequeue[d] = (nextnode as BNodeInternal<K, V>).children;
        nodeindex[d] =
          key === undefined ? 0 : nextnode.indexOf(key, 0, this._compare);
        if (nodeindex[d] >= nodequeue[d].length) return;
        nextnode = nodequeue[d][nodeindex[d]];
      }
      nodequeue.reverse();
      nodeindex.reverse();
    }
    return { nodequeue, nodeindex, leaf: nextnode };
  }

  diffAgainst<R>(
    other: BTree<K, V>,
    onlyThis?: (k: K, v: V) => { break?: R } | void,
    onlyOther?: (k: K, v: V) => { break?: R } | void,
    different?: (k: K, vThis: V, vOther: V) => { break?: R } | void
  ): R | undefined {
    if (other._compare !== this._compare) {
      throw new Error('Tree comparators are not the same.');
    }

    if (this.isEmpty || other.isEmpty) {
      if (this.isEmpty && other.isEmpty) return undefined;
      if (this.isEmpty)
        return onlyOther === undefined
          ? undefined
          : BTree.stepToEnd(BTree.makeDiffCursor(other), onlyOther);
      return onlyThis === undefined
        ? undefined
        : BTree.stepToEnd(BTree.makeDiffCursor(this), onlyThis);
    }

    const { _compare } = this;
    const thisCursor = BTree.makeDiffCursor(this);
    const otherCursor = BTree.makeDiffCursor(other);
    let thisSuccess = true,
      otherSuccess = true,
      prevCursorOrder = BTree.compare(thisCursor, otherCursor, _compare);
    while (thisSuccess && otherSuccess) {
      const cursorOrder = BTree.compare(thisCursor, otherCursor, _compare);
      const {
        leaf: thisLeaf,
        internalSpine: thisInternalSpine,
        levelIndices: thisLevelIndices
      } = thisCursor;
      const {
        leaf: otherLeaf,
        internalSpine: otherInternalSpine,
        levelIndices: otherLevelIndices
      } = otherCursor;
      if (thisLeaf || otherLeaf) {
        if (prevCursorOrder !== 0) {
          if (cursorOrder === 0) {
            if (thisLeaf && otherLeaf && different) {
              const valThis =
                thisLeaf.values[thisLevelIndices[thisLevelIndices.length - 1]];
              const valOther =
                otherLeaf.values[
                  otherLevelIndices[otherLevelIndices.length - 1]
                ];
              if (!Object.is(valThis, valOther)) {
                const result = different(
                  thisCursor.currentKey,
                  valThis,
                  valOther
                );
                if (result && result.break) return result.break;
              }
            }
          } else if (cursorOrder > 0) {
            if (otherLeaf && onlyOther) {
              const otherVal =
                otherLeaf.values[
                  otherLevelIndices[otherLevelIndices.length - 1]
                ];
              const result = onlyOther(otherCursor.currentKey, otherVal);
              if (result && result.break) return result.break;
            }
          } else if (onlyThis) {
            if (thisLeaf && prevCursorOrder !== 0) {
              const valThis =
                thisLeaf.values[thisLevelIndices[thisLevelIndices.length - 1]];
              const result = onlyThis(thisCursor.currentKey, valThis);
              if (result && result.break) return result.break;
            }
          }
        }
      } else if (!thisLeaf && !otherLeaf && cursorOrder === 0) {
        const lastThis = thisInternalSpine.length - 1;
        const lastOther = otherInternalSpine.length - 1;
        const nodeThis =
          thisInternalSpine[lastThis][thisLevelIndices[lastThis]];
        const nodeOther =
          otherInternalSpine[lastOther][otherLevelIndices[lastOther]];
        if (nodeOther === nodeThis) {
          prevCursorOrder = 0;
          thisSuccess = BTree.step(thisCursor, true);
          otherSuccess = BTree.step(otherCursor, true);
          continue;
        }
      }
      prevCursorOrder = cursorOrder;
      if (cursorOrder < 0) {
        thisSuccess = BTree.step(thisCursor);
      } else {
        otherSuccess = BTree.step(otherCursor);
      }
    }

    if (thisSuccess && onlyThis)
      return BTree.finishCursorWalk(
        thisCursor,
        otherCursor,
        _compare,
        onlyThis
      );
    if (otherSuccess && onlyOther)
      return BTree.finishCursorWalk(
        otherCursor,
        thisCursor,
        _compare,
        onlyOther
      );
  }

  private static finishCursorWalk<K, V, R>(
    cursor: DiffCursor<K, V>,
    cursorFinished: DiffCursor<K, V>,
    compareKeys: (a: K, b: K) => number,
    callback: (k: K, v: V) => { break?: R } | void
  ): R | undefined {
    const compared = BTree.compare(cursor, cursorFinished, compareKeys);
    if (compared === 0) {
      if (!BTree.step(cursor)) return undefined;
    } else if (compared < 0) {
      check(false, 'cursor walk terminated early');
    }
    return BTree.stepToEnd(cursor, callback);
  }

  private static stepToEnd<K, V, R>(
    cursor: DiffCursor<K, V>,
    callback: (k: K, v: V) => { break?: R } | void
  ): R | undefined {
    let canStep: boolean = true;
    while (canStep) {
      const { leaf, levelIndices, currentKey } = cursor;
      if (leaf) {
        const value = leaf.values[levelIndices[levelIndices.length - 1]];
        const result = callback(currentKey, value);
        if (result && result.break) return result.break;
      }
      canStep = BTree.step(cursor);
    }
    return undefined;
  }

  private static makeDiffCursor<K, V>(tree: BTree<K, V>): DiffCursor<K, V> {
    const { _root, height } = tree;
    return {
      height: height,
      internalSpine: [[_root]],
      levelIndices: [0],
      leaf: undefined,
      currentKey: _root.maxKey()
    };
  }

  private static step<K, V>(
    cursor: DiffCursor<K, V>,
    stepToNode?: boolean
  ): boolean {
    const { internalSpine, levelIndices, leaf } = cursor;
    if (stepToNode === true || leaf) {
      const levelsLength = levelIndices.length;
      if (stepToNode === true || levelIndices[levelsLength - 1] === 0) {
        const spineLength = internalSpine.length;
        if (spineLength === 0) return false;
        const nodeLevelIndex = spineLength - 1;
        let levelIndexWalkBack = nodeLevelIndex;
        while (levelIndexWalkBack >= 0) {
          if (levelIndices[levelIndexWalkBack] > 0) {
            if (levelIndexWalkBack < levelsLength - 1) {
              cursor.leaf = undefined;
              levelIndices.pop();
            }
            if (levelIndexWalkBack < nodeLevelIndex)
              cursor.internalSpine = internalSpine.slice(
                0,
                levelIndexWalkBack + 1
              );
            cursor.currentKey =
              internalSpine[levelIndexWalkBack][
                --levelIndices[levelIndexWalkBack]
              ].maxKey();
            return true;
          }
          levelIndexWalkBack--;
        }
        return false;
      } else {
        const valueIndex = --levelIndices[levelsLength - 1];
        cursor.currentKey = (leaf as unknown as BNode<K, V>).keys[valueIndex];
        return true;
      }
    } else {
      const nextLevel = internalSpine.length;
      const currentLevel = nextLevel - 1;
      const node = internalSpine[currentLevel][levelIndices[currentLevel]];
      if (node.isLeaf) {
        cursor.leaf = node;
        const valueIndex = (levelIndices[nextLevel] = node.values.length - 1);
        cursor.currentKey = node.keys[valueIndex];
      } else {
        const children = (node as BNodeInternal<K, V>).children;
        internalSpine[nextLevel] = children;
        const childIndex = children.length - 1;
        levelIndices[nextLevel] = childIndex;
        cursor.currentKey = children[childIndex].maxKey();
      }
      return true;
    }
  }

  private static compare<K, V>(
    cursorA: DiffCursor<K, V>,
    cursorB: DiffCursor<K, V>,
    compareKeys: (a: K, b: K) => number
  ): number {
    const {
      height: heightA,
      currentKey: currentKeyA,
      levelIndices: levelIndicesA
    } = cursorA;
    const {
      height: heightB,
      currentKey: currentKeyB,
      levelIndices: levelIndicesB
    } = cursorB;
    const keyComparison = compareKeys(currentKeyB, currentKeyA);
    if (keyComparison !== 0) {
      return keyComparison;
    }

    const heightMin = heightA < heightB ? heightA : heightB;
    const depthANormalized = levelIndicesA.length - (heightA - heightMin);
    const depthBNormalized = levelIndicesB.length - (heightB - heightMin);
    return depthANormalized - depthBNormalized;
  }

  keys(firstKey?: K): IterableIterator<K> {
    var it = this.entries(firstKey, ReusedArray);
    return iterator<K>(() => {
      var n: IteratorResult<any> = it.next();
      if (n.value) n.value = n.value[0];
      return n;
    });
  }

  values(firstKey?: K): IterableIterator<V> {
    var it = this.entries(firstKey, ReusedArray);
    return iterator<V>(() => {
      var n: IteratorResult<any> = it.next();
      if (n.value) n.value = n.value[1];
      return n;
    });
  }

  get maxNodeSize() {
    return this._maxNodeSize;
  }

  minKey(): K | undefined {
    return this._root.minKey();
  }

  maxKey(): K | undefined {
    return this._root.maxKey();
  }

  clone(): BTree<K, V> {
    this._root.isShared = true;
    var result = new BTree<K, V>(undefined, this._compare, this._maxNodeSize);
    result._root = this._root;
    result._size = this._size;
    return result;
  }

  greedyClone(force?: boolean): BTree<K, V> {
    var result = new BTree<K, V>(undefined, this._compare, this._maxNodeSize);
    result._root = this._root.greedyClone(force);
    result._size = this._size;
    return result;
  }

  toArray(maxLength: number = 0x7fffffff): [K, V][] {
    let min = this.minKey(),
      max = this.maxKey();
    if (min !== undefined) return this.getRange(min, max!, true, maxLength);
    return [];
  }

  keysArray() {
    var results: K[] = [];
    this._root.forRange(
      this.minKey()!,
      this.maxKey()!,
      true,
      false,
      this,
      0,
      (k, v) => {
        results.push(k);
      }
    );
    return results;
  }

  valuesArray() {
    var results: V[] = [];
    this._root.forRange(
      this.minKey()!,
      this.maxKey()!,
      true,
      false,
      this,
      0,
      (k, v) => {
        results.push(v);
      }
    );
    return results;
  }

  toString() {
    return this.toArray().toString();
  }

  setIfNotPresent(key: K, value: V): boolean {
    return this.set(key, value, false);
  }

  nextHigherPair(key: K | undefined, reusedArray?: [K, V]): [K, V] | undefined {
    reusedArray = reusedArray || ([] as unknown as [K, V]);
    if (key === undefined) {
      return this._root.minPair(reusedArray);
    }
    return this._root.getPairOrNextHigher(
      key,
      this._compare,
      false,
      reusedArray
    );
  }

  nextHigherKey(key: K | undefined): K | undefined {
    var p = this.nextHigherPair(key, ReusedArray as [K, V]);
    return p && p[0];
  }

  nextLowerPair(key: K | undefined, reusedArray?: [K, V]): [K, V] | undefined {
    reusedArray = reusedArray || ([] as unknown as [K, V]);
    if (key === undefined) {
      return this._root.maxPair(reusedArray);
    }
    return this._root.getPairOrNextLower(
      key,
      this._compare,
      false,
      reusedArray
    );
  }

  nextLowerKey(key: K | undefined): K | undefined {
    var p = this.nextLowerPair(key, ReusedArray as [K, V]);
    return p && p[0];
  }

  getPairOrNextLower(key: K, reusedArray?: [K, V]): [K, V] | undefined {
    return this._root.getPairOrNextLower(
      key,
      this._compare,
      true,
      reusedArray || ([] as unknown as [K, V])
    );
  }

  getPairOrNextHigher(key: K, reusedArray?: [K, V]): [K, V] | undefined {
    return this._root.getPairOrNextHigher(
      key,
      this._compare,
      true,
      reusedArray || ([] as unknown as [K, V])
    );
  }

  changeIfPresent(key: K, value: V): boolean {
    return this.editRange(key, key, true, (k, v) => ({ value })) !== 0;
  }

  getRange(
    low: K,
    high: K,
    includeHigh?: boolean,
    maxLength: number = 0x3ffffff
  ): [K, V][] {
    var results: [K, V][] = [];
    this._root.forRange(low, high, includeHigh, false, this, 0, (k, v) => {
      results.push([k, v]);
      return results.length > maxLength ? Break : undefined;
    });
    return results;
  }

  setPairs(pairs: [K, V][], overwrite?: boolean): number {
    var added = 0;
    for (var i = 0; i < pairs.length; i++)
      if (this.set(pairs[i][0], pairs[i][1], overwrite)) added++;
    return added;
  }

  forRange(
    low: K,
    high: K,
    includeHigh: boolean,
    onFound?: (k: K, v: V, counter: number) => void,
    initialCounter?: number
  ): number;

  forRange<R = number>(
    low: K,
    high: K,
    includeHigh: boolean,
    onFound?: (k: K, v: V, counter: number) => { break?: R } | void,
    initialCounter?: number
  ): R | number {
    var r = this._root.forRange(
      low,
      high,
      includeHigh,
      false,
      this,
      initialCounter || 0,
      onFound
    );
    return typeof r === 'number' ? r : r.break!;
  }

  editRange<R = V>(
    low: K,
    high: K,
    includeHigh: boolean,
    onFound: (k: K, v: V, counter: number) => EditRangeResult<V, R> | void,
    initialCounter?: number
  ): R | number {
    var root = this._root;
    if (root.isShared) this._root = root = root.clone();
    try {
      var r = root.forRange(
        low,
        high,
        includeHigh,
        true,
        this,
        initialCounter || 0,
        onFound
      );
      return typeof r === 'number' ? r : r.break!;
    } finally {
      let isShared;
      while (root.keys.length <= 1 && !root.isLeaf) {
        isShared ||= root.isShared;
        this._root = root =
          root.keys.length === 0
            ? EmptyLeaf
            : (root as any as BNodeInternal<K, V>).children[0];
      }
      if (isShared) {
        root.isShared = true;
      }
    }
  }

  editAll<R = V>(
    onFound: (k: K, v: V, counter: number) => EditRangeResult<V, R> | void,
    initialCounter?: number
  ): R | number {
    return this.editRange(
      this.minKey()!,
      this.maxKey()!,
      true,
      onFound,
      initialCounter
    );
  }

  deleteRange(low: K, high: K, includeHigh: boolean): number {
    return this.editRange(low, high, includeHigh, DeleteRange);
  }

  deleteKeys(keys: K[]): number {
    for (var i = 0, r = 0; i < keys.length; i++) if (this.delete(keys[i])) r++;
    return r;
  }

  get height(): number {
    let node: BNode<K, V> | undefined = this._root;
    let height = -1;
    while (node) {
      height++;
      node = node.isLeaf
        ? undefined
        : (node as unknown as BNodeInternal<K, V>).children[0];
    }
    return height;
  }

  freeze() {
    var t = this as any;
    t.clear =
      t.set =
      t.editRange =
        function () {
          throw new Error('Attempted to modify a frozen BTree');
        };
  }

  unfreeze() {
    delete this.clear;
    delete this.set;
    delete this.editRange;
  }

  get isFrozen() {
    return this.hasOwnProperty('editRange');
  }

  checkValid() {
    var size = this._root.checkValid(0, this, 0);
    check(
      size === this.size,
      'size mismatch: counted ',
      size,
      'but stored',
      this.size
    );
  }
}

export function asSet<K, V>(
  btree: BTree<K, V>
): undefined extends V ? ISortedSet<K> : unknown {
  return btree as any;
}

declare const Symbol: any;
if (Symbol && Symbol.iterator)
  (BTree as any).prototype[Symbol.iterator] = BTree.prototype.entries;
(BTree as any).prototype.where = BTree.prototype.filter;
(BTree as any).prototype.setRange = BTree.prototype.setPairs;
(BTree as any).prototype.add = BTree.prototype.set;
function iterator<T>(
  next: () => IteratorResult<T> = () => ({ done: true, value: undefined })
): IterableIterator<T> {
  var result: any = { next };
  if (Symbol && Symbol.iterator)
    result[Symbol.iterator] = function () {
      return this;
    };
  return result;
}

class BNode<K, V> {
  keys: K[];
  values: V[];
  isShared: true | undefined;
  get isLeaf() {
    return (this as any).children === undefined;
  }

  constructor(keys: K[] = [], values?: V[]) {
    this.keys = keys;
    this.values = values || (undefVals as any[]);
    this.isShared = undefined;
  }

  maxKey() {
    return this.keys[this.keys.length - 1];
  }

  indexOf(key: K, failXor: number, cmp: (a: K, b: K) => number): index {
    const keys = this.keys;
    var lo = 0,
      hi = keys.length,
      mid = hi >> 1;
    while (lo < hi) {
      var c = cmp(keys[mid], key);
      if (c < 0) lo = mid + 1;
      else if (c > 0) hi = mid;
      else if (c === 0) return mid;
      else {
        if (key === key) return keys.length;
        else throw new Error('BTree: NaN was used as a key');
      }
      mid = (lo + hi) >> 1;
    }
    return mid ^ failXor;
  }

  minKey(): K | undefined {
    return this.keys[0];
  }

  minPair(reusedArray: [K, V]): [K, V] | undefined {
    if (this.keys.length === 0) return undefined;
    reusedArray[0] = this.keys[0];
    reusedArray[1] = this.values[0];
    return reusedArray;
  }

  maxPair(reusedArray: [K, V]): [K, V] | undefined {
    if (this.keys.length === 0) return undefined;
    const lastIndex = this.keys.length - 1;
    reusedArray[0] = this.keys[lastIndex];
    reusedArray[1] = this.values[lastIndex];
    return reusedArray;
  }

  clone(): BNode<K, V> {
    var v = this.values;
    return new BNode<K, V>(
      this.keys.slice(0),
      v === undefVals ? v : v.slice(0)
    );
  }

  greedyClone(force?: boolean): BNode<K, V> {
    return this.isShared && !force ? this : this.clone();
  }

  get(key: K, defaultValue: V | undefined, tree: BTree<K, V>): V | undefined {
    var i = this.indexOf(key, -1, tree._compare);
    return i < 0 ? defaultValue : this.values[i];
  }

  getPairOrNextLower(
    key: K,
    compare: (a: K, b: K) => number,
    inclusive: boolean,
    reusedArray: [K, V]
  ): [K, V] | undefined {
    var i = this.indexOf(key, -1, compare);
    const indexOrLower = i < 0 ? ~i - 1 : inclusive ? i : i - 1;
    if (indexOrLower >= 0) {
      reusedArray[0] = this.keys[indexOrLower];
      reusedArray[1] = this.values[indexOrLower];
      return reusedArray;
    }
    return undefined;
  }

  getPairOrNextHigher(
    key: K,
    compare: (a: K, b: K) => number,
    inclusive: boolean,
    reusedArray: [K, V]
  ): [K, V] | undefined {
    var i = this.indexOf(key, -1, compare);
    const indexOrLower = i < 0 ? ~i : inclusive ? i : i + 1;
    const keys = this.keys;
    if (indexOrLower < keys.length) {
      reusedArray[0] = keys[indexOrLower];
      reusedArray[1] = this.values[indexOrLower];
      return reusedArray;
    }
    return undefined;
  }

  checkValid(depth: number, tree: BTree<K, V>, baseIndex: number): number {
    var kL = this.keys.length,
      vL = this.values.length;
    check(
      this.values === undefVals ? kL <= vL : kL === vL,
      'keys/values length mismatch: depth',
      depth,
      'with lengths',
      kL,
      vL,
      'and baseIndex',
      baseIndex
    );
    check(
      depth == 0 || kL > 0,
      'empty leaf at depth',
      depth,
      'and baseIndex',
      baseIndex
    );
    return kL;
  }

  set(
    key: K,
    value: V,
    overwrite: boolean | undefined,
    tree: BTree<K, V>
  ): boolean | BNode<K, V> {
    var i = this.indexOf(key, -1, tree._compare);
    if (i < 0) {
      i = ~i;
      tree._size++;

      if (this.keys.length < tree._maxNodeSize) {
        return this.insertInLeaf(i, key, value, tree);
      } else {
        var newRightSibling = this.splitOffRightSide(),
          target: BNode<K, V> = this;
        if (i > this.keys.length) {
          i -= this.keys.length;
          target = newRightSibling;
        }
        target.insertInLeaf(i, key, value, tree);
        return newRightSibling;
      }
    } else {
      if (overwrite !== false) {
        if (value !== undefined) this.reifyValues();
        this.keys[i] = key;
        this.values[i] = value;
      }
      return false;
    }
  }

  reifyValues() {
    if (this.values === undefVals)
      return (this.values = this.values.slice(0, this.keys.length));
    return this.values;
  }

  insertInLeaf(i: index, key: K, value: V, tree: BTree<K, V>) {
    this.keys.splice(i, 0, key);
    if (this.values === undefVals) {
      while (undefVals.length < tree._maxNodeSize) undefVals.push(undefined);
      if (value === undefined) {
        return true;
      } else {
        this.values = undefVals.slice(0, this.keys.length - 1);
      }
    }
    this.values.splice(i, 0, value);
    return true;
  }

  takeFromRight(rhs: BNode<K, V>) {
    var v = this.values;
    if (rhs.values === undefVals) {
      if (v !== undefVals) v.push(undefined as any);
    } else {
      v = this.reifyValues();
      v.push(rhs.values.shift()!);
    }
    this.keys.push(rhs.keys.shift()!);
  }

  takeFromLeft(lhs: BNode<K, V>) {
    var v = this.values;
    if (lhs.values === undefVals) {
      if (v !== undefVals) v.unshift(undefined as any);
    } else {
      v = this.reifyValues();
      v.unshift(lhs.values.pop()!);
    }
    this.keys.unshift(lhs.keys.pop()!);
  }

  splitOffRightSide(): BNode<K, V> {
    var half = this.keys.length >> 1,
      keys = this.keys.splice(half);
    var values =
      this.values === undefVals ? undefVals : this.values.splice(half);
    return new BNode<K, V>(keys, values);
  }

  forRange<R>(
    low: K,
    high: K,
    includeHigh: boolean | undefined,
    editMode: boolean,
    tree: BTree<K, V>,
    count: number,
    onFound?: (k: K, v: V, counter: number) => EditRangeResult<V, R> | void
  ): EditRangeResult<V, R> | number {
    var cmp = tree._compare;
    var iLow, iHigh;
    if (high === low) {
      if (!includeHigh) return count;
      iHigh = (iLow = this.indexOf(low, -1, cmp)) + 1;
      if (iLow < 0) return count;
    } else {
      iLow = this.indexOf(low, 0, cmp);
      iHigh = this.indexOf(high, -1, cmp);
      if (iHigh < 0) iHigh = ~iHigh;
      else if (includeHigh === true) iHigh++;
    }
    var keys = this.keys,
      values = this.values;
    if (onFound !== undefined) {
      for (var i = iLow; i < iHigh; i++) {
        var key = keys[i];
        var result = onFound(key, values[i], count++);
        if (result !== undefined) {
          if (editMode === true) {
            if (key !== keys[i] || this.isShared === true)
              throw new Error('BTree illegally changed or cloned in editRange');
            if (result.delete) {
              this.keys.splice(i, 1);
              if (this.values !== undefVals) this.values.splice(i, 1);
              tree._size--;
              i--;
              iHigh--;
            } else if (result.hasOwnProperty('value')) {
              values![i] = result.value!;
            }
          }
          if (result.break !== undefined) return result;
        }
      }
    } else count += iHigh - iLow;
    return count;
  }

  mergeSibling(rhs: BNode<K, V>, _: number) {
    this.keys.push.apply(this.keys, rhs.keys);
    if (this.values === undefVals) {
      if (rhs.values === undefVals) return;
      this.values = this.values.slice(0, this.keys.length);
    }
    this.values.push.apply(this.values, rhs.reifyValues());
  }
}

class BNodeInternal<K, V> extends BNode<K, V> {
  children: BNode<K, V>[];

  constructor(children: BNode<K, V>[], keys?: K[]) {
    if (!keys) {
      keys = [];
      for (var i = 0; i < children.length; i++) keys[i] = children[i].maxKey();
    }
    super(keys);
    this.children = children;
  }

  clone(): BNode<K, V> {
    var children = this.children.slice(0);
    for (var i = 0; i < children.length; i++) children[i].isShared = true;
    return new BNodeInternal<K, V>(children, this.keys.slice(0));
  }

  greedyClone(force?: boolean): BNode<K, V> {
    if (this.isShared && !force) return this;
    var nu = new BNodeInternal<K, V>(
      this.children.slice(0),
      this.keys.slice(0)
    );
    for (var i = 0; i < nu.children.length; i++)
      nu.children[i] = nu.children[i].greedyClone(force);
    return nu;
  }

  minKey() {
    return this.children[0].minKey();
  }

  minPair(reusedArray: [K, V]): [K, V] | undefined {
    return this.children[0].minPair(reusedArray);
  }

  maxPair(reusedArray: [K, V]): [K, V] | undefined {
    return this.children[this.children.length - 1].maxPair(reusedArray);
  }

  get(key: K, defaultValue: V | undefined, tree: BTree<K, V>): V | undefined {
    var i = this.indexOf(key, 0, tree._compare),
      children = this.children;
    return i < children.length
      ? children[i].get(key, defaultValue, tree)
      : undefined;
  }

  getPairOrNextLower(
    key: K,
    compare: (a: K, b: K) => number,
    inclusive: boolean,
    reusedArray: [K, V]
  ): [K, V] | undefined {
    var i = this.indexOf(key, 0, compare),
      children = this.children;
    if (i >= children.length) return this.maxPair(reusedArray);
    const result = children[i].getPairOrNextLower(
      key,
      compare,
      inclusive,
      reusedArray
    );
    if (result === undefined && i > 0) {
      return children[i - 1].maxPair(reusedArray);
    }
    return result;
  }

  getPairOrNextHigher(
    key: K,
    compare: (a: K, b: K) => number,
    inclusive: boolean,
    reusedArray: [K, V]
  ): [K, V] | undefined {
    var i = this.indexOf(key, 0, compare),
      children = this.children,
      length = children.length;
    if (i >= length) return undefined;
    const result = children[i].getPairOrNextHigher(
      key,
      compare,
      inclusive,
      reusedArray
    );
    if (result === undefined && i < length - 1) {
      return children[i + 1].minPair(reusedArray);
    }
    return result;
  }

  checkValid(depth: number, tree: BTree<K, V>, baseIndex: number): number {
    let kL = this.keys.length,
      cL = this.children.length;
    check(
      kL === cL,
      'keys/children length mismatch: depth',
      depth,
      'lengths',
      kL,
      cL,
      'baseIndex',
      baseIndex
    );
    check(
      kL > 1 || depth > 0,
      'internal node has length',
      kL,
      'at depth',
      depth,
      'baseIndex',
      baseIndex
    );
    let size = 0,
      c = this.children,
      k = this.keys,
      childSize = 0;
    for (var i = 0; i < cL; i++) {
      size += c[i].checkValid(depth + 1, tree, baseIndex + size);
      childSize += c[i].keys.length;
      check(size >= childSize, 'wtf', baseIndex);
      check(
        i === 0 || c[i - 1].constructor === c[i].constructor,
        'type mismatch, baseIndex:',
        baseIndex
      );
      if (c[i].maxKey() != k[i])
        check(
          false,
          'keys[',
          i,
          '] =',
          k[i],
          'is wrong, should be ',
          c[i].maxKey(),
          'at depth',
          depth,
          'baseIndex',
          baseIndex
        );
      if (!(i === 0 || tree._compare(k[i - 1], k[i]) < 0))
        check(
          false,
          'sort violation at depth',
          depth,
          'index',
          i,
          'keys',
          k[i - 1],
          k[i]
        );
    }
    let toofew = childSize === 0;
    if (toofew || childSize > tree.maxNodeSize * cL)
      check(
        false,
        toofew ? 'too few' : 'too many',
        'children (',
        childSize,
        size,
        ') at depth',
        depth,
        'maxNodeSize:',
        tree.maxNodeSize,
        'children.length:',
        cL,
        'baseIndex:',
        baseIndex
      );
    return size;
  }

  set(
    key: K,
    value: V,
    overwrite: boolean | undefined,
    tree: BTree<K, V>
  ): boolean | BNodeInternal<K, V> {
    var c = this.children,
      max = tree._maxNodeSize,
      cmp = tree._compare;
    var i = Math.min(this.indexOf(key, 0, cmp), c.length - 1),
      child = c[i];

    if (child.isShared) c[i] = child = child.clone();
    if (child.keys.length >= max) {
      var other: BNode<K, V>;
      if (
        i > 0 &&
        (other = c[i - 1]).keys.length < max &&
        cmp(child.keys[0], key) < 0
      ) {
        if (other.isShared) c[i - 1] = other = other.clone();
        other.takeFromRight(child);
        this.keys[i - 1] = other.maxKey();
      } else if (
        (other = c[i + 1]) !== undefined &&
        other.keys.length < max &&
        cmp(child.maxKey(), key) < 0
      ) {
        if (other.isShared) c[i + 1] = other = other.clone();
        other.takeFromLeft(child);
        this.keys[i] = c[i].maxKey();
      }
    }

    var result = child.set(key, value, overwrite, tree);
    if (result === false) return false;
    this.keys[i] = child.maxKey();
    if (result === true) return true;

    if (this.keys.length < max) {
      this.insert(i + 1, result);
      return true;
    } else {
      var newRightSibling = this.splitOffRightSide(),
        target: BNodeInternal<K, V> = this;
      if (cmp(result.maxKey(), this.maxKey()) > 0) {
        target = newRightSibling;
        i -= this.keys.length;
      }
      target.insert(i + 1, result);
      return newRightSibling;
    }
  }

  insert(i: index, child: BNode<K, V>) {
    this.children.splice(i, 0, child);
    this.keys.splice(i, 0, child.maxKey());
  }

  splitOffRightSide() {
    var half = this.children.length >> 1;
    return new BNodeInternal<K, V>(
      this.children.splice(half),
      this.keys.splice(half)
    );
  }

  takeFromRight(rhs: BNode<K, V>) {
    this.keys.push(rhs.keys.shift()!);
    this.children.push((rhs as BNodeInternal<K, V>).children.shift()!);
  }

  takeFromLeft(lhs: BNode<K, V>) {
    this.keys.unshift(lhs.keys.pop()!);
    this.children.unshift((lhs as BNodeInternal<K, V>).children.pop()!);
  }

  forRange<R>(
    low: K,
    high: K,
    includeHigh: boolean | undefined,
    editMode: boolean,
    tree: BTree<K, V>,
    count: number,
    onFound?: (k: K, v: V, counter: number) => EditRangeResult<V, R> | void
  ): EditRangeResult<V, R> | number {
    var cmp = tree._compare;
    var keys = this.keys,
      children = this.children;
    var iLow = this.indexOf(low, 0, cmp),
      i = iLow;
    var iHigh = Math.min(
      high === low ? iLow : this.indexOf(high, 0, cmp),
      keys.length - 1
    );
    if (!editMode) {
      for (; i <= iHigh; i++) {
        var result = children[i].forRange(
          low,
          high,
          includeHigh,
          editMode,
          tree,
          count,
          onFound
        );
        if (typeof result !== 'number') return result;
        count = result;
      }
    } else if (i <= iHigh) {
      try {
        for (; i <= iHigh; i++) {
          if (children[i].isShared) children[i] = children[i].clone();
          var result = children[i].forRange(
            low,
            high,
            includeHigh,
            editMode,
            tree,
            count,
            onFound
          );
          keys[i] = children[i].maxKey();
          if (typeof result !== 'number') return result;
          count = result;
        }
      } finally {
        var half = tree._maxNodeSize >> 1;
        if (iLow > 0) iLow--;
        for (i = iHigh; i >= iLow; i--) {
          if (children[i].keys.length <= half) {
            if (children[i].keys.length !== 0) {
              this.tryMerge(i, tree._maxNodeSize);
            } else {
              keys.splice(i, 1);
              children.splice(i, 1);
            }
          }
        }
        if (children.length !== 0 && children[0].keys.length === 0)
          check(false, 'emptiness bug');
      }
    }
    return count;
  }

  tryMerge(i: index, maxSize: number): boolean {
    var children = this.children;
    if (i >= 0 && i + 1 < children.length) {
      if (children[i].keys.length + children[i + 1].keys.length <= maxSize) {
        if (children[i].isShared) children[i] = children[i].clone();
        children[i].mergeSibling(children[i + 1], maxSize);
        children.splice(i + 1, 1);
        this.keys.splice(i + 1, 1);
        this.keys[i] = children[i].maxKey();
        return true;
      }
    }
    return false;
  }

  mergeSibling(rhs: BNode<K, V>, maxNodeSize: number) {
    var oldLength = this.keys.length;
    this.keys.push.apply(this.keys, rhs.keys);
    const rhsChildren = (rhs as any as BNodeInternal<K, V>).children;
    this.children.push.apply(this.children, rhsChildren);

    if (rhs.isShared && !this.isShared) {
      for (var i = 0; i < rhsChildren.length; i++)
        rhsChildren[i].isShared = true;
    }

    this.tryMerge(oldLength - 1, maxNodeSize);
  }
}

type DiffCursor<K, V> = {
  height: number;
  internalSpine: BNode<K, V>[][];
  levelIndices: number[];
  leaf: BNode<K, V> | undefined;
  currentKey: K;
};

var undefVals: any[] = [];

const Delete = { delete: true },
  DeleteRange = () => Delete;
const Break = { break: true };
const EmptyLeaf = (function () {
  var n = new BNode<any, any>();
  n.isShared = true;
  return n;
})();
const EmptyArray: any[] = [];
const ReusedArray: any[] = [];
function check(fact: boolean, ...args: any[]) {
  if (!fact) {
    args.unshift('B+ tree');
    throw new Error(args.join(' '));
  }
}

export const EmptyBTree = (() => {
  let t = new BTree();
  t.freeze();
  return t;
})();
