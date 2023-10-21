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

Console output will be:

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

Console output will be:

```
{ key: 5, value: 'five' }
{ key: 4, value: 'four' }
{ key: 3, value: 'three' }
{ key: 3, value: 'three' }
{ key: 2, value: 'two' }
{ key: 1, value: 'one' }
```

**Matrix**

To create a matrix specify the dimensions (number of rows and columns) and initial items:

```ts
import { Matrix } from '@taumechanica/stout';

const m = new Matrix(2, 4, [
    1, 2, 3, 4,
    5, 6, 7, 8
]);
```

To multiply two matrices do:

```ts
const a = new Matrix(
    2, 2, [
        1, 4,
        0, 3
    ]
);
const b = new Matrix(
    2, 3, [
        0, 3, 0,
        2, 1, 4
    ]
);
const c = a.multiply(b);
```

Note that the number of columns of the left matrix should match the number of rows of the right matrix. The resulting matrix `c` will be:

```
[
    8, 7, 16,
    6, 3, 12
]
```

To transpose a matrix do:

```ts
const a = new Matrix(
    2, 3, [
        0, 1, 2,
        3, 4, 5
    ]
);
const b = a.transpose();
```

The resulting matrix `b` will be:

```
[
    0, 3,
    1, 4,
    2, 5
]
```

To factorize a non-negative matrix into two matrices known as weight matrix `w` and feature matrix `h` using multiplicative update rules, specify the number of features you need and the number of iterations:

```ts
const m = new Matrix(2, 2, [
    22, 28,
    49, 64
]);
const [w, h] = m.factorize(3, 100);
```

If we now multiply the matrices `w` and `h` we get a matrix close to the original.

### Algorithms

**Alignment**

Calculates optimal alignment for two strings as an array of deletion/insertion operations using the Wagner-Fischer algorithm. To find an alignment do:

```ts
import { align } from '@taumechanica/stout';

const alignment = align('rests', 'stress');

alignment.forEach(({ del }) => {
    process.stdout.write(del ?? ' ');
});
process.stdout.write('\n');

alignment.forEach(({ ins }) => {
    process.stdout.write(ins ?? ' ');
});
process.stdout.write('\n');
```

Console output will be:

```
  rests
stres s
```

**HeapSort**

Sorts an array in time not exceeding *2Nlog<sub>2</sub>N*.

To sort an array do:

```ts
import { heapsort } from '@taumechanica/stout';

const array = [3, 1, 7, 4, 9];
heapsort(array, (a, b) => a - b);
console.log(array);
```

Console output will be:

```
[1, 3, 4, 7, 9]
```

**Shuffle**

Shuffles an array by the Fisher-Yates algorithm.

To shuffle the array do:

```ts
import { shuffle } from '@taumechanica/stout';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
shuffle(array);
```

### Utilities

**Mean value**

To calculate the mean value of an array of numbers do:

```ts
import { mean } from '@taumechanica/stout';

console.log(mean([4, 1, 8, 4, 9]));
```

Console output will be:

```
5.2
```

**Median value**

To calculate the median value of an array of numbers do:

```ts
import { median } from '@taumechanica/stout';

console.log(median([4, 1, 9, 6, 3, 2, 5, 8]));
```

Console output will be:

```
4.5
```

**Random integer**

To generate random integer in `[min; max]` do:

```ts
import { randint } from '@taumechanica/stout';

const r = randint(-10, 10);
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
