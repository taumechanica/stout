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
     * @param compare function used to determine the order of the item keys
     * @param items (unordered) array of initial heap items
     */
    public constructor(
        private compare: (a: K, b: K) => number,
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
        let j = this.$count + 1;
        while (true) {
            const i = (j / 2) >> 0;
            if (i == 0 || this.compare(this.$items[i - 1].key, key) > 0) {
                this.$items[j - 1] = { key, value };
                this.$count++;
                break;
            } else {
                this.$items[j - 1] = this.$items[i - 1];
                j = i;
            }
        }
    }

    /**
     * Retrieves the item with the largest/smallest
     * key (depending on the compare function)
     */
    public remove(): HeapItem<K, V> {
        const result = this.$items[0];

        let i: number, j = 1;
        const r = this.$count - 1;
        while (true) {
            i = j;
            j *= 2;

            if (j > r) break;
            if (j != r && this.compare(this.$items[j - 1].key, this.$items[j].key) <= 0) j++;
            if (this.compare(this.$items[r].key, this.$items[j - 1].key) > 0) break;

            this.$items[i - 1] = this.$items[j - 1];
        }

        this.$items[i - 1] = this.$items[r];
        this.$count--;

        return result;
    }
}
