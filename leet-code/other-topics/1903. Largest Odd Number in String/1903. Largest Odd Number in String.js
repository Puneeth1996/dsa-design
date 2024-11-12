/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function (num) {
	const numLength = num.length

	for (let index = numLength - 1; index >= 0; index--) {
		if (parseInt(num.charAt(index)) % 2 === 1) {
			return num.slice(0, index + 1)
		}
	}

	return ''
}
// Time:O(n) Space:O(n)
