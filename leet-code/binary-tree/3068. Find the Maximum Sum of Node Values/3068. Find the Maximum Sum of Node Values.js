/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} edges
 * @return {number}
 */
var maximumValueSum = function (nums, k, edges) {
	let totalSum = 0
	let countOdd = 0
	let minDiff = Infinity

	for (let num of nums) {
		const xorVal = num ^ k
		const gain = xorVal - num
		totalSum += num

		if (gain > 0) {
			totalSum += gain
			countOdd++
		}

		minDiff = Math.min(minDiff, Math.abs(gain))
	}

	// If number of operations is odd, subtract smallest gain to make it even
	if (countOdd % 2 !== 0) {
		totalSum -= minDiff
	}

	return totalSum
}
