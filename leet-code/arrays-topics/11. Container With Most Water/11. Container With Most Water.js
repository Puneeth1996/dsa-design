/**
 * @param {number[]} height
 * @return {number}
 */

// brute froce solution
// Time complexity O(n^2)
// Space complexity is O(1)
// const maxAreaBruteForce = function (array) {
// 	//[3,7,5,6,8,4]
// 	let area = 0
// 	for (let i = 0; i < array.length - 1; i++) {
// 		for (let j = i + 1; j < array.length; j++) {
// 			const height = Math.min(array[i], array[j])
// 			const width = j - i
// 			area = Math.max(area, height * width)
// 		}
// 	}
// 	return area
// }

// Efficient solution
// Time complexity O(n)
// Space complexity is O(1)
var maxArea = function (array) {
	let area = 0
	let i = 0
	let j = array.length - 1
	while (i < j) {
		let height = Math.min(array[i], array[j])
		let newArea = height * (j - i)
		area = Math.max(area, newArea)
		if (array[i] < array[j]) i++
		else j--
	}
	return area
}
