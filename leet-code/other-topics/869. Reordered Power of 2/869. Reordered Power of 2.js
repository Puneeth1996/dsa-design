/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function (n) {
	let num = n
		.toString()
		.split('')
		.sort((a, b) => a - b)
		.join('')
	for (let i = 0; i < 30; i++) {
		let twopow = Math.pow(2, i)
			.toString()
			.split('')
			.sort((a, b) => a - b)
			.join('')
		if (num == twopow) {
			return true
		}
	}
	return false
}

// Time complexity: O(30 * 10 log 10) = O(1)
// Space complexity: num: stores sorted string of n → O(D) = O(1)
