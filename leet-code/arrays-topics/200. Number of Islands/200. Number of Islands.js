/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
	// m is the number of rows in the grid
	const numberOfRows = grid.length
	// n is the number of columns in the grid (assuming the grid is not empty)
	const numberOfColumns = grid[0].length
	// ans will hold the number of islands found
	let numberOfIslands = 0

	// The Depth-First Search function, which marks visited land sections as '0'
	function depthFirstSearch(row, column) {
		// Set the current location to '0' to mark as visited
		grid[row][column] = '0'
		// Array representing the 4 directions (up, right, down, left)
		const directions = [-1, 0, 1, 0, -1]

		// Iterate over each direction
		for (let k = 0; k < 4; ++k) {
			// Calculate the new coordinates based on the current direction
			const newRow = row + directions[k]
			const newColumn = column + directions[k + 1]

			// Check if the new coordinates are within bounds and the cell contains '1'
			if (
				newRow >= 0 &&
				newRow < numberOfRows &&
				newColumn >= 0 &&
				newColumn < numberOfColumns &&
				grid[newRow][newColumn] === '1'
			) {
				// If so, perform DFS on the adjacent cell
				depthFirstSearch(newRow, newColumn)
			}
		}
	}

	// Iterate over every cell in the grid
	for (let row = 0; row < numberOfRows; ++row) {
		for (let column = 0; column < numberOfColumns; ++column) {
			// If the cell contains '1' (land), an island is found
			if (grid[row][column] === '1') {
				// Perform DFS to mark the entire island
				depthFirstSearch(row, column)
				// Increment the island count
				numberOfIslands++
			}
		}
	}

	// Return the total number of islands found
	return numberOfIslands
}
