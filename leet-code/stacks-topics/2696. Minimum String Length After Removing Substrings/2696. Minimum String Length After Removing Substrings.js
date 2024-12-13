/**
 * @param {string} s
 * @return {number}
 */
var minLength = function (s) {
	const stk = []
	for (const c of s) {
		if (
			(stk.at(-1) === 'A' && c === 'B') ||
			(stk.at(-1) === 'C' && c === 'D')
		) {
			stk.pop()
		} else {
			stk.push(c)
		}
	}
	return stk.length
}
// Time and space complexity are O(n) lenght of the string
