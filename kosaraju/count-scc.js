const fs = require('fs');

const N = 875714;
const edges = fs.readFileSync('scc-input.txt')
	.toString()
	.split('\n')
	.filter(e => !!e)
	.map(each =>
		each.split(/\s+/).filter(e => !!e).map(e => Number(e))
	);

const reversed = edges.reduce((acc, each) => {
		const [first, second] = each;
		if (!acc[second]) {
			acc[second] = [first];
		} else {
			acc[second].push(first);
		}
		return acc;
	}, {});

// first pass (nodes processed so far)
let t = 0;
// second pass (leader)
let s = null;

let leaders = {};
const f = {};

let c = 0;

let visited = {};

const dfsLoop = async (adj, secondRun = false) => {
	for (let n = N; n > 0; n--) {
		if (!visited[n]) {
			s = n;
			await dfs2(adj, n,  secondRun);
		}
	}
};

const dfs = (adj, n, secondRun) => {
	visited[n] = true;
	const stack = [];
	let next = n;
	while (next) {
		leaders[next] = s;
		const neighbors = adj[next] || [];
		neighbors.forEach(neighbor => {
			if (!visited[neighbor]) {
				visited[neighbor] = true;
				stack.push(neighbor)
			}
		});
		t += 1;
		f[n] = t;
		next = stack.pop();
	}
};

const dfs2 = async (adj, n, secondRun) => {
	visited[n] = true;
	leaders[n] = s;
	for (let neighbor of (adj[n] || [])) {
		if (!visited[neighbor]) {
			await dfs2(adj, neighbor, secondRun);
		}
	}
	t += 1;
	f[n] = t;
};

(async () => {
	await dfsLoop(reversed);
	
	// reset for second pass
	leaders = {};
	visited = {};
	let relabelled = edges.map((each) => {
		const [from, to] = each;
		const newFrom = f[from];
		const newTo = f[to];
		return [newFrom, newTo];
	}, {});
	
	relabelled = relabelled.reduce((acc, each) => {
		const [first, second] = each;
		if (!acc[first]) {
			acc[first] = [second];
		} else {
			acc[first].push(second);
		}
		return acc;
	}, {});

	await dfsLoop(relabelled, true);
	
	let byLeader = Object.entries(leaders).reduce((acc, each) => {
		const [follower, leader] = each;
		if (!acc[leader]) {
			acc[leader] = [follower];
		} else {
			acc[leader].push(follower);
		}
		return acc;
	}, {});
	const SCCs = Object.values(byLeader).sort((a, b) => b.length - a.length);
	const nodesInEachSCC = SCCs.map(e => e.length);
	nodesInEachSCC.sort((a, b) => b - a);
	
	console.log(nodesInEachSCC.slice(0, 5).join(','));
})();

