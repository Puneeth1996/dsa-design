/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
	let res = 0

	for (let n of nums) {
		if ((n > 9 && n < 100) || (n > 999 && n < 10000) || n === 100000) {
			res++
		}
	}

	return res
}
// Time complexity: O(n) Space complexity: O(1)
// The time complexity is O(n) because we are iterating through the array once, and the space complexity is O(1) because we are using a constant amount of space for the variable res.
// The function iterates through the input array nums, checking if each number has an even number of digits.
// It does this by checking if the number is between 10 and 99 (2 digits), between 1000 and 9999 (4 digits), or equal to 100000 (6 digits). If any of these conditions are met, it increments the res variable. Finally, it returns the count of numbers with an even number of digits.
// The function is efficient and works well for the given problem constraints. It correctly counts the numbers with an even number of digits in the input array nums.
