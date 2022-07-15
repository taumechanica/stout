import { randint } from '../common/randint';

/**
 * Shuffles a section of an array by the Fisher-Yates algorithm
 *
 * @param array array to shuffle
 * @param from start index
 * @param to end index
 */
export function shuffle(array: Array<any>, from?: number, to?: number): void {
    from = from ?? 0, to = to ?? array.length - 1;
    for (let i = from; i < to - 1; i++) {
        const j = randint(i, to);
        [array[i], array[j]] = [array[j], array[i]];
    }
}
