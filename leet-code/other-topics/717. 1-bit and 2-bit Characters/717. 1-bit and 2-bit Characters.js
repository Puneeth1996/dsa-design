/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function (bits) {
	let n = bits.length
	let i = 0
	while (i < n - 1) {
		if (bits[i] === 0) i = i + 1
		else i = i + 2
	}
	return i === n - 1
}
// Time Complexity: O(n)
// Space Complexity: O(1)
