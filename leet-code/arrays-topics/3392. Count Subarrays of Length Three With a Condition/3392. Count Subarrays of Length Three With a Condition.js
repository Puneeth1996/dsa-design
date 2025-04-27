/**
 * @param {number[]} nums
 * @return {number}
 */
var countSubarrays = function (nums) {
	let res = 0
	for (let i = 0; i < nums.length - 2; i++) {
		if ((nums[i] + nums[i + 2]) * 2 === nums[i + 1]) {
			res++
		}
	}
	return res
}
// Time complexity: O(n)
// Space complexity: O(1)
