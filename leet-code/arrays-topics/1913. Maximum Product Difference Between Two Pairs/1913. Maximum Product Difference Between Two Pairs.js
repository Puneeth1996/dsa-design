/**
 * @param {number[]} nums
 * @return {number}
 */
// var maxProductDifference = function (nums) {
//     nums.sort((a, b) => a - b);
//     let n = nums.length;
//     let ans = nums[n - 1] * nums[n - 2] - nums[0] * nums[1];
//     return ans;
// }

var maxProductDifference = function (nums) {
	let firstlargest = 0
	let secondlargest = 0
	let firstsmallest = 10_000
	let secondsmallest = 10_000
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] > firstlargest) {
			secondlargest = firstlargest
			firstlargest = nums[i]
		} else if (nums[i] > secondlargest) {
			secondlargest = nums[i]
		}

		if (nums[i] < firstsmallest) {
			secondsmallest = firstsmallest
			firstsmallest = nums[i]
		} else if (nums[i] < secondsmallest) {
			secondsmallest = nums[i]
		}
	}
	let ans = firstlargest * secondlargest - firstsmallest * secondsmallest
	return ans
}

// There are two approaches
// Sorting the number in the array and then picking the first and second largest and smallest elements
// With sorting techneque O(nlogn) T(1)
// Without sorting we shall loop over the array and then pick the first and second largest
// Without sorting techneque O(n) T(1)
