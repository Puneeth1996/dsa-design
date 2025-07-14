/**
 * @param {number} n
 * @param {number} firstPlayer
 * @param {number} secondPlayer
 * @return {number[]}
 */
var earliestAndLatest = function (n, firstPlayer, secondPlayer) {
	const memo = new Map() // key="l,r,k"

	function dp(l, r, k) {
		if (l === r) return [1, 1]
		if (l > r) return dp(r, l, k)

		const key = `${l},${r},${k}`
		if (memo.has(key)) return memo.get(key)

		let earliest = Infinity,
			latest = -Infinity
		const half = Math.floor((k + 1) / 2)
		for (let i = 1; i <= l; i++) {
			for (let j = l - i + 1; j <= r - i; j++) {
				const sum = i + j
				if (sum < l + r - Math.floor(k / 2) || sum > half) continue

				const [subEar, subLat] = dp(i, j, half)
				earliest = Math.min(earliest, subEar + 1)
				latest = Math.max(latest, subLat + 1)
			}
		}

		const ans = [earliest, latest]
		memo.set(key, ans)
		return ans
	}

	return dp(firstPlayer, n - secondPlayer + 1, n)
}

// Time Complexity: Roughly 𝑂 ( 𝑛 4 ) O(n 4 ) in the worst case due to three nested parameters and double loops — but memoization prunes much of this.
// Space Complexity: 𝑂 ( 𝑛 3 ) O(n 3 ) for memoization storage.
