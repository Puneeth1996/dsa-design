/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
	g.sort((a, b) => a - b)
	s.sort((a, b) => a - b)
	const m = g.length
	const n = s.length
	let i = 0,
		j = 0
	// While both arrays have elements
	while (i < m && j < n) {
		if (g[i] <= s[j]) {
			i++
		}
		j++
	}
	return i
}
// Time Complexity O(n*2) as two arrays needs to be iterated
// space complexity is O(1) no additional space is required
