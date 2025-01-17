/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
	const rows = grid.length
	const cols = grid[0].length
	const directions = [-1, 0, 1, 0, -1]

	const dfs = (row, col) => {
		grid[row][col] = 0

		for (let k = 0; k < 4; ++k) {
			const nextRow = row + directions[k]
			const nextCol = col + directions[k + 1]
			if (
				nextRow >= 0 &&
				nextRow < rows &&
				nextCol >= 0 &&
				nextCol < cols &&
				grid[nextRow][nextCol] === 1
			) {
				dfs(nextRow, nextCol)
			}
		}
	}

	for (let row = 0; row < rows; ++row) {
		for (let col = 0; col < cols; ++col) {
			if (
				grid[row][col] === 1 &&
				(row === 0 || row === rows - 1 || col === 0 || col === cols - 1)
			) {
				dfs(row, col)
			}
		}
	}

	let enclaveCount = 0
	for (const row of grid) {
		for (const cell of row) {
			enclaveCount += cell
		}
	}

	return enclaveCount
}
// Time and space complexity  O(m * n)
