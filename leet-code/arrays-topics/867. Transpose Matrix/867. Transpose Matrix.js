/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
	const rowCount = matrix.length
	const columnCount = matrix[0].length

	const transposedMatrix = new Array(columnCount)
		.fill(0)
		.map(() => new Array(rowCount).fill(0))

	for (let i = 0; i < columnCount; ++i) {
		for (let j = 0; j < rowCount; ++j) {
			transposedMatrix[i][j] = matrix[j][i]
		}
	}

	return transposedMatrix
}

// This problem requires memory allocation
// as the transpose of n x m matrix connot be done inplace
// Time and SPace complexity are O(n x m)
