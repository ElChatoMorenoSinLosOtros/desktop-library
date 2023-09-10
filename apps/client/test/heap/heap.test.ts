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

  test('maxHeapLoan', () => {
    const minHeap = new Heap<Loan>((a, b) => a.loanId - b.loanId);
    const loan1: Loan = {
      loanId: 1,
      clientId: 2,
      materialId: 3,
      loanDate: new Date(),
      returnDate: new Date(),
      returned: false
    };
    const loan2: Loan = {
      loanId: 2,
      clientId: 2,
      materialId: 3,
      loanDate: new Date(),
      returnDate: new Date(),
      returned: false
    };
    const loan3: Loan = {
      loanId: 3,
      clientId: 2,
      materialId: 3,
      loanDate: new Date(),
      returnDate: new Date(),
      returned: false
    };

    minHeap.insert(loan1);
    minHeap.insert(loan2);
    minHeap.insert(loan3);

    expect(minHeap.extractMax()).toBe(loan3);
    expect(minHeap.extractMax()).toBe(loan2);
    expect(minHeap.extractMax()).toBe(loan1);
  });

  test('minHeapMaterial', () => {
    const minHeap = new Heap<Material>((a, b) => b.materialId - a.materialId);
    const material1: Material = {
      materialId: 1,
      title: 'Libro de Ciencia',
      author: 'Autor A',
      category: 'Ciencia',
      isbn: '978-1234567890',
      publicationYear: 2020,
      pageCount: 300,
      quantity: 5,
      available: true,
      type_material: 'Libro'
    };

    const material2: Material = {
      materialId: 2,
      title: 'Revista de Historia',
      author: 'Autor B',
      category: 'Historia',
      isbn: '978-0987654321',
      publicationYear: 2022,
      pageCount: 50,
      quantity: 10,
      available: false,
      type_material: 'Revista'
    };

    const material3: Material = {
      materialId: 3,
      title: 'Película de Aventuras',
      author: 'Director C',
      category: 'Aventuras',
      isbn: 'N/A',
      publicationYear: 2021,
      pageCount: 0,
      quantity: 3,
      available: true,
      type_material: 'Película'
    };

    minHeap.insert(material1);
    minHeap.insert(material2);
    minHeap.insert(material3);

    expect(minHeap.extractMax()).toBe(material1);
    expect(minHeap.extractMax()).toBe(material2);
    expect(minHeap.extractMax()).toBe(material3);
  });
});
