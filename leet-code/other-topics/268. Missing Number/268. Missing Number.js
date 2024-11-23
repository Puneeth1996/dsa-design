/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
	let n = nums.length
	let sum = (n * (n + 1)) / 2
	for (let num of nums) {
		sum -= num
	}
	return sum
}
// Time complexity is O(n) and space complexity is O(1)
