import { shuffle } from './shuffle';

describe('shuffle', () => {
    it('should shuffle an array', () => {
        const a = Array.from(Array(27).keys());
        const b = a.slice();
        shuffle(a);
        expect(a.length).toEqual(b.length);
        expect(a.reduce((acc, val, idx) => acc + Math.abs(val - b[idx]), 0)).toBeGreaterThan(0);

        a.sort((a, b) => a - b);
        expect(a.reduce((acc, val, idx) => acc + Math.abs(val - b[idx]), 0)).toEqual(0);
    });

    it('should be tolerant to empty arrays', () => {
        const array = new Array<number>();
        shuffle(array);
        expect(array).toEqual([]);
    });

    it('should be tolerant to one-item arrays', () => {
        const array = [1];
        shuffle(array);
        expect(array).toEqual([1]);
    });
});
