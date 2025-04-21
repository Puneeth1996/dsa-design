/**
 * @param {number[]} differences
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var numberOfArrays = function (differences, lower, upper) {
	let x = 0,
		y = 0,
		cur = 0
	for (let d of differences) {
		cur += d
		x = Math.min(x, cur)
		y = Math.max(y, cur)
	}
	return Math.max(0, upper - lower - (y - x) + 1)
}

// Time And Space complexity: O(N)
