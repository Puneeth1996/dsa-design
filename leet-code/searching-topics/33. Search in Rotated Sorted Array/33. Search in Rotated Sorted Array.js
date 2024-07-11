/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// Time complexity is O(logn)
// Space complexity in O(1)
// idea of the solution, in iterative method
// check if the left part of the arrray is sorted in the rotated array and if true explore the left part which is already sorted or rigth
// same goes for the right part else
// once the target value is reached with middle pointer than return middle

var search = function (nums, target) {
	let left = 0
	let right = nums.length - 1
	let middle
	while (left <= right) {
		middle = Math.floor((left + right) / 2)
		if (target === nums[middle]) return middle
		if (nums[left] <= nums[middle]) {
			//left part is sorted
			if (target >= nums[left] && target < nums[middle]) {
				//explore left part
				right = middle - 1
			} else {
				//explore right part
				left = middle + 1
			}
		} else {
			//right sorted
			if (target <= nums[right] && target > nums[middle]) {
				//explore right part
				left = middle + 1
			} else {
				//explore left part
				right = middle - 1
			}
		}
	}
	return -1
}
