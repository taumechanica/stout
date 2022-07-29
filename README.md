# Stout

Collection of useful data structures and algorithms in TypeScript.


## Installation

```
npm i --save @taumechanica/stout
```


## Usage

### Structures

**Heap**

Also known as priority queue. This implementation is based on a complete binary tree. Insertion time complexity does not exceed *log<sub>2</sub>N*, and removing time complexity does not exceed *2log<sub>2</sub>N*.

To create a heap specify 1) item type, 2) item comparison function and 3) optional array of initial items:

```ts
import { Heap } from '@taumechanica/stout';

type HeapItem = {
    key: number;
    value: string;
};

const items = new Array<HeapItem>(
    { key: 5, value: 'five' },
    { key: 3, value: 'three' },
    { key: 4, value: 'four' }
);

const heap = new Heap<HeapItem>((a, b) => a.key - b.key, ...items);
```

To insert new items do:

```ts
heap.insert({ key: 1, value: 'one' });
heap.insert({ key: 2, value: 'two' });
heap.insert({ key: 3, value: 'three' });
```

To iterate over the heap items in the order determined by the comparison function do:

```ts
heap.traverse(({ key }) => console.log(key));
```

The console output will be:

```
5
4
3
3
2
1
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

### Algorithms

**HeapSort**

Sorts an array in time not exceeding *2Nlog<sub>2</sub>N*.

To sort an array do:

```ts
import { heapsort } from '@taumechanica/stout';

const array = [3, 1, 7, 4, 9];
heapsort(array, (a, b) => a - b);
console.log(array);
```

The console output will be:

```
[1, 3, 4, 7, 9]
```

**Shuffle**

Shuffles a section of an array by the Fisher-Yates algorithm.

To shuffle the entire array do:

```ts
import { shuffle } from '@taumechanica/stout';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
shuffle(array);
```

To shuffle a section specify the start and end indices within the array:

```ts
shuffle(array, 3, 5);
```


## Development

### Cloning

```
git clone https://github.com/taumechanica/stout && cd stout && npm i
```

### Building

```
npm run build
```

### Testing

```
npm run test
```

### Inspiration

[Generic binary heap in TypeScript](https://dev.to/taumechanica/generic-binary-heap-in-typescript-ilc)
