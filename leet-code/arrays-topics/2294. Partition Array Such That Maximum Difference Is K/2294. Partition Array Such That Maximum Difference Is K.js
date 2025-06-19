/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function (nums, k) {
	nums.sort((a, b) => a - b)
	let count = 0
	let start = 0
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] - nums[start] > k) {
			count = count + 1
			start = i
		}
	}
	return count + 1
}
// T(n+ logn)
