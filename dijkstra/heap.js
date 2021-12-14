const INPUT_FILE_PATH = 'final.txt';
const { Heap } = require('heap-js');

// outputs adj list in this format:
//
// {
//   from: [ [to, weight], [to, weight] ]
// }
//
// Example:
// {
//  '1': [ [ 2, 10 ] ],
//  '2': [ [ 3, 4 ], [ 1, 2 ] ],
//  '3': [ [ 1, 20 ] ]
// }
const adj = require('fs').readFileSync(INPUT_FILE_PATH)
	.toString()
	.split('\n')
	.filter(e => !!e)
	.reduce((acc, each) => {
		let [from, ...to] = each.split(/\s+/).filter(Boolean);
		let toWithWeights = (to || []).map(t => t.split(',').map(Number));
		acc[from] = toWithWeights;
		return acc;
	}, {});

// heap will store verticies not yet in X (we'll pull vertices out as we go, so this will be maintained automatically)
// when we extract min, that will be the v to add to x
// the key of each vertex will be the min greedy dijsktra score of any edge which has that vertex as its head and whose tail is in x
// for any vertex not in x that doesnt have an eligble edge terminating in it, we think of the key as being +Infinity

// after we pull w from the heap into x:
//    go through all edges emanating from w/
//        if head of edge is not in x:
//             update its key IE rip the head out of x, recompute its key, reinsert it into heap
//                  the new key value is the min of the current greedy dijkstra score and the greedy dijk score of edge from w to v (IE shortest path to w + w->v length)

const dijkstra = (start, adj) => {
	const n = Object.keys(adj).length;
	const visited = new Set();
	const dist = { [start]: 0 };
	visited.add(start);
	const minEdgeFromXToNotX = {
		// [vertex n]: length
	};
	for (let i = 1; i <= n; i++) {
		const edges = adj[i];
		edges.forEach(([to, length]) => {
			// if i not in x or to in x, make entry +Infinity (if no entry already)
			// otherwise, make entry the minimum if its < the current (or current empty)
			const alreadyValidlySet = minEdgeFromXToNotX[to] !== undefined && minEdgeFromXToNotX[to] !== Infinity;
			

			if (!visited.has(i) || visited.has(to)) {
				if (!alreadyValidlySet) {
					minEdgeFromXToNotX[to] = Infinity;
				}
			} else if (minEdgeFromXToNotX[to] === Infinity || minEdgeFromXToNotX[to] === undefined || minEdgeFromXToNotX[to] < length) {
 	                        minEdgeFromXToNotX[to] = length;
                        }
		});
	}
	const customPriorityComparator = (a, b) => a.length - b.length;
	const minHeap = new Heap(customPriorityComparator);
	Object.entries(minEdgeFromXToNotX).forEach(([v, length]) => {
		minHeap.add({ v: Number(v), length })
	});
	while (!minHeap.isEmpty()) {
		const { v, length } = minHeap.pop();
		visited.add(v);
		dist[v] = length;
		const edgesFromV = adj[v];
		edgesFromV.forEach(([to, hehelength]) => {
			if (!visited.has(to)) {
				let n;
				const removed = minHeap.remove({ v: to }, (o, e) => {
					const matches = o.v === e.v;
					if (matches) {
						n = o;
					}
					return matches;
				});
				if (removed) {
					const candidateLength = dist[v] + hehelength;
					const newLength = Math.min(n.length, candidateLength);
					minHeap.add({ v: n.v, length: newLength });
				}
			}
		});
	}
	return dist;
};


const shortestPathDistanceFromStartByNode = dijkstra(1, adj);

let values = [
	shortestPathDistanceFromStartByNode[7],
	shortestPathDistanceFromStartByNode[37],
	shortestPathDistanceFromStartByNode[59],
	shortestPathDistanceFromStartByNode[82],
	shortestPathDistanceFromStartByNode[99],
	shortestPathDistanceFromStartByNode[115],
	shortestPathDistanceFromStartByNode[133],
	shortestPathDistanceFromStartByNode[165],
	shortestPathDistanceFromStartByNode[188],
	shortestPathDistanceFromStartByNode[197],
];

console.log(values.join(','));


// TODO: try it with the trapezoid example given in the dijkstra intro lecture
