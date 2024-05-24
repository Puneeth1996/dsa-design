/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// brute Froce solution
// Time complexity - O(n^2)
// Space complexity- O(1) because we are not storing anything
// function findIndicesSum(array,targetValue){
//     for(let i=0;i<array.length-1;i++){
//         for(let j=i+1;j<array.length;j++){
//             if(targetValue===array[i]+array[j]){
//                 return [i,j];
//             }
//         }
//     }
//     return [];
// }

// Effeciten solution
// Time complexity - O(n)
// Space complexity- O(n) because we are inserting n items to the hashtable

var twoSum = function (nums, target) {
	const hashTable = {}
	let neededValue
	for (let i = 0; i < nums.length; i++) {
		neededValue = target - nums[i]
		if (neededValue in hashTable) {
			return [i, hashTable[neededValue]]
		} else {
			hashTable[nums[i]] = i
		}
	}
	return []
}
