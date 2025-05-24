/**
 * @param {string[]} words
 * @param {character} x
 * @return {number[]}
 */
var findWordsContaining = function (words, x) {
	const result = []
	words.forEach((word, index) => {
		if (word.includes(x)) {
			result.push(index)
		}
	})
	return result
}
// Time and Space Complexity O(n * m) O(k)
