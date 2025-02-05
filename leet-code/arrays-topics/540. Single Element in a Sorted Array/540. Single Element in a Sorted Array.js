/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums, left = 0, right = nums.length - 1) {
	while (left < right) {
		let mid = left + (right - left) / 2
		if (nums[mid] == nums[mid + 1]) mid = mid - 1
		if ((mid - left + 1) % 2 != 0) right = mid
		else left = mid + 1
	}
	return nums[left]
}
// Binery search should come to mind as there is linear O(1) and log n is time complexity

// Two important points - all items in the array is sorted
// since question says one element is odd - so then we need to calcucate the mid and check if the
// left or right sub array contains the odd number of values
