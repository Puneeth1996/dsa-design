/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// Space complexity - O(2^n x n)
// Time complexity - O(2^n x n)

// const powerSet = function(nums){
//     const output =[];
//     const helper = function(nums,i,subset){
//         if(i===nums.length){
//             output.push(subset.slice());
//             return;
//         }
//         //dont add
//         helper(nums,i+1,subset);
//         //add
//         subset.push(nums[i]);
//         helper(nums,i+1,subset);
//         subset.pop();
//     }
//     helper(nums,0,[]);
//     return output;
// }

// powerSet([9]);

var subsets = function (nums) {
	const output = []
	const helper = function (nums, i, subset) {
		if (i === nums.length) {
			output.push(subset.slice())
			return
		}
		//dont add
		helper(nums, i + 1, subset)
		//add
		subset.push(nums[i])
		helper(nums, i + 1, subset)
		subset.pop()
	}
	helper(nums, 0, [])
	return output
}

// this problems also requires good understanding on the functino call stack and
// having to make the call the stack operate as per the required execution flow
