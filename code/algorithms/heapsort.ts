import { heapifyDown } from '../common/heapify';

/**
 * Sorts an `array` using the heapsort algorithm
 *
 * @param array array to be sorted
 * @param compare function used to determine the order of the items
 */
export function heapsort<T>(
    array: Array<T>,
    compare: (a: T, b: T) => number
): void {
    let n = array.length;
    for (let i = (n / 2 >> 0) - 1; i >= 0; i--) {
        heapifyDown(array, compare, i, n);
    }
    while (n > 1) {
        [array[0], array[n - 1]] = [array[n - 1], array[0]];
        heapifyDown(array, compare, 0, --n);
    }
}
