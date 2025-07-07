/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
	const freq = {}

	for (const num of arr) {
		freq[num] = (freq[num] || 0) + 1
	}

	let lucky = -1

	for (const key in freq) {
		const num = parseInt(key)
		if (freq[key] === num) {
			lucky = Math.max(lucky, num)
		}
	}

	return lucky
}
// Time Complexity: Counting frequencies → O(n) Iterating over keys in frequency map → O(m) In worst case, m = n (all elements unique)
// Space Complexity: Frequency map → O(m) Worst case: O(n) unique elements
