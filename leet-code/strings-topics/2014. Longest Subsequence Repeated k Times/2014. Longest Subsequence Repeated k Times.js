/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var longestSubsequenceRepeatedK = function (s, k) {
	const freq = new Map()
	for (let ch of s) {
		freq.set(ch, (freq.get(ch) || 0) + 1)
	}

	// Only keep characters that appear at least k times
	let chars = []
	for (let [ch, count] of freq) {
		if (count >= k) chars.push(ch)
	}

	chars.sort().reverse() // Try lexicographically largest first

	// Check if target.repeat(k) is a subsequence of s
	const isKSubseq = (t) => {
		let target = t.repeat(k)
		let j = 0
		for (let ch of s) {
			if (ch === target[j]) j++
			if (j === target.length) return true
		}
		return false
	}

	let queue = ['']
	let answer = ''

	for (let len = 1; len <= 7; len++) {
		const next = []
		for (let prefix of queue) {
			for (let ch of chars) {
				let candidate = prefix + ch
				if (isKSubseq(candidate)) {
					next.push(candidate)
					if (
						candidate.length > answer.length ||
						(candidate.length === answer.length && candidate > answer)
					) {
						answer = candidate
					}
				}
			}
		}
		queue = next
	}

	return answer
}
