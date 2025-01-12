/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {
	const ans = []
	for (const c of s) {
		if (c === '*') {
			ans.pop()
		} else {
			ans.push(c)
		}
	}
	return ans.join('')
}

// time complexity of the code is O(n)
// space complexity of the code is also O(n), which is the space needed to store the stack (ans)
