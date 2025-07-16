/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function (nums) {
	const dp = [
		[0, 0], // dp[even][even], dp[even][odd]
		[0, 0], // dp[odd][even], dp[odd][odd]
	]
	let maxLen = 0

	for (const num of nums) {
		const p = num % 2 // parity: 0 for even, 1 for odd
		for (let prev = 0; prev <= 1; prev++) {
			// If previous was 'prev' and current is 'p'
			dp[p][prev] = dp[prev][p] + 1
			maxLen = Math.max(maxLen, dp[p][prev])
		}
	}

	return maxLen
}

// Time: O(n), single pass
// Space: O(1), fixed 2x2 matrix
