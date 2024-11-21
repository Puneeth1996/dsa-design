/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[][]}
 */
var divideArray = function (nums, k) {
	let n = nums.length
	let result = []
	nums.sort((a, b) => a - b)
	for (let i = 0; i < n; i += 3) {
		if (nums[i + 2] - nums[i] > k) {
			return []
		}
		result.push([nums[i], nums[i + 1], nums[i + 2]])
	}
	return result
}
// Time complexity is o(n)
// space complexity is o(n) as the elements of the array nums are stored by 3 parts
