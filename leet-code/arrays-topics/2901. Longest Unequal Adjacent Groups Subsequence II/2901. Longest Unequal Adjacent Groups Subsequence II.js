/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
var getWordsInLongestSubsequence = function (words, groups) {
	const n = words.length
	// Helper to compute Hamming Distance
	const hammingDistance = (s1, s2) => {
		let count = 0
		for (let i = 0; i < s1.length; i++) {
			if (s1[i] !== s2[i]) count++
		}
		return count
	}

	const dp = new Array(n).fill(1)
	const prev = new Array(n).fill(-1)

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < i; j++) {
			if (
				groups[i] !== groups[j] &&
				words[i].length === words[j].length &&
				hammingDistance(words[i], words[j]) === 1
			) {
				if (dp[j] + 1 > dp[i]) {
					dp[i] = dp[j] + 1
					prev[i] = j
				}
			}
		}
	}

	// Find index with max value in dp
	let maxIndex = 0
	for (let i = 1; i < n; i++) {
		if (dp[i] > dp[maxIndex]) {
			maxIndex = i
		}
	}

	// Reconstruct the sequence
	const result = []
	let i = maxIndex
	while (i !== -1) {
		result.push(words[i])
		i = prev[i]
	}

	return result.reverse()
}
// Time Complexity O(n² * L)
// Space Complexity O(n)
