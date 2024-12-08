/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function (logs) {
	let ans = 0
	for (const x of logs) {
		if (x === '../') {
			ans && ans--
		} else if (x !== './') {
			ans++
		}
	}
	return ans
}
