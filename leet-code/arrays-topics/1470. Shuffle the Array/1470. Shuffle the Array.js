/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
	const ans = []
	for (let i = 0; i < n; ++i) {
		ans.push(nums[i], nums[i + n])
	}
	return ans
}
// Time and space complexity O(n) number
