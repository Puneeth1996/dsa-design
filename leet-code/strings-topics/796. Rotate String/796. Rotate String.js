/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
function rotate(str) {
	return str.substring(1) + str[0]
}
var rotateString = function (s, goal) {
	if (s.length !== goal.length) {
		return false
	}

	for (let count = 1; count <= s.length; count++) {
		s = rotate(s)
		if (s === goal) return true
	}
	return false
}
// Time and space complexity are O(n)
// rotateString("abcde", "cdeab")
