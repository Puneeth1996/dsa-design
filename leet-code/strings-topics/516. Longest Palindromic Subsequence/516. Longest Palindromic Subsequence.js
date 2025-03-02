/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
	let n = s.length
	// Add one to the cache, we want to compute the previous results
	let dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))
	let reversed = s.split('').reverse().join('')

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= n; j++) {
			if (s[i - 1] == reversed[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
			}
		}
	}
	return dp[n][n]
}
