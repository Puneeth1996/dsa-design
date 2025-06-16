/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumDifference = function (nums) {
	let minSoFar = nums[0]
	let maxDiff = -1
	for (let j = 1; j < nums.length; j++) {
		if (nums[j] > minSoFar) maxDiff = Math.max(maxDiff, nums[j] - minSoFar)
		else minSoFar = nums[j]
	}
	return maxDiff
}
