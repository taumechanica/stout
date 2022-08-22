import { median } from './median';

describe('Median', () => {
    it('should calculate array median value', () => {
        expect(median([])).toEqual(0);
        expect(median([1])).toEqual(1);
        expect(median([5, 5, 5])).toEqual(5);
        expect(median([7, 1, 9, 3, 6, 8, 3])).toEqual(6);
        expect(median([4, 1, 9, 6, 3, 2, 5, 8])).toEqual(4.5);
    });
});
