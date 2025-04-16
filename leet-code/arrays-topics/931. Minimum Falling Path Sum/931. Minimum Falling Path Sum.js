/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
	const size = matrix.length
	let currentSums = new Array(size).fill(0)
	for (const row of matrix) {
		let nextSums = [...currentSums]
		for (let col = 0; col < size; ++col) {
			if (col > 0) {
				nextSums[col] = Math.min(nextSums[col], currentSums[col - 1])
			}
			if (col + 1 < size) {
				nextSums[col] = Math.min(nextSums[col], currentSums[col + 1])
			}
			nextSums[col] += row[col]
		}

		currentSums = nextSums
	}
	return Math.min(...currentSums)
}

// Time complexity O(n^2)
// Space complexity O(n)
