import BPlusTree from './BPlusTree';
import Comparable from './BPlusTreeNode';

class ComparableNumber implements Comparable<ComparableNumber> {
  constructor(private value: number) {}

  compareTo(other: ComparableNumber): number {
    return this.value - other.value;
  }
}

describe('BPlusTree', () => {
  it('should insert and search values correctly', () => {
    const bPlusTree = new BPlusTree<ComparableNumber, string>(3);

    bPlusTree.insert(new ComparableNumber(1), 'One');
    bPlusTree.insert(new ComparableNumber(2), 'Two');
    bPlusTree.insert(new ComparableNumber(3), 'Three');
    bPlusTree.insert(new ComparableNumber(4), 'Four');

    expect(bPlusTree.search(new ComparableNumber(1))).toBe('One');
    expect(bPlusTree.search(new ComparableNumber(2))).toBe('Two');
    expect(bPlusTree.search(new ComparableNumber(3))).toBe('Three');
    expect(bPlusTree.search(new ComparableNumber(4))).toBe('Four');
    expect(bPlusTree.search(new ComparableNumber(5))).toBe(null);
  });
});
