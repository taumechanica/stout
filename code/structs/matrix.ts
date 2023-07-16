/**
 * Matrix as a two-dimensional array of numbers
 */
export class Matrix extends Array<number> {
    /**
     * Creates a new instance of matrix
     *
     * @param rows number of rows
     * @param cols number of columns
     * @param items matrix items
     */
    public constructor(
        public rows: number,
        public cols: number,
        items: Array<number>
    ) {
        if (rows < 1 || cols < 1) throw new Error(
            `Invalid matrix dimensions ${rows}x${cols}`
        );
        if (items.length !== rows * cols) throw new Error(
            'Matrix size does not match number of items'
        );

        super(...items);
    }

    /**
     * Constructs a new matrix as the product of two matrices
     *
     * @param other right operand of the product
     */
    public multiply(other: Matrix): Matrix {
        if (this.cols !== other.rows) throw new Error(
            'The number of columns of the left matrix should ' +
            'match the number of rows of the right matrix'
        );

        const items = new Array<number>(this.rows * other.cols).fill(0);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < other.cols; j++) {
                for (let k = 0; k < other.rows; k++) {
                    items[i * other.cols + j] += (
                        this[i * this.cols + k] *
                        other[k * other.cols + j]
                    );
                }
            }
        }
        return new Matrix(this.rows, other.cols, items);
    }

    /**
     * Creates a new matrix by transposing the given matrix
     */
    public transpose(): Matrix {
        const items = new Array<number>(this.cols * this.rows);
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                items[i * this.rows + j] = this[j * this.cols + i];
            }
        }
        return new Matrix(this.cols, this.rows, items);
    }

    /**
     * Performs matrix factorization using multiplicative update rules
     *
     * @param ft number of features
     * @param it number of iterations
     * @returns `[w, h]` w - weight matrix, h - feature matrix
     */
    public factorize(ft: number, it: number): [Matrix, Matrix] {
        const w = new Matrix(this.rows, ft, Array.from(
            { length: this.rows * ft }, () => Math.random()
        ));
        const h = new Matrix(ft, this.cols, Array.from(
            { length: ft * this.cols }, () => Math.random()
        ));

        for (let i = 0; i < it; i++) {
            const wf = w.multiply(h);
            const diff = this.diff(wf);
            if (diff === 0.0) break;

            const wt = w.transpose();
            const hn = wt.multiply(this);
            const hd = wt.multiply(w).multiply(h);
            for (let k = 0; k < h.length; k++) h[k] *= hn[k] / hd[k];

            const ht = h.transpose();
            const wn = this.multiply(ht);
            const wd = w.multiply(h).multiply(ht);
            for (let k = 0; k < w.length; k++) w[k] *= wn[k] / wd[k];
        }

        return [w, h];
    }

    /**
     * Calculates the difference between the given and the second matrix
     *
     * @param other second matrix
     */
    private diff(other: Matrix): number {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error('Matrix sizes do not match');
        }

        let result = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const offset = i * this.cols + j;
                result += Math.pow(this[offset] - other[offset], 2);
            }
        }
        return result;
    }
}
