const fs = require('fs');

const countMinCut = (adj) => {
	if (adj.length === 2) {
		return adj[0].length - 1;
	}

	// pick a random node (n1)
	const i = Math.floor(Math.random() * adj.length);
	const n1 = adj[i];
	const n1name = n1[0];

	// find the first neighbor that i
	const n2name = adj[i][1];
	const n2 = adj.find(l => l[0] === n2name);

	// create a new entry for the adj list with n1 + its current neighbors + n2's neighbors. Remove any refs to n1 and n2
	const newEntry = contractNodes(n1, n2);
	// for all of n2's neighbors, change any references to n2 to become n1
	for (let i = 0, l = adj.length; i < l; i++) {
		if (adj[i][0] === n1name || adj[i][0] === n2name) {
			continue;
		}
		if (!n2.slice(1).includes(adj[i][0])) {
			continue;
		}
		adj[i] = adj[i].map(n => {
			if (n === n2name) {
				return n1name;
			}
			return n;
		});
	}
	
	// delete n1 and n2, and add back new adj list entry
	const n1index = adj.findIndex(each => each[0] === n1name);
	const n2index = adj.findIndex(each => each[0] === n2name);
	adj.splice(Math.max(n1index, n2index), 1);
	adj.splice(Math.min(n1index, n2index), 1);
	adj.push(newEntry);

	return countMinCut(adj);
};

const contractNodes = (n1, n2) => {
	const result = [n1[0]];
	n1.slice(1).forEach(each => {
		if (each !== n2[0]) {
			result.push(each);
		}
	});
	n2.slice(1).forEach(each => {
		if (each !== n1[0]) {
			result.push(each);
		}
	});
	return result;
};


const rows = fs.readFileSync('input.txt')
	.toString()
	.split('\n')
	.filter(e => !!e)
	.map(row => {
		const splitted = row.split("	").filter(e => e !== '\r').map(e => Number(e));
		return splitted;
	})
	;

const ex1 = [
	[1, 2, 3],
	[2, 1, 4],
	[3, 1],
	[4, 2]
];

const ex2 = [
	[1, 2, 2, 2],
	[2, 1, 1, 1],
];

let min = -1;

for (let i = 0, l = 100; i < l; i++) {
	const r = countMinCut([...rows]);
	if (r < min || min === -1) {
		min = r;
	}
}

console.log('min cuts across all iterations:', min);
