/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
var getLongestSubsequence = function (words, groups) {
	const result = []
	let last = -1
	for (let i = 0; i < words.length; i++) {
		if (groups[i] !== last) {
			result.push(words[i])
			last = groups[i]
		}
	}
	return result
}
// Time Complexity: O(n). 
// Space Complexity: O(n).
