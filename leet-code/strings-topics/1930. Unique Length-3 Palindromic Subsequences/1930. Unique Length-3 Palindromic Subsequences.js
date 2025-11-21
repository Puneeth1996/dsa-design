/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
	const charIdx = new Map()
	for (let i = 0; i < s.length; i++) {
		if (!charIdx.has(s[i])) {
			charIdx.set(s[i], [])
		}
		charIdx.get(s[i]).push(i)
	}
	let count = 0
	for (const [char, idx] of charIdx) {
		const start = idx[0]
		const end = idx[idx.length - 1]
		if (end - start <= 1) {
			continue
		}
		const seen = new Set()
		for (let i = start + 1; i < end; i++) {
			seen.add(s[i])
		}
		count += seen.size
	}
	return count
}
// Time = O(n)
// Space  = O(n)
