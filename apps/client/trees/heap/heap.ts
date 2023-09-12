export default class Heap<T> {
  private data: T[] = [];

  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  private swap(i: number, j: number): void {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  private heapify(index: number): void {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (
      left < this.data.length &&
      this.compare(this.data[left], this.data[largest]) > 0
    ) {
      largest = left;
    }

    if (
      right < this.data.length &&
      this.compare(this.data[right], this.data[largest]) > 0
    ) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.heapify(largest);
    }
  }

  public insert(item: T): void {
    this.data.push(item);

    let currentIndex = this.data.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.compare(this.data[currentIndex], this.data[parentIndex]) <= 0) {
        break;
      }
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  public searchByProperty(property: keyof T, value: T): T[] {
    const results: T[] = [];
    this.data.forEach(item => {
      if (item[property] === value) {
        results.push(item);
      }
    });
    return results;
  }

  public extractMax(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }
    if (this.data.length === 1) {
      return this.data.pop();
    }
    const root = this.data[0];
    const poppedItem = this.data.pop();
    if (poppedItem !== undefined) {
      this.data[0] = poppedItem;
      this.heapify(0);
    }
    return root;
  }

  public getRoot(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }
    return this.data[0];
  }

  public getMax(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }
    return this.data.reduce((max, current) =>
      this.compare(max, current) >= 0 ? max : current
    );
  }

  public getMin(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }
    return this.data.reduce((min, current) =>
      this.compare(min, current) <= 0 ? min : current
    );
  }

  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  public size(): number {
    return this.data.length;
  }

  public update(index: number, newValue: T): void {
    if (index < 0 || index >= this.data.length) {
      throw new Error('Index out of bounds');
    }

    this.data[index] = newValue;

    let currentIndex = index;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    if (
      parentIndex >= 0 &&
      this.compare(this.data[currentIndex], this.data[parentIndex]) > 0
    ) {
      while (
        currentIndex > 0 &&
        this.compare(this.data[currentIndex], this.data[parentIndex]) > 0
      ) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
        parentIndex = Math.floor((currentIndex - 1) / 2);
      }
    } else {
      this.heapify(currentIndex);
    }
  }

  public delete(item: T): void {
    const index = this.data.indexOf(item);
    if (index === -1) {
      return;
    }

    const lastItem = this.data.pop();

    if (lastItem !== undefined) {
      this.data[index] = lastItem;

      let currentIndex = index;
      let parentIndex = Math.floor((currentIndex - 1) / 2);

      if (
        parentIndex >= 0 &&
        this.compare(this.data[currentIndex], this.data[parentIndex]) > 0
      ) {
        while (
          currentIndex > 0 &&
          this.compare(this.data[currentIndex], this.data[parentIndex]) > 0
        ) {
          this.swap(currentIndex, parentIndex);
          currentIndex = parentIndex;
          parentIndex = Math.floor((currentIndex - 1) / 2);
        }
      } else {
        this.heapify(currentIndex);
      }
    }

    if (this.data.length === 0) {
      this.data = [];
    }
  }
}
