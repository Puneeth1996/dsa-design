/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
	const n = board.length
	const visited = new Set()
	const queue = [[1, 0]]
	function getCoordinates(square) {
		const rowFromBottom = Math.floor((square - 1) / n)
		const colFromLeft = (square - 1) % n
		const row = n - 1 - rowFromBottom
		const col = rowFromBottom % 2 === 0 ? colFromLeft : n - 1 - colFromLeft
		return [row, col]
	}
	while (queue.length > 0) {
		const [square, moves] = queue.shift()
		if (square === n * n) return moves
		for (let i = 1; i <= 6; i++) {
			let nextSquare = square + i
			if (nextSquare > n * n) continue

			const [r, c] = getCoordinates(nextSquare)
			if (board[r][c] !== -1) {
				nextSquare = board[r][c]
			}
			if (!visited.has(nextSquare)) {
				visited.add(nextSquare)
				queue.push([nextSquare, moves + 1])
			}
		}
	}
	return -1
}

// Time and space O(n^2)
