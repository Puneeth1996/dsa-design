/**
 * @param {string} s
 * @return {number}
 */
var maxDifference = function (s) {
	const freq = new Map()

	// Count character frequencies
	for (const char of s) {
		freq.set(char, (freq.get(char) || 0) + 1)
	}

	let maxOdd = 0
	let minEven = Infinity

	for (const count of freq.values()) {
		if (count % 2 === 1) {
			maxOdd = Math.max(maxOdd, count)
		} else {
			minEven = Math.min(minEven, count)
		}
	}

	return maxOdd - minEven
}
// Time: O(n), where n = length of string.

// Space: O(1), since max 26 letters (constant space).
