/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
	let res = '1'
	for (let i = 1; i < n; i++) {
		let temp = '',
			count = 1
		for (let j = 1; j < res.length; j++) {
			if (res[j] === res[j - 1]) {
				count++
			} else {
				temp += count + res[j - 1]
				count = 1
			}
		}
		temp += count + res[res.length - 1]
		res = temp
	}
	return res
}
// Time & Space Complexity: O(2^n)
