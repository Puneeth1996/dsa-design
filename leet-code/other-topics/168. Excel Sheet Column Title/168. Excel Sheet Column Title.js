/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
	let res = []
	while (columnNumber > 0) {
		--columnNumber
		let num = columnNumber % 26
		res.unshift(String.fromCharCode(num + 65))
		columnNumber = Math.floor(columnNumber / 26)
	}
	return res.join('')
}

// Time complexity log base 26 n
