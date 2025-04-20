/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = (nums, lower, upper) => {
	// Binary search function to find the index of the first number in `sortedNums`
	// that is greater than or equal to `target`, starting the search from index `left`.
	const binarySearch = (target, left) => {
		let right = nums.length
		while (left < right) {
			const mid = (left + right) >> 1
			if (nums[mid] >= target) {
				right = mid
			} else {
				left = mid + 1
			}
		}
		return left
	}

	// Sort the array in non-descending order.
	nums.sort((a, b) => a - b)

	// Initialize the count of fair pairs to zero.
	let fairPairCount = 0

	// Iterate through the array to count fair pairs.
	for (let i = 0; i < nums.length; ++i) {
		// Find the starting index 'j' for the valid pairs with nums[i]
		const startIdx = binarySearch(lower - nums[i], i + 1)
		// Find the ending index 'k' for the valid pairs with nums[i]
		const endIdx = binarySearch(upper - nums[i] + 1, i + 1)
		// The number of valid pairs with nums[i] is the difference between these indices
		fairPairCount += endIdx - startIdx
	}

	// Return the total count of fair pairs.
	return fairPairCount
}
