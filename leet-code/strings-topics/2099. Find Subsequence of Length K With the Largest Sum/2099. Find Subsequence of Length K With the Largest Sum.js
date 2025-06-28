/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSubsequence = function (nums, k) {
	let numsIdx = nums.map((num, idx) => [num, idx])
	numsIdx.sort((a, b) => b[0] - a[0])
	let topK = numsIdx.slice(0, k).sort((a, b) => a[1] - b[1])
	return topK.map((itm) => itm[0])
}

// Time Cmplexity: O(n log n) for sorting
// Space Complexity: O(n) for storing indices
