/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
	let sum = stones.reduce((acc, v) => acc + v, 0)
	const target = Math.floor(sum / 2)

	// Initialize the dp array with zeros for storing the maximum sum possible for each subset sum.
	let dp = new Array(target + 1).fill(0)

	// Update the dp array to find the maximum subset sum less than or equal to half the total sum.
	for (let stone of stones) {
		for (let j = target; j >= stone; --j) {
			dp[j] = Math.max(dp[j], dp[j - stone] + stone)
		}
	}

	return sum - dp[target] * 2
}

// idea to solve this problem is arrray of stones
// should return smalled possible wieght
// after smashing all possible stones
// calculating sum of the stones array and
// then creating half pile of element close to mid way of sum
// if the array sum is even then half pile sum should be mid way
// else if array sum is odd then half pile sum should be mid way - 1 value
// similar to "bounded Knapsack problem" in algorithms
