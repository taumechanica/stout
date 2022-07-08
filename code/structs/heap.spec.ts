import { Heap } from './heap';

describe('Heap', () => {
    const items = [
        { key: 5, value: 'five' },
        { key: 3, value: 'three' },
        { key: 4, value: 'four' }
    ];

    it('should create an empty heap', () => {
        const heap = new Heap<number, string>((a, b) => a - b);
        expect(heap.count).toEqual(0);
    });

    it('should initialize heap items', () => {
        const heap = new Heap<number, string>((a, b) => a - b, ...items);
        expect(heap.count).toEqual(3);
    });

    it('should insert new items', () => {
        const heap = new Heap<number, string>((a, b) => a - b);

        heap.insert(1, 'one');
        expect(heap.count).toEqual(1);

        heap.insert(2, 'two');
        expect(heap.count).toEqual(2);

        heap.insert(3, 'three');
        expect(heap.count).toEqual(3);
    });

    it('should not remove anything when heap is empty', () => {
        const heap = new Heap<number, string>((a, b) => a - b);
        expect(heap.remove()).toBeUndefined();
    });

    it('should remove items in the right order (max-heap)', () => {
        const heap = new Heap<number, string>((a, b) => a - b, ...items);

        heap.insert(1, 'one');
        expect(heap.count).toEqual(4);

        heap.insert(2, 'two');
        expect(heap.count).toEqual(5);

        heap.insert(3, 'three');
        expect(heap.count).toEqual(6);

        expect(heap.remove()).toEqual({ key: 5, value: 'five' });
        expect(heap.remove()).toEqual({ key: 4, value: 'four' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 2, value: 'two' });
        expect(heap.remove()).toEqual({ key: 1, value: 'one' });
    });

    it('should remove items in the right order (min-heap)', () => {
        const heap = new Heap<number, string>((a, b) => b - a, ...items);

        heap.insert(1, 'one');
        expect(heap.count).toEqual(4);

        heap.insert(2, 'two');
        expect(heap.count).toEqual(5);

        heap.insert(3, 'three');
        expect(heap.count).toEqual(6);

        expect(heap.remove()).toEqual({ key: 1, value: 'one' });
        expect(heap.remove()).toEqual({ key: 2, value: 'two' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 4, value: 'four' });
        expect(heap.remove()).toEqual({ key: 5, value: 'five' });
    });

    it('should remove items in the right order (lexicographic min-heap)', () => {
        const heap = new Heap<string, number>((a, b) => b.localeCompare(a));

        heap.insert('one', 1);
        expect(heap.count).toEqual(1);

        heap.insert('two', 2);
        expect(heap.count).toEqual(2);

        heap.insert('three', 3);
        expect(heap.count).toEqual(3);

        heap.insert('four', 4);
        expect(heap.count).toEqual(4);

        expect(heap.remove()).toEqual({ key: 'four', value: 4 });
        expect(heap.remove()).toEqual({ key: 'one', value: 1 });
        expect(heap.remove()).toEqual({ key: 'three', value: 3 });
        expect(heap.remove()).toEqual({ key: 'two', value: 2 });
    });
});
