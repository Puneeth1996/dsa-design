/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function (n) {
	let num = n
	function isAllBitOnes(input) {
		const binaryVal = input.toString(2)
		const ones = binaryVal.split('1').length - 1
		return ones === binaryVal.length
	}
	while (!isAllBitOnes(num)) {
		num++
	}
	return num
}
// TIme and Space Complexity O(1)
