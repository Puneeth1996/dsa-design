/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAdjacentDistance = function (nums) {
	if (nums.length < 2) return 0
	let maxDiff = -Infinity
	const n = nums.length
	for (let i = 0; i < n; i++) {
		const nextIndex = (i + 1) % n
		const currentDiff = Math.abs(nums[i] - nums[nextIndex])
		maxDiff = Math.max(maxDiff, currentDiff)
	}
	return maxDiff
}
// Time Complexity: O(n), where n is the length of the input array `nums`.
// Space Complexity: O(1), as we are using a constant amount of space for variables.
