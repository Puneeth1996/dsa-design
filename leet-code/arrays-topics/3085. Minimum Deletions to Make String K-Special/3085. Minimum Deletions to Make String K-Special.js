/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumDeletions = function (word, k) {
	// Step 1: Count frequencies of each character
	const freqMap = {}
	for (const char of word) {
		freqMap[char] = (freqMap[char] || 0) + 1
	}

	// Step 2: Extract and sort frequencies
	const frequencies = Object.values(freqMap).sort((a, b) => a - b)
	const n = frequencies.length
	let minDeletions = Infinity

	// Step 3: Sliding window with binary search
	for (let i = 0; i < n; i++) {
		const left = frequencies[i]
		const right = left + k

		// Binary search to find the largest freq <= right
		let low = i
		let high = n - 1
		let bestJ = i

		while (low <= high) {
			const mid = Math.floor((low + high) / 2)
			if (frequencies[mid] <= right) {
				bestJ = mid
				low = mid + 1
			} else {
				high = mid - 1
			}
		}

		// Calculate deletions before i (sum freqs < left)
		let deletionsBefore = frequencies
			.slice(0, i)
			.reduce((sum, num) => sum + num, 0)

		// Calculate deletions after bestJ (sum freqs > right)
		let deletionsAfter = frequencies
			.slice(bestJ + 1)
			.reduce((sum, num) => sum + (num - right), 0)

		const totalDeletions = deletionsBefore + deletionsAfter
		minDeletions = Math.min(minDeletions, totalDeletions)
	}

	return minDeletions
}
// Time Complexity: O(n log n) due to sorting and binary search
// Space Complexity: O(n) for frequency map and sorted frequencies
