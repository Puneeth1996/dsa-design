/**
 * @param {string} word
 * @return {boolean}
 */
var isValid = function (word) {
	if (word.length < 3) return false

	const vowelsSet = new Set('aeiouAEIOU'.split(''))
	let v = 0,
		c = 0

	for (const ch of word) {
		if (/\d/.test(ch)) continue
		if (/[a-zA-Z]/.test(ch)) {
			vowelsSet.has(ch) ? ++v : ++c
		} else {
			return false
		}
	}
	return v > 0 && c > 0
}
// Time	O(n)	Single pass over n characters.
// Space	O(1)	Only constant counters and the fixed vowel set.
