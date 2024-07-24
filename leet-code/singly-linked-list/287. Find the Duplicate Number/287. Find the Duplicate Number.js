/**
 * @param {number[]} nums
 * @return {number}
 */
// Floyds tortoise Method
// Time  Complexity = O(n)
// Space Complexity = O(1)
var findDuplicate = function (nums) {
	let hare = 0
	let tortoise = 0

	while (true) {
		hare = nums[nums[hare]]
		tortoise = nums[tortoise]

		if (hare === tortoise) {
			let pointer = 0
			while (pointer !== tortoise) {
				pointer = nums[pointer]
				tortoise = nums[tortoise]
			}
			return pointer
		}
	}
}
