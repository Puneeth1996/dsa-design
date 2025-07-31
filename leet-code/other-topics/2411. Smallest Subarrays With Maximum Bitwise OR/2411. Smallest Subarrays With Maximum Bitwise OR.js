/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallestSubarrays = function (nums) {
	const len = nums.length
	const lastSeen = new Array(30).fill(0)
	const res = new Array(len).fill(1)
	for (let i = len - 1; i >= 0; i--) {
		for (let bit = 0; bit < 30; bit++) {
			if ((nums[i] & (1 << bit)) > 0) lastSeen[bit] = i
			res[i] = Math.max(res[i], lastSeen[bit] - i + 1)
		}
	}
	return res
}
// Time and Space : O(N)
