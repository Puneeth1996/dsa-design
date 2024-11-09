/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
	const len = num.length
	let maxChar = ''
	for (let i = 2; i < len; i++) {
		if (num[i] === num[i - 1] && num[i] === num[i - 2]) {
			maxChar = Number(maxChar) > Number(num[i]) ? maxChar : num[i]
		}
	}
	if (maxChar === '') return ''
	else return String(maxChar).repeat(3)
}

// Time Complexity O(n) as we are iterating through the array of strings
// Space Complexity S(1) constant space
