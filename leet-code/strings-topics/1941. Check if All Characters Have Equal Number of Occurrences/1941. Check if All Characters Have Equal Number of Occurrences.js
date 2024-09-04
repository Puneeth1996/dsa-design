/**
 * @param {string} s
 * @return {boolean}
 */
var areOccurrencesEqual = (s) => {
	const map = {}

	for (const char of s) {
		if (!map[char]) map[char] = 0
		map[char] += 1
	}

	const set = new Set(Object.values(map))

	return set.size === 1
}
