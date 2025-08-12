/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
function numberOfWays(n, x) {
	const MOD = 1_000_000_007

	// precompute powers k^x <= n
	const powers = []
	for (let k = 1; ; k++) {
		const p = k ** x
		if (p > n) break
		powers.push(p)
	}

	// dp[s] = #ways to make sum s using each power at most once
	const dp = new Array(n + 1).fill(0)
	dp[0] = 1

	for (const p of powers) {
		for (let s = n; s >= p; s--) {
			dp[s] = (dp[s] + dp[s - p]) % MOD
		}
	}

	return dp[n]
}

// Time : O(n * m) — for each of m powers, we update n states once
// Space: O(n) — the 1D dp array
