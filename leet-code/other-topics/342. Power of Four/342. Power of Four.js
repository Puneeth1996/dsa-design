/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function (num) {
	if (num <= 0) return false

	while (num > 1) {
		if (num % 4 != 0) return false

		num = num / 4
	}
	return true
}

// Time complexity is log(num)
