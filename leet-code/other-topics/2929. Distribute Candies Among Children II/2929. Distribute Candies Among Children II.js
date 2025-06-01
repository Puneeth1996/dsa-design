// /**
//  * @param {number} n
//  * @param {number} limit
//  * @return {number}
//  */
// var distributeCandies = function (n, limit) {
// 	let count = 0
// 	for (let x = 0; x <= limit; x++) {
// 		for (let y = 0; y <= limit; y++) {
// 			let z = n - x - y
// 			if (z >= 0 && z <= limit) {
// 				count++
// 			}
// 		}
// 	}
// 	return count
// }
// // TLE
// //O(limit^2) and space O(1)

// /**
//  * @param {number} n
//  * @param {number} limit
//  * @return {number}
//  */
// function distributeCandies(n, limit) {
// 	let dp = Array(n + 1).fill(0)
// 	dp[0] = 1
// 	for (let p = 0; p < 3; ++p) {
// 		let newDp = Array(n + 1).fill(0)
// 		let prefix = Array(n + 2).fill(0)
// 		for (let i = 0; i <= n; ++i) prefix[i + 1] = prefix[i] + dp[i]
// 		for (let i = 0; i <= n; ++i) {
// 			let l = Math.max(0, i - limit),
// 				r = i
// 			newDp[i] = prefix[r + 1] - prefix[l]
// 		}
// 		dp = newDp
// 	}
// 	return dp[n]
// }
// // O(n) and  O(n)

/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */
function distributeCandies(n, limit) {
	const comb = (a, b) => {
		if (a < 0 || b < 0 || b > a) return 0
		let res = 1
		for (let i = 1; i <= b; i++) {
			res = (res * (a - i + 1)) / i
		}
		return res
	}

	let totalWays = 0

	// Inclusion-Exclusion principle
	for (let k = 0; k <= 3; ++k) {
		let sign = k % 2 === 0 ? 1 : -1
		let val = n - k * (limit + 1)
		totalWays += sign * comb(3, k) * comb(val + 2, 2)
	}

	return totalWays
}
// O(n) and  O(n)
