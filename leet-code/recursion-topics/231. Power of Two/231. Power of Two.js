/**
 * @param {number} n
 * @return {boolean}
 */
// Approach 1 :
// checking module of 1 of the number = 0 shows even and its divisible by 2 till 1 is found
// Time complexity is (log n) and  s(1)
var isPowerOfTwo = function (n) {
	if (n <= 0) {
		return false
	}
	if (n === 1) return true
	return n % 2 === 0 && isPowerOfTwo(n / 2)
}
// Approach 2 : bit wise and of n and n-1 will be --- 0
// Example 8 in bit = 1000 and 8-1 = 7 - 0111 and (1000) & (0111) AND operation === 10000
// Time and space complexity - o(1) and s(1)
// var isPowerOfTwo = function(n) {
//     return n > 0 && (n & (n - 1)) === 0;
// };
