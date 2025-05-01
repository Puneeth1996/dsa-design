/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
	let count = 0
	for (let i = 0; i < nums.length; i++) {
		if (nums[i].toString().length % 2 == 0) {
			count++
		}
	}
	return count
}
// Time complexity is O(n), where n is the length of the input array nums. This is because we are iterating through each element in the array once.
// Space complexity is O(1), as we are using a constant amount of space to store the count variable, regardless of the size of the input array.
