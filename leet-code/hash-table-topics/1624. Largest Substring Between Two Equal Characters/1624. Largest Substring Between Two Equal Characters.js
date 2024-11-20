/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function (s) {
	let n = s.length
	let unordered_map = {}
	let result = -1
	for (let i = 0; i < n; i++) {
		let char = s[i]
		if (unordered_map.hasOwnProperty(char)) {
			result = Math.max(result, i - unordered_map[char])
		} else {
			unordered_map[char] = i // add the character and its index to the map
		}
	}
	return result === -1 ? -1 : result - 1 // return result - 1 because the result is inclusive of both the first and last occurrence of equal characters
}

// Time and space complexity is both O(n)
