/**
 * A heap element that contains a key (aka
 * priority) and a corresponding value
 */
export type HeapItem<K, V> = {
    /**
     * Item key
     */
    key: K;

    /**
     * Item value
     */
    value: V;
};

/**
 * Heap data structure
 */
export class Heap<K, V> {
    /**
     * Heap items
     */
    private $items: Array<HeapItem<K, V>>;

    /**
     * Current number of items
     */
    private $count: number;

    /**
     * Creates a new instance of heap
     *
     * @param $compare function used to determine the order of the item keys
     * @param items (unordered) array of initial heap items
     */
    public constructor(
        private $compare: (a: K, b: K) => number,
        ...items: Array<HeapItem<K, V>>
    ) {
        this.$items = new Array();
        this.$count = 0;

        items.forEach(({ key, value }) => this.insert(key, value));
    }

    /**
     * Returns the current number of items
     */
    public get count(): number {
        return this.$count;
    }

    /**
     * Inserts a new item into the heap
     *
     * @param key item key
     * @param value item value
     */
    public insert(key: K, value: V): void {
        let j = this.$count;
        while (true) {
            const i = (j - 1) / 2 >> 0;
            if (j == 0 || this.$compare(this.$items[i].key, key) >= 0) {
                this.$items[j] = { key, value };
                this.$count++;
                break;
            } else {
                this.$items[j] = this.$items[i];
                j = i;
            }
        }
    }

    /**
     * Retrieves the item with the largest/smallest
     * key (depending on the comparison function)
     */
    public remove(): HeapItem<K, V> | undefined {
        if (this.$count == 0) return undefined;

        const { $items } = this;
        const result = $items[0];

        if (this.$count > 1) {
            $items[0] = $items[this.$count - 1];
        }

        $items.length = --this.$count;
        if (this.$count < 2) return result;

        let i = 0;
        let j, k: number;
        const c = this.$count;
        while (true) {
            j = 2 * i + 1, k = i;
            if (j < c && this.$compare($items[j].key, $items[k].key) > 0) {
                k = j;
            }

            j++;
            if (j < c && this.$compare($items[j].key, $items[k].key) > 0) {
                k = j;
            }

            if (k == i) break;

            [$items[i], $items[k]] = [$items[k], $items[i]];
            i = k;
        }

        return result;
    }
}
