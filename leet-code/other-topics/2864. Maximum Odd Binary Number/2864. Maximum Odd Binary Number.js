/**
 * @param {string} s
 * @return {string}
 */
var maximumOddBinaryNumber = function (s) {
	const cnt = s.length - s.replace(/1/g, '').length
	return '1'.repeat(cnt - 1) + '0'.repeat(s.length - cnt) + '1'
}

// Time and space complexity is O(1) ans S(1)
