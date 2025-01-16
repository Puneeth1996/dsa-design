/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
	const rowCount = grid.length
	const colCount = grid[0].length
	const directions = [-1, 0, 1, 0, -1]
	const depthFirstSearch = (row, col) => {
		let isClosed =
			row > 0 && col > 0 && row < rowCount - 1 && col < colCount - 1 ? 1 : 0
		grid[row][col] = 1
		for (let k = 0; k < 4; ++k) {
			const newRow = row + directions[k]
			const newCol = col + directions[k + 1]
			if (
				newRow >= 0 &&
				newCol >= 0 &&
				newRow < rowCount &&
				newCol < colCount &&
				grid[newRow][newCol] === 0
			) {
				isClosed &= depthFirstSearch(newRow, newCol)
			}
		}
		return isClosed
	}
	let closedIslandsCount = 0
	for (let row = 0; row < rowCount; ++row) {
		for (let col = 0; col < colCount; col++) {
			if (grid[row][col] === 0) {
				closedIslandsCount += depthFirstSearch(row, col)
			}
		}
	}
	return closedIslandsCount
}

// The time & space complexity of the code is O(m * n)
