const INPUT_FILE_PATH = 'final.txt';

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

const n = Math.max(...Object.keys(adj));

const visited = { 1: true };
const shortestPathDistanceFromStartByNode = { 1: 0 };
const w = { 1: [] };

const dijkstra = () => {
	while (Object.keys(visited).length < n) {
		const allEdgesInVWithEdgesNotInV = Object
			.keys(visited)
			.map(n => adj[n].map(e => [Number(n), ...e]))
			.flat()
			.filter(([_, to, __]) => !visited[to])
			;
		let minFound, minD;
		allEdgesInVWithEdgesNotInV.forEach(each => {
			const [from, to, weight] = each;
			const d = shortestPathDistanceFromStartByNode[from] + weight;
			if (minFound === undefined || d < minD) {
				minFound = each;
				minD = d;
			}
		});
		const [from, to, weight] = minFound;
		shortestPathDistanceFromStartByNode[to] = minD;
		visited[to] = true;
	}
};

dijkstra();

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

