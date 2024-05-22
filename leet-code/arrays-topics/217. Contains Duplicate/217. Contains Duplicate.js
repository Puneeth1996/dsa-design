/**
 * @param {number[]} nums
 * @return {boolean}
 */

// this is a basic approach
// O(n) is time and space complexity
// var containsDuplicate = function (nums) {
// 	const map = new Map()
// 	for (const n of nums) {
// 		if (maps.has(n)) return true
// 		maps.set(n, true)
// 	}
// 	return false
// }

// Efficient solution
// Time Complexity O(1) and space complexity O(n)
var containsDuplicate = function (nums) {
	const set = new Set(nums)
	return set.size !== nums.length
}
