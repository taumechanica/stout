/**
 * Calculates the mean value of an array of numbers
 *
 * @param arr numeric array
 */
export function mean(arr: number[]): number {
    for (
        var sum = 0, i = 0, n = arr.length;
        i < n; sum += arr[i++]
    );
    return n > 0 ? sum / n : 0;
}
