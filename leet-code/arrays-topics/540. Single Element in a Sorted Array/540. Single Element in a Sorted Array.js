/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
	// Define pointers for the binary search
	let leftPointer = 0
	let rightPointer = nums.length - 1

	// Start binary search
	while (leftPointer < rightPointer) {
		// Calculate the middle index using bit manipulation
		// (right shift by 1 is equivalent to dividing by 2)
		const middleIndex = (leftPointer + rightPointer) >> 1

		// Check if the middle element is not equal to its neighbor.
		// XOR with 1 will check the neighbor, for even mid it will check next, for odd mid it will check previous.
		if (nums[middleIndex] != nums[middleIndex ^ 1]) {
			// If it's not equal, the single element must be on the left side.
			// Move the right pointer to the middle index.
			rightPointer = middleIndex
		} else {
			// Otherwise, the single element is on the right side.
			// Move the left pointer to one past the middle index.
			leftPointer = middleIndex + 1
		}
	}
	// At the end of the loop, leftPointer will point to the single element.
	// Return the element at the leftPointer index.
	return nums[leftPointer]
}
