import { Heap } from './heap';

describe('Heap', () => {
    type HeapItem = {
        key: number;
        value: string;
    };

    const items = new Array<HeapItem>(
        { key: 5, value: 'five' },
        { key: 3, value: 'three' },
        { key: 4, value: 'four' }
    );

    it('should create an empty heap', () => {
        const heap = new Heap<HeapItem>((a, b) => a.key - b.key);
        expect(heap.count).toEqual(0);
    });

    it('should initialize heap items', () => {
        const heap = new Heap<HeapItem>((a, b) => a.key - b.key, ...items);
        expect(heap.count).toEqual(3);
    });

    it('should insert new items', () => {
        const heap = new Heap<HeapItem>((a, b) => a.key - b.key);

        heap.insert({ key: 1, value: 'one' });
        expect(heap.count).toEqual(1);

        heap.insert({ key: 2, value: 'two' });
        expect(heap.count).toEqual(2);

        heap.insert({ key: 3, value: 'three' });
        expect(heap.count).toEqual(3);
    });

    it('should not remove anything when heap is empty', () => {
        const heap = new Heap<HeapItem>((a, b) => a.key - b.key);
        expect(heap.remove()).toBeUndefined();
    });

    it('should remove items in the right order (max-heap)', () => {
        const heap = new Heap<HeapItem>((a, b) => a.key - b.key, ...items);

        heap.insert({ key: 1, value: 'one' });
        expect(heap.count).toEqual(4);

        heap.insert({ key: 2, value: 'two' });
        expect(heap.count).toEqual(5);

        heap.insert({ key: 3, value: 'three' });
        expect(heap.count).toEqual(6);

        expect(heap.remove()).toEqual({ key: 5, value: 'five' });
        expect(heap.remove()).toEqual({ key: 4, value: 'four' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 2, value: 'two' });
        expect(heap.remove()).toEqual({ key: 1, value: 'one' });
    });

    it('should remove items in the right order (min-heap)', () => {
        const heap = new Heap<HeapItem>((a, b) => b.key - a.key, ...items);

        heap.insert({ key: 1, value: 'one' });
        expect(heap.count).toEqual(4);

        heap.insert({ key: 2, value: 'two' });
        expect(heap.count).toEqual(5);

        heap.insert({ key: 3, value: 'three' });
        expect(heap.count).toEqual(6);

        expect(heap.remove()).toEqual({ key: 1, value: 'one' });
        expect(heap.remove()).toEqual({ key: 2, value: 'two' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 4, value: 'four' });
        expect(heap.remove()).toEqual({ key: 5, value: 'five' });
    });

    it('should remove items in the right order (lexicographic min-heap)', () => {
        const heap = new Heap<string>((a, b) => b.localeCompare(a));

        heap.insert('one');
        expect(heap.count).toEqual(1);

        heap.insert('two');
        expect(heap.count).toEqual(2);

        heap.insert('three');
        expect(heap.count).toEqual(3);

        heap.insert('four');
        expect(heap.count).toEqual(4);

        expect(heap.remove()).toEqual('four');
        expect(heap.remove()).toEqual('one');
        expect(heap.remove()).toEqual('three');
        expect(heap.remove()).toEqual('two');
    });

    it('should traverse items in the right order (max-heap)', () => {
        const heap = new Heap<HeapItem>((a, b) => a.key - b.key, ...items);

        heap.insert({ key: 1, value: 'one' });
        expect(heap.count).toEqual(4);

        heap.insert({ key: 2, value: 'two' });
        expect(heap.count).toEqual(5);

        heap.insert({ key: 3, value: 'three' });
        expect(heap.count).toEqual(6);

        const keys = new Array<number>();
        heap.traverse(({ key }) => keys.push(key));
        expect(keys).toEqual([5, 4, 3, 3, 2, 1]);

        expect(heap.count).toEqual(6);
        expect(heap.remove()).toEqual({ key: 5, value: 'five' });
        expect(heap.remove()).toEqual({ key: 4, value: 'four' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 2, value: 'two' });
        expect(heap.remove()).toEqual({ key: 1, value: 'one' });
    });

    it('should traverse items in the right order (min-heap)', () => {
        const heap = new Heap<HeapItem>((a, b) => b.key - a.key, ...items);

        heap.insert({ key: 1, value: 'one' });
        expect(heap.count).toEqual(4);

        heap.insert({ key: 2, value: 'two' });
        expect(heap.count).toEqual(5);

        heap.insert({ key: 3, value: 'three' });
        expect(heap.count).toEqual(6);

        const keys = new Array<number>();
        heap.traverse(({ key }) => keys.push(key));
        expect(keys).toEqual([1, 2, 3, 3, 4, 5]);

        expect(heap.count).toEqual(6);
        expect(heap.remove()).toEqual({ key: 1, value: 'one' });
        expect(heap.remove()).toEqual({ key: 2, value: 'two' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 3, value: 'three' });
        expect(heap.remove()).toEqual({ key: 4, value: 'four' });
        expect(heap.remove()).toEqual({ key: 5, value: 'five' });
    });

    it('should traverse items in the right order (lexicographic max-heap)', () => {
        const heap = new Heap<string>((a, b) => a.localeCompare(b));

        heap.insert('one');
        expect(heap.count).toEqual(1);

        heap.insert('two');
        expect(heap.count).toEqual(2);

        heap.insert('three');
        expect(heap.count).toEqual(3);

        heap.insert('four');
        expect(heap.count).toEqual(4);

        const items = new Array<string>();
        heap.traverse(item => items.push(item));
        expect(items).toEqual(['two', 'three', 'one', 'four']);

        expect(heap.count).toEqual(4);
        expect(heap.remove()).toEqual('two');
        expect(heap.remove()).toEqual('three');
        expect(heap.remove()).toEqual('one');
        expect(heap.remove()).toEqual('four');
    });
});
