/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
	// Initialize the count, k, to be the index at which we insert the next unique element.
	let count = 0

	// Iterate through each number in the given array.
	for (const current of nums) {
		// If the count is less than 2 or the current number is not equal to
		// the number two places before in the array, it is not a duplicate (or it's
		// the second occurrence of a number that is allowed twice), so we add it to the array.
		if (count < 2 || current !== nums[count - 2]) {
			nums[count] = current
			count++ // Increment the count since we've added a unique number.
		}
	}

	// Return the new length of the array after duplicates have been removed.
	// Elements after the returned length are considered irrelevant.
	return count
}
// time complexity of the code is O(n)
// space complexity of the code is O(1)
