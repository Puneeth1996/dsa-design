/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function (nums, k) {
	let prev = 0
	let curr = 1
	for (let i = 0; i < nums.length; i++) {
		if (nums[i - 1] < nums[i]) {
			curr++
		} else {
			prev = curr
			curr = 1
		}
		if ((curr >= k && prev >= k) || curr === k * 2) return true
	}
	return false
}
// Time O(n) and space S(1)
