/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function (dominoes) {
	let count = new Array(100).fill(0),
		res = 0
	for (let [a, b] of dominoes) {
		let val = a < b ? a * 10 + b : b * 10 + a
		res += count[val]++
	}
	return res
}
// Time complexity: O(n) Space complexity: O(1)
