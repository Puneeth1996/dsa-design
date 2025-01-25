/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
	// ES6 Arrow Function
	const mergeSort = (arr) => {
		// Base Case - if the array has less than 2 elements, it's already sorted
		if (arr.length < 2) return arr

		// Split the array into two halves
		let middleIndex = Math.floor(arr.length / 2)
		let leftHalf = arr.slice(0, middleIndex)
		let rightHalf = arr.slice(middleIndex)

		// Recursively sort each half
		const sortedLeftHalf = mergeSort(leftHalf)
		const sortedRightHalf = mergeSort(rightHalf)

		// Merge the sorted halves back
		return merge(sortedLeftHalf, sortedRightHalf)
	}

	const merge = (leftArr, rightArr) => {
		let mergedArr = []
		let leftIndex = 0,
			rightIndex = 0

		// Iterate through both arrays adding the smaller elements in the merged array
		while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
			if (leftArr[leftIndex] < rightArr[rightIndex]) {
				mergedArr.push(leftArr[leftIndex])
				leftIndex++
			} else {
				mergedArr.push(rightArr[rightIndex])
				rightIndex++
			}
		}

		// Add the remaining elements from the left array
		while (leftIndex < leftArr.length) {
			mergedArr.push(leftArr[leftIndex])
			leftIndex++
		}

		// Add the remaining elements from the right array
		while (rightIndex < rightArr.length) {
			mergedArr.push(rightArr[rightIndex])
			rightIndex++
		}

		return mergedArr
	}
	return mergeSort(nums)
}
