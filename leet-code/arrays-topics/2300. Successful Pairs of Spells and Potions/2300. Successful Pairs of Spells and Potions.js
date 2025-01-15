/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
	potions.sort((a, b) => a - b)
	const potionsLength = potions.length
	const ans = []
	for (const val of spells) {
		let left = 0
		let right = potionsLength
		while (left < right) {
			const mid = (left + right) >> 1
			if (val * potions[mid] >= success) {
				right = mid
			} else {
				left = mid + 1
			}
		}
		ans.push(potionsLength - left)
	}
	return ans
}

// Time Complexity
// Sorting: O(n log n) where n is the number of potions.
// Binary Search: O(s log n).
// time complexity is O(n log n + s log n).

// Space Complexity
// The space complexity is determined by the additional space required beyond the input data.

// Sorting Space: The sorting is done in place, which does not require additional space, so it's O(1).
// Output List: There is a list comprehension that generates a list of the same length as the number of spells. Therefore, it has a space complexity of O(s) where s is the number of spells.
// Given that O(s) is the larger term between O(1) and O(s), the overall space complexity is O(s).
