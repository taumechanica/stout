import { randint } from '../common/randint';

/**
 * Shuffles an array by the Fisher-Yates algorithm
 *
 * @param array array to shuffle
 */
export function shuffle(array: Array<any>): void {
    const up = array.length - 1;
    for (let i = 0; i < up - 1; i++) {
        const j = randint(i, up);
        [array[i], array[j]] = [array[j], array[i]];
    }
}
