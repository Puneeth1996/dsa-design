// /**
//  * @param {string} word
//  * @return {number}
//  */
// var possibleStringCount = function (word) {
// 	wordLength = word.length
// 	if (1 <= wordLength <= 100) {
// 		let count = 1
// 		let wordFreq = {}
// 		for (let i = 0; i < wordLength; i++) {
// 			if (word[i] in wordFreq) {
// 				wordFreq[word[i]] += 1
// 				if (i > 0 && wordFreq[word[i]] === wordFreq[word[i - 1]]) {
// 					count += 1
// 				}
// 			} else {
// 				wordFreq[word[i]] = 1
// 			}
// 		}
// 		return count
// 	}
// 	return 'Constraints Violated'
// }

/**
 * @param {string} word
 * @return {number}
 */
var possibleStringCount = function (word) {
	let f = 1
	for (let i = 1; i < word.length; ++i) {
		f += word[i] === word[i - 1] ? 1 : 0
	}
	return f
}

// Other solution thoughts
// Remove the duplicate characters from the string and return difference of length between original and new string
// convert string to array and set and compare the lengths of them
possibleStringCount('abbcccc')
possibleStringCount('abcd')
possibleStringCount('aaaa')
