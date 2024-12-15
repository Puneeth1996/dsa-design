/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
var decrypt = function (code, k) {
	const n = code.length
	const ans = Array(n).fill(0)

	if (k === 0) {
		return ans
	}

	for (let i = 0; i < n; ++i) {
		if (k > 0) {
			for (let j = i + 1; j < i + k + 1; ++j) {
				ans[i] += code[j % n]
			}
		} else {
			for (let j = i + k; j < i; ++j) {
				ans[i] += code[(j + n) % n]
			}
		}
	}

	return ans
}
