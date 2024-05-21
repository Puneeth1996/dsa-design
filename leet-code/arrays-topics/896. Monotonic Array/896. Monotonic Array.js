// O(n) time complexity and space complexity is O(1)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function (nums) {
	const first = nums[0]
	const last = nums[nums.length - 1]
	if (first === last) {
		for (let i = 0; i < nums.length - 1; i++) {
			if (nums[i + 1] !== nums[i]) return false
		}
	} else if (first < last) {
		// non decreasing
		for (let i = 0; i < nums.length - 1; i++) {
			if (nums[i + 1] < nums[i]) return false
		}
	} else {
		// non increasing
		for (let i = 0; i < nums.length - 1; i++) {
			if (nums[i + 1] > nums[i]) return false
		}
	}
	return true
}
