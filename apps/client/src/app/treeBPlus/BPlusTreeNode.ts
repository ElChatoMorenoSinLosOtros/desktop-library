class BPlusTreeNode<K, V> {
  keys: K[];

  children: (BPlusTreeNode<K, V> | V)[];

  isLeaf: boolean;

  compareFn: (a: K, b: K) => number; // Función de comparación

  constructor(compareFn: (a: K, b: K) => number) {
    this.keys = [];
    this.children = [];
    this.isLeaf = false;
    this.compareFn = compareFn;
  }

  // ... (insert, search, splitChild, insertNonFull)

  insert(key: K, value: V) {
    let insertIndex = 0;
    while (
      insertIndex < this.keys.length &&
      this.compareFn(key, this.keys[insertIndex]) > 0
    ) {
      insertIndex += 1;
    }
    this.keys.splice(insertIndex, 0, key);
    this.children.splice(insertIndex + 1, 0, value);
  }

  search(key: K): V | null {
    let searchIndex = 0;
    while (
      searchIndex < this.keys.length &&
      this.compareFn(key, this.keys[searchIndex]) > 0
    ) {
      searchIndex += 1;
    }
    if (
      searchIndex < this.keys.length &&
      this.compareFn(key, this.keys[searchIndex]) === 0
    ) {
      return this.children[searchIndex + 1] as V;
    }
    if (this.isLeaf) {
      return null;
    }
    return (this.children[searchIndex] as BPlusTreeNode<K, V>).search(key);
  }

  splitChild(index: number, degree: number) {
    // Add the 'degree' parameter here
    const newChild = new BPlusTreeNode<K, V>(this.compareFn);
    const oldChild = this.children[index] as BPlusTreeNode<K, V>;
    newChild.isLeaf = oldChild.isLeaf;

    const midIndex = Math.floor(degree / 2); // Use 'degree' parameter here
    newChild.keys = oldChild.keys.slice(midIndex + 1);
    newChild.children = oldChild.children.slice(midIndex + 1);

    oldChild.keys = oldChild.keys.slice(0, midIndex);
    oldChild.children = oldChild.children.slice(0, midIndex + 1);

    this.children.splice(index + 1, 0, newChild);
    this.keys.splice(index, 0, oldChild.keys[midIndex]);
  }

  insertNonFull(key: K, value: V, degree: number) {
    // Add the 'degree' parameter here
    if (this.isLeaf) {
      this.insert(key, value);
    } else {
      let insertIndex = 0;
      while (
        insertIndex < this.keys.length &&
        this.compareFn(key, this.keys[insertIndex]) > 0
      ) {
        insertIndex += 1;
      }
      const child = this.children[insertIndex] as BPlusTreeNode<K, V>;
      if (child.keys.length === 2 * degree - 1) {
        // Use 'degree' parameter here
        this.splitChild(insertIndex, degree); // Pass 'degree' parameter here
        if (this.compareFn(key, this.keys[insertIndex]) > 0) {
          insertIndex += 1;
        }
      }
      child.insertNonFull(key, value, degree); // Pass 'degree' parameter here
    }
  }
}

export default BPlusTreeNode;
