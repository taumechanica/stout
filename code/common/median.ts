/**
 * Calculates the mean value of an array of numbers
 * (side effect: mutates the input array)
 *
 * @param arr numeric array
 */
export function median(arr: number[]): number {
    if (arr.length === 0) return 0;

    const m = arr.length / 2;
    arr.sort((a, b) => a - b);
    return m % 1 ? arr[m - 0.5] : 0.5 * (arr[m - 1] + arr[m]);
}
