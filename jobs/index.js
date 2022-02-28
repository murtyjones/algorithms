const fs = require('fs');

let jobs = fs.readFileSync('jobs.txt')
	.toString()
	.split('\n')
	.slice(1)
	.filter(e => !!e)
	.map(each =>
		each.split(/\s+/).filter(e => !!e).map(e => Number(e))
	);

const getScoreGood = (weight, length) => weight / length;
const getScoreBad = (weight, length) => weight - length;

(() => {
	const withScores =  jobs.map(([weight, length]) => {
		const score = getScoreBad(weight, length);
		return {score, weight, length};
	});
	withScores.sort((a, b) => { 
		if (b.score - a.score !== 0) {
			return b.score - a.score;
		}
		return b.weight - a.weight;
	});
	let runningLength = 0;
	let sumOfWeightedCompletionTimes = 0;
	withScores.forEach(({ weight, length }) => {
		runningLength += length;
		const weightedCompletionTime = runningLength * weight;
		sumOfWeightedCompletionTimes += weightedCompletionTime;
	});
	console.log(sumOfWeightedCompletionTimes);
})();

