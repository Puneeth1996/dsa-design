/**
 * @param {string} num
 * @return {boolean}
 */
var isBalanced = function (num) {
	let arr = num.split('').map((str) => parseInt(str, 10))
	let evenIndexValues = 0
	for (let i = 0; i < arr.length; i += 2) {
		evenIndexValues = evenIndexValues + arr[i]
	}
	let oddIndexValues = 0
	for (let i = 1; i < arr.length; i += 2) {
		oddIndexValues = oddIndexValues + arr[i]
	}
	if (evenIndexValues === oddIndexValues) {
		return true
	} else return false
}
isBalanced('24123')
