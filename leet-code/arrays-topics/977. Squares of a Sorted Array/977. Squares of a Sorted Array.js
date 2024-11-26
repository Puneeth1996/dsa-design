/**
 * @param {number[]} nums
 * @return {number[]}
 */

// Brute force solution
// Spae complexity - O(n) as we are creating new array
// Time complexity - O(nlogn) as we are having for loop and sorting method that requires nlog(n) time complexity
// var squaredSortedArray = function(array) {
// 	const newArray = new Array(array.length).fill(0)
// 	for (let i = array.length - 1; i >= 0; i--) {
// 		const newArray[i] = Math.pow(array[i], 2)
//     }
//     newArray.sort(function(a,b){
//         return a-b;
//     })
// 	return newArray
// }

// Efficeint  solution
// Spae complexity - O(n) as we are creating new array
// Time complexity - O(n) as we are having only one for loop

var sortedSquares = function (nums) {
	const newArray = new Array(nums.length).fill(0)
	let pointerLeft = 0
	let pointerRight = nums.length - 1
	for (let i = nums.length - 1; i >= 0; i--) {
		const leftSquared = Math.pow(nums[pointerLeft], 2)
		const rightSquared = Math.pow(nums[pointerRight], 2)
		if (leftSquared > rightSquared) {
			newArray[i] = leftSquared
			pointerLeft++
		} else {
			newArray[i] = rightSquared
			pointerRight--
		}
	}
	return newArray
}

// Nov 26 2024
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
	const n = nums.length
	const ans = Array(n).fill(0)
	for (let i = 0, j = n - 1, k = n - 1; i <= j; --k) {
		const [a, b] = [nums[i] * nums[i], nums[j] * nums[j]]
		if (a > b) {
			ans[k] = a
			++i
		} else {
			ans[k] = b
			--j
		}
	}
	return ans
}
