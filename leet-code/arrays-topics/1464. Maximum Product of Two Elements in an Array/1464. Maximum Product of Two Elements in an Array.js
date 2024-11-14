/**
 * @param {number[]} nums
 * @return {number}
 */
// function maxProduct(nums) {
// 	let max = 0
// 	let submax = 0
// 	for (const num of nums) {
// 		if (num > max) {
// 			submax = max
// 			max = num
// 		} else if (num > submax) {
// 			submax = num
// 		}
// 	}

// 	return (max - 1) * (submax - 1)
// }
function maxProduct(nums) {
	let curr_max = nums[0]
	let result = 0
	for (let i = 1; i < nums.length; i++) {
		result = Math.max(result, (nums[i] - 1) * (curr_max - 1))

		curr_max = Math.max(curr_max, nums[i])
	}
	return result
}

maxProduct([3, 4, 5, 2])
