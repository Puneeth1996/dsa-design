/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function (nums) {
  let numLength = nums.length;
  for (let i = 0; i < numLength; i++) {
    nums.push(nums[i]);
  }
  return nums;
};

getConcatenation([1, 2, 3]);

// Store the initial lenght of the original array 
// Append or push the Items of the array from 0 to length of array to the last postion


// Time Complexity : O(n)
// Space Complexity : O(n)

