/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
	const m = matrix.length
	if (m === 0) return 0
	const n = matrix[0].length
	let total = 0

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (matrix[i][j] === 1 && i > 0 && j > 0) {
				matrix[i][j] =
					1 +
					Math.min(
						matrix[i - 1][j],
						matrix[i][j - 1],
						matrix[i - 1][j - 1]
					)
			}
			total += matrix[i][j]
		}
	}
	return total
}

// Time: O(m·n): every cell is visited once.
// Space: O(1) extra (we overwrite in place).
