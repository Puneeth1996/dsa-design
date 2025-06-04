/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function (word, numFriends) {
	if (numFriends == 1) return word
	var n = word.length,
		max_len_substr = n - numFriends + 1,
		i,
		t,
		answer = word.substr(0, max_len_substr)
	for (i = 1; i < n; i++) {
		t = word.substr(i, max_len_substr)
		if (t > answer) answer = t
	}
	return answer
}
