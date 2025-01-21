/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
	let leftBoundary = 0
	let rightBoundary = nums.length - 1

	while (leftBoundary < rightBoundary) {
		const middleIndex = leftBoundary + ((rightBoundary - leftBoundary) >> 1)
		if (nums[middleIndex] > nums[middleIndex + 1]) {
			rightBoundary = middleIndex
		} else {
			leftBoundary = middleIndex + 1
		}
	}
	return leftBoundary
}

// Time complexity O(log n)
