// /**
//  * @param {number[]} nums
//  * @return {number[]}
//  */
// var buildArray = function (nums) {
// 	let ans = []
// 	for (let i = 0; i < nums.length; i++) {
// 		ans.push(nums[nums[i]])
// 	}
// 	return ans
// }

// // as per constraints the length of array is b/w 0 and 1000
// // element in the array will be less length and

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var buildArray = function (nums) {
	let n = nums.length
	for (let i = 0; i < nums.length; i++) {
		let hashedvalue = nums[i] + (nums[nums[i]] % n) * n
		nums[i] = hashedvalue
	}
	for (let i = 0; i < nums.length; i++) {
		nums[i] = Math.floor(nums[i] / n)
	}
	return nums
}

// Time Complexity : O(n)
// Space Complexity : O(1)
