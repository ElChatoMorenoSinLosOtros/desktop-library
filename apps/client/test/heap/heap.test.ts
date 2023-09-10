import Heap from '../../trees/heap/heap';

describe('Heap', () => {
  test('minHeap', () => {
    const minHeap = new Heap<number>((a, b) => b - a);

    minHeap.insert(3);
    minHeap.insert(2);
    minHeap.insert(1);

    expect(minHeap.extractMax()).toBe(1);
    expect(minHeap.extractMax()).toBe(2);
    expect(minHeap.extractMax()).toBe(3);
  });

  test('maxHeap', () => {
    const maxHeap = new Heap<number>((a, b) => a - b);

    maxHeap.insert(1);
    maxHeap.insert(2);
    maxHeap.insert(3);

    expect(maxHeap.extractMax()).toBe(3);
    expect(maxHeap.extractMax()).toBe(2);
    expect(maxHeap.extractMax()).toBe(1);
  });
});
