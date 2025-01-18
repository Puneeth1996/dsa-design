/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
	let totalSubarrays = 0
	let currentZerosCount = 0
	for (const value of nums) {
		if (value === 0) {
			currentZerosCount++
		} else {
			currentZerosCount = 0
		}
		totalSubarrays += currentZerosCount
	}
	return totalSubarrays
}
// Time and Space Complexity O(n), where n is the length of the input list nums
