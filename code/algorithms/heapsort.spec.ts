import { heapsort } from './heapsort';

describe('HeapSort', () => {
    it('should sort an array (asc) #0', () => {
        const array = [3, 1, 7, 4, 9];
        heapsort(array, (a, b) => a - b);
        expect(array).toEqual([1, 3, 4, 7, 9]);
    });

    it('should sort an array (asc) #1', () => {
        const array = [0, 1, 0, 0, 1, 0];
        heapsort(array, (a, b) => a - b);
        expect(array).toEqual([0, 0, 0, 0, 1, 1]);
    });

    it('should sort an array (asc) #2', () => {
        const array = [3, 3, 3, 1];
        heapsort(array, (a, b) => a - b);
        expect(array).toEqual([1, 3, 3, 3]);
    });

    it('should sort an array (desc) #0', () => {
        const array = [3, 1, 7, 4, 9];
        heapsort(array, (a, b) => b - a);
        expect(array).toEqual([9, 7, 4, 3, 1]);
    });

    it('should sort an array (desc) #1', () => {
        const array = [0, 1, 0, 0, 1, 0];
        heapsort(array, (a, b) => b - a);
        expect(array).toEqual([1, 1, 0, 0, 0, 0]);
    });

    it('should sort an array (desc) #2', () => {
        const array = [3, 3, 3, 1];
        heapsort(array, (a, b) => b - a);
        expect(array).toEqual([3, 3, 3, 1]);
    });

    it('should be tolerant to empty arrays', () => {
        const array = new Array<number>();
        heapsort(array, (a, b) => a - b);
        expect(array).toEqual([]);
    });

    it('should be tolerant to one-item arrays', () => {
        const array = [1];
        heapsort(array, (a, b) => a - b);
        expect(array).toEqual([1]);
    });
});
