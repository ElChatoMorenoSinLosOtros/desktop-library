/* eslint-disable */
export interface ISetSource<K = any> {
  size: number;
  has(key: K): boolean;
  keys(): IterableIterator<K>;
}

export interface IMapSource<K = any, V = any> extends ISetSource<K> {
  size: number;
  get(key: K): V | undefined;
  has(key: K): boolean;
  forEach(
    callbackFn: (v: V, k: K, map: IMapSource<K, V>) => void,
    thisArg: any
  ): void;

  entries(): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
}

export interface ISetSink<K = any> {
  add(key: K): any;
  delete(key: K): boolean;
  clear(): void;
}

export interface IMapSink<K = any, V = any> {
  delete(key: K): boolean;
  set(key: K, value: V): any;
  clear(): void;
}

export interface ISet<K = any> extends ISetSource<K>, ISetSink<K> {}

export interface IMap<K = any, V = any>
  extends IMapSource<K, V>,
    IMapSink<K, V> {}

export interface ISortedSetSource<K = any> extends ISetSource<K> {
  minKey(): K | undefined;
  maxKey(): K | undefined;
  nextHigherKey(key?: K): K | undefined;
  nextLowerKey(key?: K): K | undefined;
  forRange(
    low: K,
    high: K,
    includeHigh: boolean,
    onFound?: (k: K, v: any, counter: number) => void,
    initialCounter?: number
  ): number;
  keys(firstKey?: K): IterableIterator<K>;
}

export interface ISortedMapSource<K = any, V = any>
  extends IMapSource<K, V>,
    ISortedSetSource<K> {
  nextHigherPair(key?: K): [K, V] | undefined;
  nextLowerPair(key?: K): [K, V] | undefined;
  getRange(
    low: K,
    high: K,
    includeHigh?: boolean,
    maxLength?: number
  ): [K, V][];
  forRange(
    low: K,
    high: K,
    includeHigh: boolean,
    onFound?: (k: K, v: V, counter: number) => void,
    initialCounter?: number
  ): number;
  entries(firstKey?: K): IterableIterator<[K, V]>;
  keys(firstKey?: K): IterableIterator<K>;
  values(firstKey?: K): IterableIterator<V>;

  reduce<R>(
    callback: (
      previous: R,
      currentPair: [K, V],
      counter: number,
      tree: IMapF<K, V>
    ) => R,
    initialValue: R
  ): R;
  reduce<R>(
    callback: (
      previous: R | undefined,
      currentPair: [K, V],
      counter: number,
      tree: IMapF<K, V>
    ) => R
  ): R | undefined;
}

export interface ISortedSet<K = any> extends ISortedSetSource<K>, ISetSink<K> {}

export interface ISortedMap<K = any, V = any>
  extends IMap<K, V>,
    ISortedMapSource<K, V> {
  set(key: K, value: V, overwrite?: boolean): boolean;
  setPairs(pairs: [K, V][], overwrite?: boolean): number;
  deleteKeys(keys: K[]): number;
  deleteRange(low: K, high: K, includeHigh: boolean): number;

  entries(firstKey?: K): IterableIterator<[K, V]>;
  keys(firstKey?: K): IterableIterator<K>;
  values(firstKey?: K): IterableIterator<V>;
}

export interface ISetF<K = any> extends ISetSource<K> {
  with(key: K): ISetF<K>;
  without(key: K): ISetF<K>;
  withKeys(keys: K[], returnThisIfUnchanged?: boolean): ISetF<K>;
  withoutKeys(keys: K[], returnThisIfUnchanged?: boolean): ISetF<K>;
  filter(
    callback: (k: K, v: any, counter: number) => boolean,
    returnThisIfUnchanged?: boolean
  ): ISetF<K>;
}

export interface IMapF<K = any, V = any> extends IMapSource<K, V>, ISetF<K> {
  with(key: K): IMapF<K, V | undefined>;
  with<V2>(key: K, value: V2, overwrite?: boolean): IMapF<K, V | V2>;
  withPairs<V2>(pairs: [K, V | V2][], overwrite: boolean): IMapF<K, V | V2>;
  withKeys(keys: K[], returnThisIfUnchanged?: boolean): IMapF<K, V | undefined>;
  mapValues<R>(callback: (v: V, k: K, counter: number) => R): IMapF<K, R>;
  reduce<R>(
    callback: (
      previous: R,
      currentPair: [K, V],
      counter: number,
      tree: IMapF<K, V>
    ) => R,
    initialValue: R
  ): R;
  reduce<R>(
    callback: (
      previous: R | undefined,
      currentPair: [K, V],
      counter: number,
      tree: IMapF<K, V>
    ) => R
  ): R | undefined;

  without(key: K): IMapF<K, V>;
  withoutKeys(keys: K[], returnThisIfUnchanged?: boolean): IMapF<K, V>;
  filter(
    callback: (k: K, v: V, counter: number) => boolean,
    returnThisIfUnchanged?: boolean
  ): IMapF<K, V>;
}

export interface ISortedSetF<K = any> extends ISetF<K>, ISortedSetSource<K> {
  keys(firstKey?: K): IterableIterator<K>;
}

export interface ISortedMapF<K = any, V = any>
  extends ISortedSetF<K>,
    IMapF<K, V>,
    ISortedMapSource<K, V> {
  withoutRange(
    low: K,
    high: K,
    includeHigh: boolean,
    returnThisIfUnchanged?: boolean
  ): ISortedMapF<K, V>;

  entries(firstKey?: K): IterableIterator<[K, V]>;
  keys(firstKey?: K): IterableIterator<K>;
  values(firstKey?: K): IterableIterator<V>;
  forRange(
    low: K,
    high: K,
    includeHigh: boolean,
    onFound?: (k: K, v: V, counter: number) => void,
    initialCounter?: number
  ): number;

  with(key: K): ISortedMapF<K, V | undefined>;
  with<V2>(key: K, value: V2, overwrite?: boolean): ISortedMapF<K, V | V2>;
  withKeys(
    keys: K[],
    returnThisIfUnchanged?: boolean
  ): ISortedMapF<K, V | undefined>;
  withPairs<V2>(
    pairs: [K, V | V2][],
    overwrite: boolean
  ): ISortedMapF<K, V | V2>;
  mapValues<R>(callback: (v: V, k: K, counter: number) => R): ISortedMapF<K, R>;
  without(key: K): ISortedMapF<K, V>;
  withoutKeys(keys: K[], returnThisIfUnchanged?: boolean): ISortedMapF<K, V>;
  filter(
    callback: (k: K, v: any, counter: number) => boolean,
    returnThisIfUnchanged?: boolean
  ): ISortedMapF<K, V>;
}

export interface ISortedMapConstructor<K, V> {
  new (entries?: [K, V][], compare?: (a: K, b: K) => number): ISortedMap<K, V>;
}
export interface ISortedMapFConstructor<K, V> {
  new (entries?: [K, V][], compare?: (a: K, b: K) => number): ISortedMapF<K, V>;
}
