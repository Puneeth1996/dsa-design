/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
	if (high < low) {
		return 0
	}

	if (low % 2 == 0 && high % 2 == 0) {
		return parseInt((high - low) / 2, 10)
	} else if (
		(low % 2 == 0 && high % 2 != 0) ||
		(low % 2 != 0 && high % 2 == 0)
	) {
		return parseInt((high - low) / 2 + 1, 10)
	}

	return parseInt((high - low) / 2 + 1, 10)
}
