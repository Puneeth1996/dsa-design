/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

// m x n matrixs
// Time Complexity O(logm + logn) => o(logmn)
// Space Complexity S(1)

// Solution Logic
// Find the relavant row with middle row calculation
// Once the middle row is obtrained find the target value using binary seach on the row
var searchMatrix = function (matrix, target) {
	const columns = matrix[0].length
	const rows = matrix.length
	//binary search to identiy the row
	let top = 0
	let bottom = rows - 1
	let middle
	while (top <= bottom) {
		middle = Math.floor((top + bottom) / 2)
		if (target < matrix[middle][0]) bottom = middle - 1
		else if (target > matrix[middle][columns - 1]) top = middle + 1
		else break
	}
	if (top > bottom) return false
	let left = 0
	let right = columns - 1
	let midValue
	while (left <= right) {
		midValue = Math.floor((left + right) / 2)
		if (target === matrix[middle][midValue]) return true
		else if (target < matrix[middle][midValue]) right = midValue - 1
		else left = midValue + 1
	}
	return false
}
