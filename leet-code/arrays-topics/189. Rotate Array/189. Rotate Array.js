/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// brute froce solution
// Time complexity O(n)
// Space complexity is O(n) as new temp array created with slice
// const rotateArray = function (array,k){
//     const length = array.length;
//     k=k%length;
//     const temp = array.slice(length-k); // slice is O(k) where k = end - start
//     for(let i=length-k-1;i>=0;i--){
//         array[i+k]=array[i];
//     }
//     for(let i=0;i<k;i++){
//         array[i]=temp[i];
//     }
//     return array;
// }

// Efficient solution
// Time complexity O(n)
// Space complexity is O(1)
const reverse = function (nums, start, end) {
	while (start < end) {
		;[nums[start], nums[end]] = [nums[end], nums[start]]
		start++
		end--
	}
}

// const rotate = function(nums,k)
// rotate([1,2,3],2);

// array = [1, 2, 3, 4, 5]
// rotateArray(array, 2)
var rotate = function (nums, k) {
	k = k % nums.length //k=102 ,length =5, 2 rotations
	//nums.reverse();
	reverse(nums, 0, nums.length - 1)
	//start =0, end = k-1
	reverse(nums, 0, k - 1)
	//start = k, end = length-1
	reverse(nums, k, nums.length - 1)
	return nums
}
