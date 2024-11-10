/**
 * @param {number} n
 * @return {number}
 */
const numberOfMatches = function (n) {
	let result = 0

	while (n > 1) {
		if (n % 2 === 0) {
			n = n / 2
			result += n
			continue
		}

		n = parseInt(n / 2)
		result += n
		n = n + 1
	}

	return result
}

console.log(numberOfMatches(7))

console.log(numberOfMatches(14))

// Time Complexity - O(n) at min all the n/2 number of items will be calculated
// Space Complexity   S(1) no additional memory is utilized
