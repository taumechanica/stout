import { mean } from './mean';

describe('Mean', () => {
    it('should calculate array mean value', () => {
        expect(mean([])).toEqual(0);
        expect(mean([1])).toEqual(1);
        expect(mean([5, 5, 5])).toEqual(5);
        expect(mean([4, 1, 8, 4, 9])).toEqual(5.2);
    });
});
