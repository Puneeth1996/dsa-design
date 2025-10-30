/**
 * @param {number[]} target
 * @return {number}
 */
var minNumberOperations = function (target) {
	if (!target || target.length === 0) return 0

	let ans = target[0]
	for (let i = 1; i < target.length; i++) {
		if (target[i] > target[i - 1]) {
			ans = ans + (target[i] - target[i - 1])
		}
	}
	return ans
}
// Time And Space O(n) and O(1)
