/**
 * Strings alignment as an array of
 * deletion/insertion operations
 */
export type Alignment = {
    /**
     * Symbol to be deleted
     */
    del?: string;

    /**
     * Symbol to be inserted
     */
    ins?: string;
}[];

/**
 * Calculates optimal alignment for two strings
 * using the Wagner-Fischer algorithm
 *
 * @param a first string
 * @param b second string
 */
export function align(a: string, b: string): Alignment {
    const n1 = a.length;
    const n2 = b.length;
    const n = (n1 + 1) * (n2 + 1);
    const costs = new Array<number>(n).fill(0);

    for (let i = 1; i <= n1; i++) {
        costs[i * (n2 + 1)] = costs[(i - 1) * (n2 + 1)] + 1;
    }
    for (let j = 1; j <= n2; j++) {
        costs[j] = costs[j - 1] + 1;
    }

    for (let i = 1; i <= n1; i++) {
        for (let j = 1; j <= n2; j++) {
            costs[i * (n2 + 1) + j] = Math.min(
                costs[(i - 1) * (n2 + 1) + j] + 1,
                costs[i * (n2 + 1) + j - 1] + 1,
                costs[(i - 1) * (n2 + 1) + j - 1] + (
                    a[i - 1] === b[j - 1] ? 0 : 2
                )
            );
        }
    }

    let i = n1;
    let j = n2;
    const result: Alignment = [];
    while (i > 0 || j > 0) {
        if (
            i > 0 &&
            costs[i * (n2 + 1) + j] ===
            costs[(i - 1) * (n2 + 1) + j] + 1
        ) {
            result.unshift({ del: a[i - 1] });
            i -= 1;
        } else if (
            j > 0 &&
            costs[i * (n2 + 1) + j] ===
            costs[i * (n2 + 1) + j - 1] + 1
        ) {
            result.unshift({ ins: b[j - 1] });
            j -= 1;
        } else {
            result.unshift({
                del: a[i - 1],
                ins: b[j - 1]
            });
            i -= 1;
            j -= 1;
        }
    }
    return result;
}
