/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// Time Complexity is O(log n)
// Space Comlexity O(1)

// const binarySearchIterative = function(nums,target){
//     let left =0;
//     let right =nums.length -1;
//     let middle;
//     while(left<=right){
//         middle = Math.floor((left+right)/2);
//         if(target===nums[middle]) return middle;
//         if(target<nums[middle]) right =middle-1;
//         else left = middle+1;
//     }
//     return -1;
// }

// const binarySearchRecursive = function(nums,target){
//     const helper = function(nums,target,left,right){
//         //base case
//         if(left>right) return -1;
//         const middle = Math.floor((left+right)/2);
//         if(target===nums[middle]) return middle;
//         else if (target<nums[middle]) return helper(nums,target,left,middle-1);
//         else return helper(nums,target,middle+1,right);
//     }
//     return helper(nums,target,0,nums.length-1);
// }

// Time Complexity is O(log n)
// Space Comlexity O(log n)

var search = function (nums, target) {
	const helper = function (nums, target, left, right) {
		//base case
		if (left > right) return -1
		const middle = Math.floor((left + right) / 2)
		if (target === nums[middle]) return middle
		else if (target < nums[middle])
			return helper(nums, target, left, middle - 1)
		else return helper(nums, target, middle + 1, right)
	}
	return helper(nums, target, 0, nums.length - 1)
}
