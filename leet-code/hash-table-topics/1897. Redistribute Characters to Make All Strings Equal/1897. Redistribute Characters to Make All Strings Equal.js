/**
 * @param {string[]} words
 * @return {boolean}
 */
var makeEqual = function (words) {
	let n = words.length
	let unorderedCount = {}

	for (let wrd of words) {
		for (let i = 0; i < wrd.length; i++) {
			let ch = wrd[i]
			if (unorderedCount.hasOwnProperty(ch)) {
				unorderedCount[ch]++
			} else {
				unorderedCount[ch] = 1
			}
		}
	}

	for (let keyChar in unorderedCount) {
		if (unorderedCount.hasOwnProperty(keyChar)) {
			console.log(keyChar + ' -> ' + unorderedCount[keyChar])
			if (unorderedCount[keyChar] % n != 0) {
				return false
			}
		}
	}
	return true
}
// makeEqual(['abc', 'aabc', 'bc'])
// In this approch each char should be present multiple of n, array words length
// Time complexity (n x m) n lenght of array words and m characters ir max word in array
// Space Complexity (m) Total character in the array of words
