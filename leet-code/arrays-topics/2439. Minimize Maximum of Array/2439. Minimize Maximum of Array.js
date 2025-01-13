/**
 * @param {number[]} nums
 * @return {number}
 */

var minimizeArrayValue = function (nums) {
	let minPossibleValue = 0
	let maxPossibleValue = Math.max(...nums)
	const canDistribute = (maxValue) => {
		let excess = 0
		for (let i = nums.length - 1; i > 0; --i) {
			excess = Math.max(0, excess + nums[i] - maxValue)
		}
		return nums[0] + excess <= maxValue
	}

	while (minPossibleValue < maxPossibleValue) {
		let mid = Math.floor((minPossibleValue + maxPossibleValue) / 2)
		if (canDistribute(mid)) {
			maxPossibleValue = mid
		} else {
			minPossibleValue = mid + 1
		}
	}
	return minPossibleValue
}
