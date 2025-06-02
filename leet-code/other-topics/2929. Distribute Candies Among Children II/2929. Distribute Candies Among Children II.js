// /**
//  * @param {number} n
//  * @param {number} limit
//  * @return {number}
//  */

// Approach 1: Brute Force
function distributeCandies(n, limit) {
	let count = 0
	for (let a = 0; a <= limit; a++) {
		for (let b = 0; b <= limit; b++) {
			// determine how many candies child c should get
			let c = n - a - b
			// check if c is within bounds (0 to limit)
			if (0 <= c && c <= limit) {
				count++ // valid distribution
			}
		}
	}
	return count
}
// Time Complexity: O(limit2) Space Complexity: O(1)

// Approach 2: Combinatorial Counting
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
// Time: O(1) Space: O(1)
