export class Heap<T> {
  private data: T[] = [];

  private isMinHeap: boolean;

  constructor(isMinHeap = true) {
    this.isMinHeap = isMinHeap;
  }

  private compare(a: T, b: T): boolean {
    if (this.isMinHeap) {
      return a < b;
    }
    return a > b;
  }

  private swap(i: number, j: number): void {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  private heapify(index: number): void {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallestOrLargest = index;

    if (
      left < this.data.length &&
      this.compare(this.data[left], this.data[smallestOrLargest])
    ) {
      smallestOrLargest = left;
    }

    if (
      right < this.data.length &&
      this.compare(this.data[right], this.data[smallestOrLargest])
    ) {
      smallestOrLargest = right;
    }

    if (smallestOrLargest !== index) {
      this.swap(index, smallestOrLargest);
      this.heapify(smallestOrLargest);
    }
  }

  public insert(item: T): void {
    this.data.push(item);

    let currentIndex = this.data.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.compare(this.data[currentIndex], this.data[parentIndex])) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  public extract(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }

    if (this.data.length === 1) {
      return this.data.pop();
    }

    const root = this.data[0];
    this.data[0] = this.data.pop()!;
    this.heapify(0);
    return root;
  }

  public peek(): T | undefined {
    return this.data[0];
  }

  public size(): number {
    return this.data.length;
  }
}
