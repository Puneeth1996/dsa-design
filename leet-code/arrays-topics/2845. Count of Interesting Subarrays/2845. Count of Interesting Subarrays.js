/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
var countInterestingSubarrays = function (nums, m, k) {
	let count = 0
	let total = 0
	const map = new Map()
	map.set(0, 1)

	for (let num of nums) {
		if (num % m === k) count++
		let remainder = (count - k) % m
		if (remainder < 0) remainder += m
		total += map.get(remainder) || 0
		map.set(count % m, (map.get(count % m) || 0) + 1)
	}

	return total
}

// Time and space complexity: O(n)
