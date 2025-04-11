/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countSymmetricIntegers = function (low, high) {
	let count = 0

	for (let num = low; num <= high; num++) {
		let str = num.toString()
		let len = str.length

		if (len % 2 !== 0) continue

		let half = len / 2
		let leftSum = 0
		let rightSum = 0

		for (let i = 0; i < half; i++) {
			leftSum += parseInt(str[i])
		}

		for (let i = half; i < len; i++) {
			rightSum += parseInt(str[i])
		}

		if (leftSum === rightSum) {
			count++
		}
	}

	return count
}

// Time complexity O(n * d)
// Space complexity O(1)
