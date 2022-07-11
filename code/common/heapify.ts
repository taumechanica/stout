/**
 * Balances the heap `items` from node `j` up to the root
 *
 * @param items heap to be balanced
 * @param compare function used to determine the order of the items
 * @param j start index
 */
export function heapifyUp<T>(
    items: Array<T>,
    compare: (a: T, b: T) => number,
    j: number
): void {
    let i = (j - 1) / 2 >> 0;
    while (j > 0 && compare(items[i], items[j]) < 0) {
        [items[i], items[j]] = [items[j], items[i]];
        j = i, i = (j - 1) / 2 >> 0;
    }
}

/**
 * Balances the heap `items` from node `i` down to the leaves
 *
 * @param items heap to be balanced
 * @param compare function used to determine the order of the items
 * @param i start index
 * @param n maximum (exclusive) index to be considered
 */
export function heapifyDown<T>(
    items: Array<T>,
    compare: (a: T, b: T) => number,
    i: number, n?: number
): void {
    let j, k: number;
    n = n ?? items.length;
    while (true) {
        j = 2 * i + 1, k = i;
        if (j < n && compare(items[j], items[k]) > 0) k = j;

        j++;
        if (j < n && compare(items[j], items[k]) > 0) k = j;

        if (k === i) break;

        [items[i], items[k]] = [items[k], items[i]];
        i = k;
    }
}
