/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
	const arrLength = arr.length
	const K = k + 1

	const dp = Array(K).fill(0)

	for (let start = arrLength - 1; start >= 0; start--) {
		let currMax = 0
		const end = Math.min(arrLength, start + k)

		for (let i = start; i < end; i++) {
			currMax = Math.max(currMax, arr[i])
			dp[start % K] = Math.max(
				dp[start % K],
				dp[(i + 1) % K] + currMax * (i - start + 1)
			)
		}
	}
	return dp[0]
}
// Time complexity: O(n∗k)
// Space complexity: O(k)
