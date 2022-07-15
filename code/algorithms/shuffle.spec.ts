import { shuffle } from './shuffle';

describe('Shuffle', () => {
    it('should shuffle an array', () => {
        const a = Array.from(Array(27).keys());
        const b = a.slice();
        shuffle(a);
        expect(a.length).toEqual(b.length);
        expect(a.reduce((acc, val, idx) => acc + Math.abs(val - b[idx]), 0)).toBeGreaterThan(0);

        a.sort((a, b) => a - b);
        expect(a.reduce((acc, val, idx) => acc + Math.abs(val - b[idx]), 0)).toEqual(0);
    });

    it('should shuffle a section of an array', () => {
        const a = Array.from(Array(27).keys());
        const b = a.slice();
        shuffle(a, 9, 17);
        expect(a.length).toEqual(b.length);
        expect(a.reduce((acc, val, idx) => acc + (idx < 9 || idx >= 18 ? Math.abs(val - b[idx]) : 0), 0)).toEqual(0);
        expect(a.reduce((acc, val, idx) => acc + (idx >= 9 && idx < 18 ? Math.abs(val - b[idx]) : 0), 0)).toBeGreaterThan(0);

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
