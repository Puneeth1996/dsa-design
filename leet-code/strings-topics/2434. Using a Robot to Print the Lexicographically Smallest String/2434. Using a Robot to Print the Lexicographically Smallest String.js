/**
 * @param {string} s
 * @return {string}
 */
var robotWithString = function (s) {
	const freq = new Array(26).fill(0)
	const aCode = 'a'.charCodeAt(0)

	// Count frequency of each character
	for (let ch of s) {
		freq[ch.charCodeAt(0) - aCode]++
	}

	const stack = []
	const result = []
	let smallestChar = 0 // index of the smallest available char

	for (let ch of s) {
		const index = ch.charCodeAt(0) - aCode
		stack.push(ch)
		freq[index]--

		// Update smallestChar to the next available smallest character
		while (smallestChar < 26 && freq[smallestChar] === 0) {
			smallestChar++
		}

		// Pop from stack while top <= current smallest available char
		while (
			stack.length > 0 &&
			stack[stack.length - 1].charCodeAt(0) - aCode <= smallestChar
		) {
			result.push(stack.pop())
		}
	}

	// Empty the stack
	while (stack.length > 0) {
		result.push(stack.pop())
	}

	return result.join('')
}
