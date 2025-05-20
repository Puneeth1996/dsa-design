/**
 * @param {number[]} nums
 * @return {boolean}
 */

// Time: O(n²) — due to nested loops comparing every pair
// Space: O(1) — no extra space used
// var containsDuplicate = function(nums) {
//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             if (nums[i] === nums[j]) {
//                 return true; // Duplicate found
//             }
//         }
//     }
//     return false; // No duplicates
// };

// Time: O(n) — single pass through the array
// Space: O(n) — in worst case, all numbers are unique
// var containsDuplicate = function(nums) {
//     const seen = {}; // This is your hashmap

//     for (let num of nums) {
//         if (seen[num]) {
//             return true; // Duplicate found
//         }
//         seen[num] = true; // Mark number as seen
//     }

//     return false; // No duplicates
// };

// Time complexity: O(nlogn)
// Space complexity: O(n)
// var containsDuplicate = function (nums) {
// 	nums.sort((a, b) => a - b)

// 	for (let i = 1; i < nums.length; i++) {
// 		if (nums[i] === nums[i - 1]) {
// 			return true
// 		}
// 	}

// 	return false
// }

// Time complexity: O(n)
// Space complexity: O(n)
// var containsDuplicate = function(nums) {
//     const numSet = new Set(nums);
//     return numSet.size < nums.length;
// };
