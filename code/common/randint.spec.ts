import { randint } from './randint';

describe('RandInt', () => {
    it('should generate random integer', () => {
        for (let i = 0; i < 50; i++) {
            const r = randint(-10, 10);
            expect(r).toBeGreaterThanOrEqual(-10);
            expect(r).toBeLessThanOrEqual(10);
        }
    });
});
