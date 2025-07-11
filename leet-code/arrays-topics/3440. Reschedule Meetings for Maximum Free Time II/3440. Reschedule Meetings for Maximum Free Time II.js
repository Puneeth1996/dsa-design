/**
 * @param {number} eventTime
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function (eventTime, startTime, endTime) {
	const n = startTime.length

	// 1. Compute gaps array (length n+1)
	const gaps = []
	gaps.push(startTime[0]) // before first
	for (let i = 1; i < n; i++) {
		gaps.push(startTime[i] - endTime[i - 1])
	}
	gaps.push(eventTime - endTime[n - 1]) // after last

	// 2. Precompute prefix/suffix max
	const maxLeft = Array(n + 1).fill(0)
	const maxRight = Array(n + 1).fill(0)

	maxLeft[0] = gaps[0]
	for (let i = 1; i <= n; i++) {
		maxLeft[i] = Math.max(maxLeft[i - 1], gaps[i])
	}

	maxRight[n] = gaps[n]
	for (let i = n - 1; i >= 0; i--) {
		maxRight[i] = Math.max(maxRight[i + 1], gaps[i])
	}

	// 3. Evaluate each meeting
	let answer = maxLeft[n] // baseline: max existing gap
	for (let i = 0; i < n; i++) {
		const duration = endTime[i] - startTime[i]
		const adjacentSum = gaps[i] + gaps[i + 1]

		const bestOtherGap = Math.max(
			i > 0 ? maxLeft[i - 1] : 0,
			i + 2 <= n ? maxRight[i + 2] : 0
		)

		const merged = adjacentSum + (bestOtherGap >= duration ? duration : 0)
		answer = Math.max(answer, merged)
	}

	return answer
}

// Time Complexity:

// Building gaps: O(n)

// Building maxLeft & maxRight: O(n)

// Looping through each meeting: O(n)
// → Overall: O(n)

// Space Complexity:

// gaps, maxLeft, maxRight: each length O(n+1)
// → Overall: O(n)
