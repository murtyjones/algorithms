const fs = require('fs');

let [nodeCount, edgeCount] = fs.readFileSync('input.txt')
	.toString()
	.split('\n')
	.filter(e => !!e)
	.slice(0, 1)
	.map(each =>
		each.split(/\s+/).filter(e => !!e).map(e => Number(e))
	)[0];

let edges = fs.readFileSync('input.txt')
	.toString()
	.split('\n')
	.slice(1)
	.filter(e => !!e)
	.map(each =>
		each.split(/\s+/).filter(e => !!e).map(e => Number(e))
	)
	.map(([from, to, weight]) => ({ from, to, weight }));

(() => {
	const X = new Set();
	X.add(edges[0].from);
	const Y = new Set();
	while (X.size !== nodeCount) {
		let minimumCost = Number.MAX_SAFE_INTEGER;
		let minimumCostEdge = null;
		let minimumCostTo = null;
		edges.forEach((edge) => {
			const { from, to, weight } = edge;
			if (Y.has(edge)) {
				return;
			}
			if (minimumCost <= weight) {
				return;
			}
			if (!X.has(from) && !X.has(to)) {
				return;
			}
			if (X.has(to) && X.has(from)) {
				return;
			}
			if (X.has(to)) {
				minimumCostTo = from;
			} else {
				minimumCostTo = to;
			}
			minimumCostEdge = edge;
			minimumCost = weight;
		});
		X.add(minimumCostTo);
		Y.add(minimumCostEdge);
	}
	const cost = Array.from(Y.keys()).reduce((acc, each) => {
		acc += each.weight;
		return acc;
	}, 0);
	console.log(cost);
})();


