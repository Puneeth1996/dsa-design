/**
 * @param {number[]} nums
 * @return {number[]}
 */
var rearrangeArray = function (nums) {
	let ans = new Array(nums.length).fill(0)
	let pos = 0,
		neg = 1

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] > 0) {
			ans[pos] = nums[i]
			pos += 2
		} else {
			ans[neg] = nums[i]
			neg += 2
		}
	}

	return ans
}
// Time complexity: O(n) Space complexity: O(n)
