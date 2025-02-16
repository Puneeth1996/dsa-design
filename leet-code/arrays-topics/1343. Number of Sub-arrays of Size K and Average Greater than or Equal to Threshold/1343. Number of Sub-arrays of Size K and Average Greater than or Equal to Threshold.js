/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function (arr, k, threshold) {
	let sum = arr
		.slice(0, k)
		.reduce((accumulator, current) => accumulator + current, 0)

	let subarrayCount = sum >= k * threshold ? 1 : 0
	for (let i = k; i < arr.length; ++i) {
		sum += arr[i] - arr[i - k]
		subarrayCount += sum >= k * threshold ? 1 : 0
	}
	return subarrayCount
}
// time complexity of O(n)
// space complexity of the code is O(1)
