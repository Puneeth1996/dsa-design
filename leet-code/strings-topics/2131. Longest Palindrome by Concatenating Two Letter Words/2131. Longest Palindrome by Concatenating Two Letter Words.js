/**
 * @param {string[]} words
 * @return {number}
 */
var longestPalindrome = function (words) {
	let length = 0
	let hasCenter = false
	for (const word of words) {
		const reversed = word[1] + word[0]
		if (map.has(reversed) && map.get(reversed) > 0) {
			length += 4
			map.set(reversed, map.get(reversed) - 1)
		} else {
			map.set(word, (map.get(word) || 0) + 1)
		}
	}
	for (const [word, count] of map) {
		if (word[0] === word[1] && count > 0) {
			hasCenter = true
			break
		}
	}
	return hasCenter ? length + 2 : length
}
