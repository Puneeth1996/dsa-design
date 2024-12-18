/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
	let left = 0
	let right = num

	while (left < right) {
		const mid = Math.floor((left + right) / 2)
		if (mid <= num / mid) {
			left = mid
		} else {
			right = mid - 1
		}
	}
	return left
}
