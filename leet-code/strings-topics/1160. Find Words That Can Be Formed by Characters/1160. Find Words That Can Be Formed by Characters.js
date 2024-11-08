/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
	let count = {}
	for (let i = 0; i < chars.length; i++) {
		let ch = chars.charAt(i)
		if (!count[ch]) {
			count[ch] = 1
		} else {
			count[ch] += 1
		}
	}
	res = 0
	for (const each_word of words) {
		cur_word_count = {}
		for (let i = 0; i < each_word.length; i++) {
			let word_ch = each_word.charAt(i)
			if (!cur_word_count[word_ch]) {
				cur_word_count[word_ch] = 1
			} else {
				cur_word_count[word_ch] += 1
			}
		}
		let flag = true
		for (let i = 0; i < each_word.length; i++) {
			c = each_word[i]
			if (!(c in count) || cur_word_count[c] > count[c]) {
				flag = false
				break
			}
		}
		if (flag) res += each_word.length
	}
	return res
}

countCharacters(['cat', 'bt', 'hat', 'tree'], 'atach')

// Time complexity - O(n*K)
// Number characters in words array and charcters in chars string
// Space Complexity - O(n + m)
