/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strings, zeroLimit, oneLimit) {
	// Initialize a memoization table with dimensions (zeroLimit + 1) x (oneLimit + 1).
	// This table will help us keep track of the maximum number of strings we can include
	// given a specific limit of zeroes and ones.
	const dpTable = Array.from({ length: zeroLimit + 1 }, () =>
		Array.from({ length: oneLimit + 1 }, () => 0)
	)

	// A helper function to count the number of zeroes and ones in a string.
	// It returns a tuple [zeroCount, oneCount].
	const countZeroesAndOnes = (str) => {
		let zeroCount = 0
		for (const char of str) {
			if (char === '0') {
				zeroCount++
			}
		}
		return [zeroCount, str.length - zeroCount]
	}

	// Iterate through each string in the input array.
	for (const str of strings) {
		// Count the number of zeroes and ones in the current string.
		const [zeroes, ones] = countZeroesAndOnes(str)

		// Update the dpTable in reverse to avoid overwriting data we still need to use.
		for (let i = zeroLimit; i >= zeroes; --i) {
			for (let j = oneLimit; j >= ones; --j) {
				// The maximum number of strings that can be included is either the current count
				// or the count obtained by including the current string plus the count of strings
				// that can be included with the remaining zeroes and ones.
				dpTable[i][j] = Math.max(
					dpTable[i][j],
					dpTable[i - zeroes][j - ones] + 1
				)
			}
		}
	}

	// The final result is stored in dpTable[zeroLimit][oneLimit], reflecting the maximum number
	// of strings we can include given the original zeroLimit and oneLimit.
	return dpTable[zeroLimit][oneLimit]
}
