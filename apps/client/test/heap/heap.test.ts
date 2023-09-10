import Heap from '../../trees/heap/heap';

describe('Heap', () => {
  describe('insert', () => {
    it('should insert items into the heap correctly', () => {
      const minHeap = new Heap<number>();
      minHeap.insert(5);
      minHeap.insert(3);
      minHeap.insert(8);

      expect(minHeap.peek()).toBe(3);
      expect(minHeap.size()).toBe(3);
    });
  });

  describe('extract', () => {
    it('should extract the minimum item from a min-heap', () => {
      const minHeap = new Heap<number>();
      minHeap.insert(5);
      minHeap.insert(3);
      minHeap.insert(8);

      expect(minHeap.extract()).toBe(3);
      expect(minHeap.size()).toBe(2);
    });

    it('should return undefined when extracting from an empty heap', () => {
      const minHeap = new Heap<number>();
      expect(minHeap.extract()).toBeUndefined();
    });
  });

  describe('peek', () => {
    it('should return the minimum item without removing it', () => {
      const minHeap = new Heap<number>();
      minHeap.insert(5);
      minHeap.insert(3);
      minHeap.insert(8);

      expect(minHeap.peek()).toBe(3);
      expect(minHeap.size()).toBe(3);
    });

    it('should return undefined when peeking an empty heap', () => {
      const minHeap = new Heap<number>();
      expect(minHeap.peek()).toBeUndefined();
    });
  });
});
