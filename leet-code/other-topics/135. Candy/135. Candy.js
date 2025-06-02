/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
	const n = ratings.length
	const candies = new Array(n).fill(1)

	// Pass 1: Left to right
	for (let i = 1; i < n; i++) {
		if (ratings[i] > ratings[i - 1]) {
			candies[i] = candies[i - 1] + 1
		}
	}

	// Pass 2: Right to left
	for (let i = n - 2; i >= 0; i--) {
		if (ratings[i] > ratings[i + 1]) {
			candies[i] = Math.max(candies[i], candies[i + 1] + 1)
		}
	}

	// Sum up all candies
	return candies.reduce((sum, val) => sum + val, 0)
}

// /**
//  * @param {number[]} ratings
//  * @return {number}
//  */
// var candy = function (ratings) {
// 	const n = ratings.length
// 	const candies = new Array(n).fill(1)
// 	// Helper: Apply candy logic in left-to-right direction
// 	function updateCandies(ratings, candies) {
// 		for (let i = 1; i < ratings.length; i++) {
// 			if (ratings[i] > ratings[i - 1]) {
// 				candies[i] = Math.max(candies[i], candies[i - 1] + 1)
// 			}
// 		}
// 	}
// 	// First pass: left to right
// 	updateCandies(ratings, candies)

// 	// Second pass: right to left (on reversed)
// 	// Reverse arrays
// 	ratings.reverse()
// 	candies.reverse()
// 	updateCandies(ratings, candies)
// 	// Reverse candies back
// 	candies.reverse()
// 	// Sum and return total candies
// 	return candies.reduce((sum, val) => sum + val, 0)
// }
// // Time Complexity O(n) Space Complexity O(n) (for candy array)
