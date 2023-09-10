import { Heap } from '../../trees/heap/heap';

describe('Heap', () => {
  describe('Min Heap', () => {
    it('should insert and extract elements in ascending order', () => {
      const minHeap = new Heap<number>(true);
      minHeap.insert(3);
      minHeap.insert(1);
      minHeap.insert(6);
      minHeap.insert(5);

      expect(minHeap.extract()).toBe(1);
      expect(minHeap.extract()).toBe(3);
      expect(minHeap.extract()).toBe(5);
      expect(minHeap.extract()).toBe(6);
    });

    it('should return the top element without removing it using peek', () => {
      const minHeap = new Heap<number>(true);
      minHeap.insert(3);
      minHeap.insert(1);
      minHeap.insert(6);
      minHeap.insert(5);

      expect(minHeap.peek()).toBe(1);
      expect(minHeap.size()).toBe(4);
    });
  });

  describe('Max Heap', () => {
    it('should insert and extract elements in descending order', () => {
      const maxHeap = new Heap<number>(false);
      maxHeap.insert(3);
      maxHeap.insert(1);
      maxHeap.insert(6);
      maxHeap.insert(5);

      expect(maxHeap.extract()).toBe(6);
      expect(maxHeap.extract()).toBe(5);
      expect(maxHeap.extract()).toBe(3);
      expect(maxHeap.extract()).toBe(1);
    });

    it('should return the top element without removing it using peek', () => {
      const maxHeap = new Heap<number>(false);
      maxHeap.insert(3);
      maxHeap.insert(1);
      maxHeap.insert(6);
      maxHeap.insert(5);

      expect(maxHeap.peek()).toBe(6);
      expect(maxHeap.size()).toBe(4);
    });
  });
});
