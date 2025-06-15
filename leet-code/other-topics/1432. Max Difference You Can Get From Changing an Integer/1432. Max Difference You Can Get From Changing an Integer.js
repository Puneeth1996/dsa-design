/**
 * @param {number} num
 * @return {number}
 */
var maxDiff = function (num) {
	const strNum = num.toString()

	// Get max number
	let maxDigit = strNum.split('').find((ch) => ch !== '9')
	let maxNum = strNum.replaceAll(maxDigit, '9')

	// Get min number
	let minDigit
	let minNum

	if (strNum[0] !== '1') {
		// Replace first digit with '1'
		minDigit = strNum[0]
		minNum = strNum.replaceAll(minDigit, '1')
	} else {
		// Look for first digit (from second onward) that is not 0 or 1
		minDigit = strNum
			.slice(1)
			.split('')
			.find((ch) => ch !== '0' && ch !== '1')
		if (minDigit) {
			minNum = strNum.replaceAll(minDigit, '0')
		} else {
			minNum = strNum
		}
	}

	return parseInt(maxNum) - parseInt(minNum)
}
