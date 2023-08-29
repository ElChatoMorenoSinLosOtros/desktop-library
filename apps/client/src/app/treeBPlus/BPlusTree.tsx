import BPlusTreeNode from './BPlusTreeNode';

interface Comparable<T> {
  compareTo(other: T): number;
}

class BPlusTree<K extends Comparable<K>, V> {
  root: BPlusTreeNode<K, V>;

  degree: number;

  compareFn: (a: K, b: K) => number;

  constructor(degree: number) {
    this.degree = degree;
    this.compareFn = (a, b) => a.compareTo(b);
    this.root = new BPlusTreeNode<K, V>(this.compareFn);
    this.root.isLeaf = true;
  }

  insert(key: K, value: V) {
    if (this.root.keys.length === 2 * this.degree - 1) {
      const newRoot = new BPlusTreeNode<K, V>(this.compareFn);
      newRoot.children.push(this.root);
      newRoot.splitChild(0, this.degree); // Pass the 'degree' parameter
      newRoot.insertNonFull(key, value, this.degree); // Pass the 'degree' parameter
      this.root = newRoot;
    } else {
      this.root.insertNonFull(key, value, this.degree); // Pass the 'degree' parameter
    }
  }

  search(key: K): V | null {
    return this.root.search(key);
  }
}

export default BPlusTree;
