const INPUT_FILE_PATH = 'final.txt';

const adj = require('fs').readFileSync(INPUT_FILE_PATH)
	.toString()
	.split('\n')
	.filter(e => !!e)
	.map(Number)
	.sort((a, b) =>  a - b);


const twosum = (from, to, input) => {
	const sorted = input.sort((a, b) => a - b);
	const table = new Set();
	sorted.forEach(e => {
		table.add(e);
	});
	let foundMatches = 0;
	for (let i = from; i <= to; i++) {
		if (i % 10 === 0) {
			console.log(`${i}:`, foundMatches);
		}
		for (let j = 0, l = sorted.length; j < l; j++ ) {
			const base = sorted[j];
			const requiredPartner = i - base;
			if (base === requiredPartner) { continue; }
			if (table.has(requiredPartner)) {
				foundMatches += 1;
				break;
			}
		}
	}
	return foundMatches;
};

const one = [-3,-1,1,2,9,11,7,6,2];

// -3 and 11
// 1 and 7
// 2 and 6
// -1 and 9

const two = [-2, 0, 0, 4];

const twosum2 = (from, to, input) => {
	const sorted = input.sort((a, b) => a - b);
	// console.log(sorted);
	let i = 0;
	let j = sorted.length - 1;
	let count = 0;
	const found = new Set();
	while (i < j) {
		const a = sorted[i];
		const b = sorted[j];
		// console.log(a, b);
		// console.log(a, b, a + b, a + b > to, a + b < from, a, b, to, from);
		if (a === b) {
			i += 1;
			continue;
		}
		if (a + b > to) {
			j -= 1;
			continue;
		} else if (a + b < from) {
			i += 1;
			continue;
		}
		let hm = i;
		while (hm < j) {
			const newA = sorted[hm];

			if (!found.has(newA + b) && newA + b >= from && newA + b <= to) {
				// console.log('hit ', newA, b);
				count += 1;
				found.add(newA + b);
			}
			hm += 1;
		}
		j -= 1;
		console.log(j);
	}
	return count;
};

const r = twosum(-10000, 10000, adj);

console.log(r);




