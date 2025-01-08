/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function(nums) {
    let leftIndex = 0;

    let rightIndex = nums.length - 1; 

    while (leftIndex < rightIndex) {
     if (nums[leftIndex] % 2 !== 0) { 
      [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]]; 
      rightIndex--; 
      } else {  leftIndex++;   }  } 
       return nums;
};