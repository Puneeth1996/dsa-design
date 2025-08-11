/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var productQueries = function (n, queries) {
	const MOD = 1e9 + 7

	// Step 1: Extract powers of 2 from binary representation of n
	let power = 1
	while (power <= n) power <<= 1
	power >>= 1

	const powers = []
	while (n > 0) {
		if (power <= n) {
			powers.push(power)
			n -= power
		}
		power >>= 1
	}

	// Step 2: Build prefix product table
	const len = powers.length
	const prefix = Array.from({length: len}, () => Array(len).fill(1))
	for (let i = 0; i < len; i++) {
		prefix[i][i] = powers[len - 1 - i]
		for (let j = i + 1; j < len; j++) {
			prefix[i][j] = (prefix[i][j - 1] * powers[len - 1 - j]) % MOD
		}
	}

	// Step 3: Process queries
	const res = []
	for (let i = 0; i < queries.length; i++) {
		const [l, r] = queries[i]
		res.push(prefix[l][r])
	}

	return res
}

// Time : O(log n) Space: O(K^2)
