/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
	let separate = s.split(' ')
	let res = separate.map((str) => {
		return str.split('').reverse().join('')
	})

	return res.join(' ')
}
