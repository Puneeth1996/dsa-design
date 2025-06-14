/**
 * @param {number} num
 * @return {number}
 */
var minMaxDifference = function (num) {
	const str = num.toString()
	const firstNon9 = str[str.search(/[0-8]/)] ?? -1
	const firstNon0 = str[str.search(/[1-9]/)] ?? -1

	const max =
		firstNon9 + 1 ? +str.replace(new RegExp(firstNon9, 'g'), '9') : num
	const min =
		firstNon0 + 1 ? +str.replace(new RegExp(firstNon0, 'g'), '0') : num

	return max - min
}
// Time and space Complexity: O(n)
