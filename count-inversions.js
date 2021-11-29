const fs = require('fs');


const sortAndCountInversions = (input) => {
  if (input.length < 2) {
    return [BigInt(0), input];
  }
  const n2 = Math.floor(input.length / 2);
  
  const [countA, a] = sortAndCountInversions(input.slice(0, n2));
  const [countB, b] = sortAndCountInversions(input.slice(n2));
  const [countC, c] = mergeAndCountInversions(a, b);
  
  return [
    countA + countB + countC,
    c
  ];
};

const mergeAndCountInversions = (a, b) => {
  let i = 0
  let j = 0
  const final = [];
  let inversions = BigInt(0);
  while (i < a.length || j < b.length) {
    const left = a[i];
    const right = b[j];
    
    if (left === undefined) {
      final.push(right);
      j += 1;
      continue;
    } else if (right === undefined) {
      final.push(left);
      i += 1;
      continue;
    }
    
    if (left <= right) {
      i += 1;
      final.push(left);
    } else {
      j += 1;
      final.push(right);
      inversions += BigInt(a.length - i);
    }
  }
  
  return [inversions, final];
};

const input = fs.readFileSync('input.txt').toString().split('\n').filter(e => !!e).map(e => Number(e));

console.log(input[input.length-1]);

const r = sortAndCountInversions(input);

console.log('inversions ', r[0]);
console.log('sorted array ', r[1]);

