const { Heap } = require('heap-js');
const INPUT_FILE_PATH = 'final.txt';

const adj = require('fs').readFileSync(INPUT_FILE_PATH)
	.toString()
	.split('\n')
	.filter(e => !!e)
	.map(Number);


const medMaintenance = (adj) => {
	const minHeap = new Heap();
	const maxHeap = new Heap(Heap.maxComparator);

	// Seed the heaps
	const smaller = Math.min(adj[0], adj[1]);
	const larger = Math.max(adj[0], adj[1]);

	minHeap.add(larger);
	maxHeap.add(smaller);

	const medians = [adj[0], smaller];

	adj.slice(2).forEach((e, i) => {
		const smallerMiddleElement = maxHeap.peek();
		const largerMiddleElement = minHeap.peek();

		if (minHeap.length === maxHeap.length) {
			if (e >= largerMiddleElement) {
				minHeap.add(e);
			} else {
				maxHeap.add(e);
			}
		} else if (minHeap.length > maxHeap.length) {
			if (e >= largerMiddleElement) {
				maxHeap.add(minHeap.pop());
                                minHeap.add(e);
                        } else {
                                maxHeap.add(e);
                        }
		} else if (maxHeap.length > minHeap.length) {
	                    if (e >= largerMiddleElement) {
                                    minHeap.add(e);
                           } else {
				    minHeap.add(maxHeap.pop());
                                   maxHeap.add(e);
                           }
		}

		if (minHeap.peek() < maxHeap.peek()) {
			const m1 = maxHeap.pop();
			const m2 = minHeap.pop();
			maxHeap.add(m2);
			minHeap.add(m1);
		}

		let median;
		if (minHeap.length > maxHeap.length) {
			median = minHeap.peek();
		} else if (maxHeap.length >= minHeap.length) {
			median = maxHeap.peek();
		}
		medians.push(median);
	});

	const sum = medians.reduce((acc, each) => {
		acc += each;
		return acc;
	}, 0);

	return sum % 10000;
};


const r = medMaintenance(adj);

console.log(r);
