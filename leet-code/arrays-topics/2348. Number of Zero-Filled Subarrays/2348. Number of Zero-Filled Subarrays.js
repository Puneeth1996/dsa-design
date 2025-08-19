/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
	let ans = 0,
		numSub = 0
	for (const num of nums) {
		if (num === 0) {
			numSub++
		} else {
			numSub = 0
		}
		ans += numSub
	}
	return ans
}
// Time and Space Complexity O(n), where n is the length of the input list nums
