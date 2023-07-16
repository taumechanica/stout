import { Matrix } from './matrix';

describe('matrix', () => {
    it('should multiply two matrices', () => {
        const a = new Matrix(
            2, 2, [
                1, 4,
                0, 3
            ]
        );
        const b = new Matrix(
            2, 3, [
                0, 3, 0,
                2, 1, 4
            ]
        );
        const c = a.multiply(b);
        expect(c.rows).toEqual(a.rows);
        expect(c.cols).toEqual(b.cols);
        expect(Array.from(c))
            .toMatchObject([
                8, 7, 16,
                6, 3, 12
            ]);
    });

    it('should transpose a matrix', () => {
        const a = new Matrix(
            2, 3, [
                0, 1, 2,
                3, 4, 5
            ]
        );
        const b = a.transpose();
        expect(b.rows).toEqual(a.cols);
        expect(b.cols).toEqual(a.rows);
        expect(Array.from(b))
            .toMatchObject([
                0, 3,
                1, 4,
                2, 5
            ]);
    });

    it('should factorize a matrix', () => {
        const m = new Matrix(2, 2, [
            22, 28,
            49, 64
        ]);
        const [w, h] = m.factorize(3, 100);
        expect(w.rows).toEqual(2);
        expect(w.cols).toEqual(3);
        expect(h.rows).toEqual(3);
        expect(h.cols).toEqual(2);
    });
});
