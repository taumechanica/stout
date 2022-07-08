# Stout

Collection of useful algorithms and data structures in TypeScript.

## Installation

```
npm install --save @taumechanica/stout
```

## Usage

### Heap

Also known as a partially ordered complete binary tree. To create a heap specify 1) key and value types, 2) key comparison function and 3) optional array of initial items:

```ts
import { Heap } from '@taumechanica/stout';

const items = [
    { key: 5, value: 'five' },
    { key: 3, value: 'three' },
    { key: 4, value: 'four' }
];

const heap = new Heap<number, string>((a, b) => a - b, ...items);
```

To insert new items do:

```ts
heap.insert(1, 'one');
heap.insert(2, 'two');
heap.insert(3, 'three');
```

To retrieve all items in the order determined by the comparison function do:

```ts
while (heap.count > 0) {
    console.log(heap.remove());
}
```

The console output will be:

```
{ key: 5, value: 'five' }
{ key: 4, value: 'four' }
{ key: 3, value: 'three' }
{ key: 3, value: 'three' }
{ key: 2, value: 'two' }
{ key: 1, value: 'one' }
```
