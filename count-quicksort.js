const fs = require('fs');

let c = 0;

const partition = (input, start, end) => {
  c += end - start;
  const options = [input[start], input[Math.floor((end + start) / 2)], input[end]];
  options.sort((a, b) => a - b);
  const median = options[1];
  const pivotIndex = input.findIndex(i => i === median);
  console.log(options, median, pivotIndex);
  [input[start], input[pivotIndex]] = [input[pivotIndex], input[start]];
  const pivot = input[start];
  let i = start + 1;
  let j = start + 1;
  while (j <= end) {
    const comp = input[j];
    if (comp < pivot) {
      [input[i], input[j]] = [input[j], input[i]];
      i += 1;
    }
    j += 1;
  }
  [input[i-1], input[start]] = [input[start], input[i-1]]
  return i - 1;
};

const qs = (input, start, end) => {
  if (end - start <= 0) {
    return;
  }
  
  const partitionIndex = partition(input, start, end);
  
  qs(input, start, partitionIndex - 1);
  qs(input, partitionIndex + 1, end);
};

const input1 = [3,8,2,5,1,4,7,6];
const input2 = [6,3,7,2,4,5];

const input = fs.readFileSync('qs-prog-assignment-input.txt').toString().split('\n').filter(e => !!e).map(e => Number(e));

qs(input, 0, input.length - 1);

console.log('inversions ', c);

