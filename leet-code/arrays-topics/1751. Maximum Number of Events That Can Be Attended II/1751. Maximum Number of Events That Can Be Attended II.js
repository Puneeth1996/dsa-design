/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */
var maxValue = (events, limit) => {
	const len = events.length
	const dp = Array.from({length: len + 1}, () => Array(limit + 1).fill(0))

	if (limit === 1) {
		let maxVal = 0
		for (const [start, end, val] of events) {
			maxVal = Math.max(maxVal, val)
		}

		return maxVal
	}

	events.sort((a, b) => a[0] - b[0])

	for (let i = len - 1; i >= 0; i--) {
		let left = i + 1
		let right = len
		const endTime = events[i][1]
		while (left < right) {
			const mid = Math.floor((right - left) / 2) + left
			if (events[mid][0] > endTime) {
				right = mid
			} else {
				left = mid + 1
			}
		}
		const next = left

		for (let j = limit - 1; j >= 0; j--) {
			dp[i][j] = Math.max(dp[i + 1][j], dp[next][j + 1] + events[i][2])
		}
	}

	return dp[0][0]
}
// Time complexity Sorting	O(n log n) Binary Search for each event	O(n log n) DP Table filling	O(n * k) Total	O(n log n + n * k)
// Space complexity	O(n * k) for the DP table
