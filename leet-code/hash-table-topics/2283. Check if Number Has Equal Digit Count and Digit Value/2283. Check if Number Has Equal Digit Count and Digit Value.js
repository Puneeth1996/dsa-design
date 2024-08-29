/**
 * @param {string} num
 * @return {boolean}
 */
const digitCount = (num) => {
	const times = new Array(num.length).fill(0)

	num.split('').forEach((digit) => {
		times[digit] += 1
	})

	return times.join('') === num
}
