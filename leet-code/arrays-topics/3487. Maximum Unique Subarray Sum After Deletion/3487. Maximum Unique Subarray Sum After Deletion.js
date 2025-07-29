/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
	const max = Math.max(...nums)
	if (max <= 0) return max
	const seen = new Set()
	let sum = 0
	for (const x of nums) {
		if (x >= 0 && !seen.has(x)) {
			seen.add(x)
			sum += x
		}
	}
	return sum
}
// Time and space complexity O(N)
