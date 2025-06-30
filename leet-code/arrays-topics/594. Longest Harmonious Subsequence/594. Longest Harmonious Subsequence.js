/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
	const freq = {}
	for (const num of nums) {
		freq[num] = (freq[num] || 0) + 1
	}
	let maxLen = 0
	for (const num of nums) {
		if (num + 1 in freq) maxLen = Math.max(maxLen, freq[num] + freq[num + 1])
	}
	return maxLen
}
// Time Complexity: O(n)
// Space Complexity: O(n)
