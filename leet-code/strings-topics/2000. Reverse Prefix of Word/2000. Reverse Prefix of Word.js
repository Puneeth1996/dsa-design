/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
var reversePrefix = function (word, ch) {
	const i = word.indexOf(ch) + 1
	if (!i) {
		return word
	}
	return [...word.slice(0, i)].reverse().join('') + word.slice(i)
}
