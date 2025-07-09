/**
 * @param {number} eventTime
 * @param {number} k
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function (eventTime, k, startTime, endTime) {
	const n = startTime.length
	const gaps = []

	gaps.push(startTime[0])

	for (let i = 1; i < n; i++) {
		gaps.push(startTime[i] - endTime[i - 1])
	}

	gaps.push(eventTime - endTime[n - 1])

	const windowSize = k + 1
	let currSum = 0

	for (let i = 0; i < windowSize && i < gaps.length; i++) {
		currSum += gaps[i]
	}

	let result = currSum

	for (let i = windowSize; i < gaps.length; i++) {
		currSum += gaps[i] - gaps[i - windowSize]
		result = Math.max(result, currSum)
	}

	return result
}
// Time Complexity: O(n)
// Space Complexity: O(n)
