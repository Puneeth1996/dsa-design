/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
	const mergedArray = []
	const maxLength = Math.max(word1.length, word2.length)
	for (let index = 0; index < maxLength; index++) {
		if (index < word1.length) {
			mergedArray.push(word1[index])
		}
		if (index < word2.length) {
			mergedArray.push(word2[index])
		}
	}

	return mergedArray.join('')
}
// Time complexity O(m+n)
