import { heapifyUp, heapifyDown } from '../common/heapify';

/**
 * Heap data structure
 */
export class Heap<T> {
    /**
     * Heap items
     */
    private items: Array<T>;

    /**
     * Creates a new instance of heap
     *
     * @param compare function used to determine the order of the items
     * @param items (unordered) array of initial heap items
     */
    public constructor(
        private compare: (a: T, b: T) => number,
        ...items: Array<T>
    ) {
        this.items = new Array();
        items.forEach(item => this.insert(item));
    }

    /**
     * Returns the current number of items
     */
    public get count(): number {
        return this.items.length;
    }

    /**
     * Inserts a new item into the heap
     *
     * @param item item to insert
     */
    public insert(item: T): void {
        const j = this.items.length;
        this.items[j] = item;
        heapifyUp(this.items, this.compare, j);
    }

    /**
     * Retrieves the largest/smallest item
     * (depending on the comparison function)
     */
    public remove(): T | undefined {
        const { items } = this;
        if (items.length === 0) {
            return undefined;
        }

        const result = items[0];
        if (items.length > 1) {
            items[0] = items[items.length - 1];
        }

        items.length--;
        if (items.length < 2) {
            return result;
        }

        heapifyDown(items, this.compare, 0);
        return result;
    }

    /**
     * Walks over the heap items in order of their priority
     *
     * @param visit function to be called for each item in the heap
     */
    public traverse(visit: (item: T) => void): void {
        const items = this.items.slice();
        while (items.length > 0) {
            visit(items[0]);

            if (items.length > 1) {
                items[0] = items[items.length - 1];
            }

            items.length--;
            if (items.length > 1) {
                heapifyDown(items, this.compare, 0);
            }
        }
    }
}
