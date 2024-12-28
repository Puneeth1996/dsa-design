/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */

function gcd(a, b) {
	while (b !== 0) {
		let t = b
		b = a % b
		a = t
	}
	return a
}
var gcdOfStrings = function (str1, str2) {
	if (str1 + str2 !== str2 + str1) {
		return ''
	}
	const gcdValue = gcd(str1.length, str2.length)
	return str1.substring(0, gcdValue)
}
