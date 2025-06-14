/**
 * @param {number} num
 * @return {number}
 */
var minMaxDifference = function (num) {
	const str = num.toString()

	// Maximize: replace the first digit not '9' with '9'
	let maxStr = str
	for (let i = 0; i < str.length; i++) {
		if (str[i] !== '9') {
			maxStr = str.split(str[i]).join('9')
			break
		}
	}

	// Minimize: replace the first digit not '1' with '0' or '1' (avoid leading 0)
	let minStr = str
	if (str[0] !== '1') {
		minStr = str.split(str[0]).join('1')
	} else {
		for (let i = 1; i < str.length; i++) {
			if (str[i] !== '0' && str[i] !== '1') {
				minStr = str.split(str[i]).join('0')
				break
			}
		}
	}

	return parseInt(maxStr) - parseInt(minStr)
}
// Time and space Complexity: O(n)
