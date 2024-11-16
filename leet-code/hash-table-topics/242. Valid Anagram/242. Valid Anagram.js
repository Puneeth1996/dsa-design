/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
	if (t.length != s.length) return false
	let array = []
	array.length = 26
	array.fill(0)
	for (let i = 0; i < s.length; i++) {
		array[s.charCodeAt(i) - 97]++
		array[t.charCodeAt(i) - 97]--
	}
	for (let i = 0; i < array.length; i++) {
		if (array[i] > 0) return false
	}
	return true
}

// Complexity O(n)
// Space Complexity O(26) or O(1)

// Approach create an array of lenght 26 equivalent to number of alphabets
// add character to 1 seen with string s
// subtract -1 seen with string t
