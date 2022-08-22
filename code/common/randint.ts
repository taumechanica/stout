/**
 * Generates random integer in [min; max]
 *
 * @param min minimum value (inclusive)
 * @param max maximum value (inclusive)
 */
export function randint(min: number, max: number) {
    min = Math.ceil(min), max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
