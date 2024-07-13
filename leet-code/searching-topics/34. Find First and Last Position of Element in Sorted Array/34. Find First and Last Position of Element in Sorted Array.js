/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// Recursive Solution
// Time Complexity - T(2*logn) -> t(logn)
// Space Complexilty - S(logn) space is being used for the call stack

// const searchForRangeRec = function(array,target){
//     const range = [-1,-1];
//     findLeftExtreme(array,target,range);
//     findRightExtreme(array,target,range);
//     return range;
// }

// const findLeftExtreme = function(array,target,range,left=0,right=array.length-1){
//     //base case
//     if(left>right) return ;
//     const middle = Math.floor((left + right)/2);
//     if(array[middle]===target){
//         if(middle===0) range[0]=0;
//         else if(array[middle-1]===target){
//             findLeftExtreme(array,target,range,left,middle-1);
//         } else range[0]=middle;
//     }else if (target<array[middle]){
//         findLeftExtreme(array,target,range,left,middle-1);
//     } else findLeftExtreme(array,target,range,middle+1,right);
// }

// const findRightExtreme = function(array,target,range,left=0,right=array.length-1){
//     //base case
//     if(left>right) return;
//     const middle = Math.floor((left+right)/2);
//     if(array[middle]===target){
//         if(middle===array.length-1)range[1]=middle;
//         else if(target===array[middle+1]){
//             findRightExtreme(array,target,range,middle+1,right);
//         }else range[1] = middle;
//     }else if(target<array[middle]){
//         findRightExtreme(array,target,range,left,middle-1);
//     } else{
//         findRightExtreme(array,target,range,middle+1,right);
//     }

// }

// Recursive Solution
// Time Complexity - T(2*logn) -> t(logn)
// Space Complexilty - S(1) space is being used for the call stack

// const searchForRangeIterative = function(array,target){
//     const leftExtreme = findLeftExtreme(array,target);
//     const rightExtreme = findRightExtreme(array,target);
//     return [leftExtreme,rightExtreme];
// }

const findLeftExtreme = function (array, target) {
	let left = 0
	let right = array.length - 1
	let middle
	while (left <= right) {
		middle = Math.floor((left + right) / 2)
		if (target === array[middle]) {
			//modification binary search
			if (middle === 0) return 0
			if (array[middle - 1] === target) right = middle - 1
			else return middle
		} else if (target < array[middle]) {
			right = middle - 1
		} else {
			left = middle + 1
		}
	}
	return -1
}

const findRightExtreme = function (array, target) {
	let left = 0
	let right = array.length - 1
	let middle
	while (left <= right) {
		middle = Math.floor((left + right) / 2)
		if (target === array[middle]) {
			//modifcations
			if (middle === array.length - 1) return middle
			if (array[middle + 1] === target) left = middle + 1
			else return middle
		} else if (target < array[middle]) {
			right = middle - 1
		} else left = middle + 1
	}
	return -1
}

var searchRange = function (array, target) {
	const leftExtreme = findLeftExtreme(array, target)
	const rightExtreme = findRightExtreme(array, target)
	return [leftExtreme, rightExtreme]
}

// Notes
// Array is sorted
// Problem requires O(logn) time complexity
// In either iterative or recursive solution we are going to use binary search
// We are going to find the target value index of left and right extremes
// value(middle) is equal to target
// if m=0 the leftorrightextreme = 0
// if previous value is less than target  right pointer = midlle -1 and then repeat the above 2 steps
// once left / right = midlle then take the leftorrightextreme as middle index and the return values
