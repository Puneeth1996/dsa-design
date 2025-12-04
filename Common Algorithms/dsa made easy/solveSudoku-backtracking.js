function solveSudoku(board) {
	console.log('🔵 Starting Sudoku Solver...')
	console.log('Initial Board:')
	console.table(board)

	function isValid(row, col, num) {
		for (let i = 0; i < 9; i++) {
			if (board[row][i] === num) return false // row check
			if (board[i][col] === num) return false // column check

			const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3)
			const boxCol = 3 * Math.floor(col / 3) + (i % 3)

			if (board[boxRow][boxCol] === num) return false // 3x3 box check
		}
		return true
	}

	function backtrack(row, col) {
		// Completed the board → solved
		if (row === 9) {
			console.log('✅ Sudoku solved!')
			return true
		}

		// End of row → move to next row
		if (col === 9) return backtrack(row + 1, 0)

		// Skip already-filled cells
		if (board[row][col] !== '.') return backtrack(row, col + 1)

		// Try digits 1–9
		for (let digit = 1; digit <= 9; digit++) {
			const num = String(digit) // convert to string to match board format

			if (isValid(row, col, num)) {
				console.log(`➡️  Place ${num} at (${row}, ${col})`)
				board[row][col] = num

				if (backtrack(row, col + 1)) return true

				console.log(`↩️  Backtrack from (${row}, ${col}) remove ${num}`)
				board[row][col] = '.'
			}
		}

		// No valid number → backtrack
		return false
	}

	// Start recursion
	backtrack(0, 0)

	console.log('Final Solved Board:')
	console.table(board)
	return board
}

// ----------------------------------------------------
// TEST INPUT
// ----------------------------------------------------

const board = [
	['5', '3', '.', '.', '7', '.', '.', '.', '.'],
	['6', '.', '.', '1', '9', '5', '.', '.', '.'],
	['.', '9', '8', '.', '.', '.', '.', '6', '.'],

	['8', '.', '.', '.', '6', '.', '.', '.', '3'],
	['4', '.', '.', '8', '.', '3', '.', '.', '1'],
	['7', '.', '.', '.', '2', '.', '.', '.', '6'],

	['.', '6', '.', '.', '.', '.', '2', '8', '.'],
	['.', '.', '.', '4', '1', '9', '.', '.', '5'],
	['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]

solveSudoku(board)

// Time complexity: O(9^81) worst-case (backtracking)
// Space complexity: O(81) recursion depth
