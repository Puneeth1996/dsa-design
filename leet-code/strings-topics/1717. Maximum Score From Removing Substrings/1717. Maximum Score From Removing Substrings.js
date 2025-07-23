/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var maximumGain = function (s, x, y) {
	// Decide removal order
	let firstPair = x >= y ? ['a', 'b'] : ['b', 'a']
	let firstScore = Math.max(x, y)
	let secondScore = Math.min(x, y)

	// First pass - remove high priority pair
	const removePair = (s, a, b, score) => {
		let stack = []
		let result = 0
		for (let ch of s) {
			if (stack.length && stack[stack.length - 1] === a && ch === b) {
				stack.pop()
				result += score
			} else {
				stack.push(ch)
			}
		}
		return [stack.join(''), result]
	}

	let [afterFirstPass, score1] = removePair(
		s,
		firstPair[0],
		firstPair[1],
		firstScore
	)
	let [_, score2] = removePair(
		afterFirstPass,
		firstPair[1],
		firstPair[0],
		secondScore
	)

	return score1 + score2
}
