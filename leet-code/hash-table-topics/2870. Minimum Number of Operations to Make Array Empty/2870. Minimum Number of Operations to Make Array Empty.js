/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
	const frequencyMap = new Map()

	for (const num of nums) {
		frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1)
	}

	let minOperationsRequired = 0

	for (const frequency of frequencyMap.values()) {
		if (frequency === 1) {
			return -1
		}

		minOperationsRequired += Math.ceil(frequency / 3)
	}

	return minOperationsRequired
}
// Time complexity: O(n) Space complexity: O(n)
