/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
	const n = s.length
	if (n < k) {
		return 0
	}
	const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
	let maxVC = 0
	let currVC = 0

	for (let i = 0; i < k; i++) {
		if (vowels.has(s[i])) {
			currVC++
		}
	}
	maxVC = currVC

	for (let i = k; i < n; i++) {
		if (vowels.has(s[i - k])) {
			currVC--
		}
		if (vowels.has(s[i])) {
			currVC++
		}
		maxVC = Math.max(maxVC, currVC)
	}

	return maxVC
}

// Time complexity = O(n)
// Space complexity = S(1)
