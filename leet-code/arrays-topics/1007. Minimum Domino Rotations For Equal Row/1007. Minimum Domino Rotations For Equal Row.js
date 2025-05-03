/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
var minDominoRotations = function (tops, bottoms) {
	const targetTop = tops[0]
	const targetBottom = bottoms[0]
	const bothTarget = [targetTop, targetBottom]
	for (const targetValue of bothTarget) {
		let countSwapTop = 0
		let countSwapBottom = 0
		for (let i = 0; i < tops.length; i++) {
			if (targetValue !== tops[i] && targetValue !== bottoms[i]) {
				break
			}
			if (tops[i] !== targetValue) {
				countSwapTop++
			}
			if (bottoms[i] !== targetValue) {
				countSwapBottom++
			}
			if (i === tops.length - 1) {
				return Math.min(countSwapTop, countSwapBottom)
			}
		}
	}
	return -1
}
// Time Complexity: O(2n)
// Space Complexity : O(1)
