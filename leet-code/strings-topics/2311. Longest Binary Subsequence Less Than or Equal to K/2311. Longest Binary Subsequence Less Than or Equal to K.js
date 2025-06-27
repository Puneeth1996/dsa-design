/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubsequence = function (s, k) {
	let n = s.length
	let count = 0
	let value = 0
	let power = 1

	for (let i = n - 1; i >= 0; i--) {
		const bit = s[i]

		if (bit === '0') {
			count++ // 0s always safe to include
		} else {
			if (power <= k && value + power <= k) {
				value += power
				count++
			}
		}

		// Prepare for next power (only if it won't overflow)
		if (power <= k) {
			power *= 2
		}
	}

	return count
}

// Time: O(n) – one pass from right to left
// Space: O(1) – constant extra variables
