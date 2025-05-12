/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
	const freq = new Array(10).fill(0)
	for (const digit of digits) {
		freq[digit]++
	}
	const result = []
	for (let i = 1; i <= 9; i++) {
		if (freq[i] === 0) {
			continue
		}
		freq[i]--
		for (let j = 0; j <= 9; j++) {
			if (freq[j] === 0) {
				continue
			}
			freq[j]--
			for (let k = 0; k <= 8; k += 2) {
				if (freq[k] === 0) {
					continue
				}
				const num = i * 100 + j * 10 + k
				result.push(num)
			}
			freq[j]++
		}
		freq[i]++
	}
	return result
}
