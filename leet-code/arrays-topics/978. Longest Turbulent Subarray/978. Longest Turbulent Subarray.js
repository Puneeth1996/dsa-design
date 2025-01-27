/**
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function (arr) {
	let increasingSequenceLength = 1
	let decreasingSequenceLength = 1
	let maxSequenceLength = 1
	for (let i = 1; i < arr.length; ++i) {
		let tempIncreasingLength =
			arr[i - 1] < arr[i] ? decreasingSequenceLength + 1 : 1
		let tempDecreasingLength =
			arr[i - 1] > arr[i] ? increasingSequenceLength + 1 : 1

		increasingSequenceLength = tempIncreasingLength
		decreasingSequenceLength = tempDecreasingLength

		maxSequenceLength = Math.max(
			maxSequenceLength,
			increasingSequenceLength,
			decreasingSequenceLength
		)
	}

	return maxSequenceLength
}
// time complexity of this algorithm is O(n)
// the space complexity is O(1)
