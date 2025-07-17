/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
	let res = 0
	for (let j = 0; j < k; j++) {
		const dp = Array(k).fill(0)

		for (let i = 0; i < nums.length; i++) {
			const mod = nums[i] % k
			const pos = (j - mod + k) % k
			dp[mod] = dp[pos] + 1
		}

		res = Math.max(res, ...dp)
	}

	return res
}
// Time complexity : O(n*k)
// Space complexity : O(k)
