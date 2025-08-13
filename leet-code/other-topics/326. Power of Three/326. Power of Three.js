/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
	if (n <= 0) return false
	while (n % 3 === 0) n /= 3
	return n === 1
}
// Time complexity: O(log n) — we divide n by 3 until it becomes 1 or less than 1
// Space complexity: O(1) — no additional space used
