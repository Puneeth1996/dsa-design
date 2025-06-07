/**
 * @param {string} s
 * @return {string}
 */
var clearStars = function (s) {
	const stack = []
	const bucket = Array.from({length: 26}, () => [])

	for (const ch of s) {
		if (ch !== '*') {
			stack.push(ch)
			bucket[ch.charCodeAt(0) - 97].push(stack.length - 1)
		} else {
			for (let i = 0; i < 26; i++) {
				if (bucket[i].length > 0) {
					const idx = bucket[i].pop()
					stack[idx] = '#'
					break
				}
			}
		}
	}

	return stack.filter((ch) => ch !== '#').join('')
}
