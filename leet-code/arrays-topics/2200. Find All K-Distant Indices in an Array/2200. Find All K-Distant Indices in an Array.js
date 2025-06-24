/**
 * @param {number[]} nums
 * @param {number} key
 * @param {number} k
 * @return {number[]}
 */
var findKDistantIndices = function (nums, key, k) {
	const result = new Set()

	for (let j = 0; j < nums.length; j++) {
		if (nums[j] === key) {
			let start = Math.max(0, j - k)
			let end = Math.min(nums.length - 1, j + k)
			for (let i = start; i <= end; i++) {
				result.add(i)
			}
		}
	}

	return Array.from(result).sort((a, b) => a - b)
}
// Time Complexity: O(n * k) in worst case if all elements are key, but practically its efficient since it limits range.
// Space Complexity: O(n) for the Set and result array.
