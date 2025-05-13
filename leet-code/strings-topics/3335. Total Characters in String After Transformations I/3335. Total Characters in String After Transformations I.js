/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
var lengthAfterTransformations = function (s, t) {
	const MOD = 1e9 + 7
	let count_freq = new Array(26).fill(0)

	for (const chr of s) {
		count_freq[chr.charCodeAt(0) - 'a'.charCodeAt(0)]++
	}

	for (let i = 0; i < t; i++) {
		const temp_count_freq = new Array(26).fill(0)
		for (let j = 0; j < 26; j++) {
			if (j === 25) {
				// this as z character in string s input
				temp_count_freq[0] = (temp_count_freq[0] + count_freq[j]) % MOD
				temp_count_freq[1] = (temp_count_freq[1] + count_freq[j]) % MOD
			} else {
				temp_count_freq[j + 1] =
					(temp_count_freq[j + 1] + count_freq[j]) % MOD
			}
		}
		count_freq = [...temp_count_freq] // deep copy of any array
	}

	return count_freq.reduce((len, c) => (len + c) % MOD, 0)
}
