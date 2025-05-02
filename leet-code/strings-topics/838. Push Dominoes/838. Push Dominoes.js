/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function (dominoes) {
	const n = dominoes.length
	const vector = new Array(n)
	let i = 0
	for (let j = n - 1; j >= 0; j--) {
		let c = dominoes[j]
		if (c === 'L') {
			i = n
		} else if (c === 'R') {
			i = 0
		} else if (c === '.') {
			if (i > 0) {
				i--
			}
		}
		vector[j] = i
	}
	i = 0
	let res = [...dominoes]
	for (let j = 0; j < n; j++) {
		let c = res[j]
		if (c === 'L') {
			i = 0
		} else if (c === 'R') {
			i = n
		} else if (c === '.') {
			if (i > 0) {
				i--
			}
			if (i < vector[j]) {
				res[j] = 'L'
			} else if (i > vector[j]) {
				res[j] = 'R'
			}
		}
	}
	return res.join('')
}
// time complexity is (O(n)), where (n) is the length of the dominoes string. This is because we perform two passes over the string, each taking (O(n)) time.
// space complexity is (O(n)), as we are storing the influence of each domino in a vector (array).
