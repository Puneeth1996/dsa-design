/**
 * @param {number[]} nums
 * @return {number[]}
 */
var buildArray = function (nums) {
  let ans = [];
    for (let i = 0; i < nums.length; i++) {
        ans.push(nums[nums[i]]);
    }
  return ans;
};

// as per constraints the length of array is b/w 0 and 1000
// element in the array will be less length and 


// Time Complexity : O(n)
// Space Complexity : O(n)

// THis Below Code snippet takes the constraints into account 



// /**
//  * @param {number[]} nums
//  * @return {number[]}
//  */
// var buildArray = function (nums) {
//     let ans = [];
//     if (nums.length >= 1 && nums.lenth <= 1000) {
//       for (let i = 0; i < nums.length; i++) {
//         if (nums[i] < nums.length && nums[i] >= 0) {
//           ans.push(nums[nums[i]]);
//         }
//       }
//     }
//     return ans;
//   };
  