/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function (nums) {
	const n = nums.length
	const prefix = new Array(n + 1).fill(0)
	for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i]
	const total = prefix[n]

	let ans = 0
	for (let z = 0; z < n; z++) {
		if (nums[z] !== 0) continue
		const L = prefix[z]
		const R = total - prefix[z + 1]
		if (L === R) ans += 2
		else if (Math.abs(L - R) === 1) ans += 1
	}
	return ans
}

// Time and space O(N)
