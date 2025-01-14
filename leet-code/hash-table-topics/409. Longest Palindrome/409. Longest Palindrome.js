/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
	const cnt = {}
	for (const c of s) {
		cnt[c] = (cnt[c] || 0) + 1
	}
	let ans = Object.values(cnt).reduce(
		(acc, v) => acc + Math.floor(v / 2) * 2,
		0
	)
	ans += ans < s.length ? 1 : 0
	return ans
}
