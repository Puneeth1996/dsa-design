/**
 * @param {number[]} energy
 * @param {number} k
 * @return {number}
 */
var maximumEnergy = function (energy, k) {
	let dp = new Array(energy.length).fill(0)
	let res = -Infinity
	for (let i = energy.length - 1; i >= 0; i--) {
		dp[i] = energy[i] + (i + k < energy.length ? dp[i + k] : 0)
		res = Math.max(res, dp[i])
	}
	return res
}
// Time and space O(n)
