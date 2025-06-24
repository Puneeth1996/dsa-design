// /**
//  * @param {number} k
//  * @param {number} n
//  * @return {number}
//  */

// var kMirror = function (k, n) {
// 	let count = 0,
// 		num = 1,
// 		sum = 0

// 	while (count < n) {
// 		if (isPalindrome(num.toString())) {
// 			let baseK = toBaseK(num, k)
// 			if (isPalindrome(baseK)) {
// 				sum += num
// 				count++
// 			}
// 		}
// 		num++
// 	}

// 	return sum
// }

// function isPalindrome(s) {
// 	return s === s.split('').reverse().join('')
// }

// function toBaseK(num, k) {
// 	let result = ''
// 	while (num > 0) {
// 		result = (num % k) + result
// 		num = Math.floor(num / k)
// 	}
// 	return result || '0'
// }

// Time Complexity: O(n * d)
// Space Complexity: O(1)
// Time Limit Exceeded

// Optimized Plan
// Generate base-10 palindromes in increasing order (efficiently).

// For each:

// Convert to base k

// Check if it's also a palindrome

// If yes, add to sum

// Stop when n such numbers are found.

// Generate Palindromes Efficiently
// Use half-length reflection to generate palindromes like:

// 1 → 1

// 2 → 2

// 11, 22 (by mirroring 1, 2, etc.)

// Generate odd and even-length palindromes.

// Why This Is Fast:
// Only generates palindromic candidates, reducing the search space drastically.

// Base k conversion + palindrome check is fast for each.

// Stops early when n results are found.

/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var createPalindrome = function (num, odd) {
	let x = num
	if (odd) x = Math.floor(x / 10)
	while (x > 0) {
		num = num * 10 + (x % 10)
		x = Math.floor(x / 10)
	}
	return num
}

var isPalindrome = function (num, base) {
	const sb = []
	let n = num
	while (n > 0) {
		sb.push(String.fromCharCode((n % base) + '0'.charCodeAt(0)))
		n = Math.floor(n / base)
	}
	const s = sb.join('')
	let i = 0,
		j = s.length - 1
	while (i < j) {
		if (s[i++] !== s[j--]) return false
	}
	return true
}

var kMirror = function (k, n) {
	let sum = 0
	for (let len = 1; n > 0; len *= 10) {
		// Generate odd-length palindromes
		for (let i = len; n > 0 && i < len * 10; i++) {
			const p = createPalindrome(i, true)
			if (isPalindrome(p, k)) {
				sum += p
				n--
			}
		}
		// Generate even-length palindromes
		for (let i = len; n > 0 && i < len * 10; i++) {
			const p = createPalindrome(i, false)
			if (isPalindrome(p, k)) {
				sum += p
				n--
			}
		}
	}
	return sum
}
