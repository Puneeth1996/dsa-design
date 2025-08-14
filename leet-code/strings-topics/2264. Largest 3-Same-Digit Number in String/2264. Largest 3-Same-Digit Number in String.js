/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
	const len = num.length
	let maxch = ''
	for (let i = 2; i < len; i++) {
		if (num[i] === num[i - 1] && num[i] === num[i - 2]) {
			maxch = Number(maxch) > Number(num[i]) ? maxch : num[i]
		}
	}
	// if(maxch === '' ) return ''
	// else retun String(maxch).repeat(3)
	return maxch === '' ? '' : String(maxch).repeat(3)
}

// Time Complexity O(n)
// Space Complexity S(1)
