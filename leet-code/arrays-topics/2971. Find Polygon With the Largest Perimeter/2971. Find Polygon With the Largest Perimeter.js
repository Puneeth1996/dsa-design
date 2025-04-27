/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
	nums.sort((a, b) => a - b) // Sort the array in ascending order
	let Csum = 0,
		Psum = 0 // Initialize current sum and perimeter sum to 0

	for (let i = 0; i < nums.length; ++i) {
		// Check if the current element can be part of a valid triangle
		if (nums[i] < Csum) {
			Psum = Csum + nums[i] // Update perimeter sum with the potential triangle's perimeter
		}
		Csum += nums[i] // Update current sum with the current element
	}

	// Return the largest perimeter if a valid triangle is found, otherwise return -1
	return Psum == 0 ? -1 : Psum
}
// Time complexity: O(nlogn) Space complexity: O(1)
