/**
 * @param {string} s
 * @param {number} t
 * @param {number[]} nums
 * @return {number}
 */
var lengthAfterTransformations = function (s, t, nums) {
	const MOD = BigInt(1e9 + 7)

	// Matrix multiplication with BigInt
	const multiply = (a, b) => {
		const res = Array(26)
			.fill()
			.map(() => Array(26).fill(BigInt(0)))
		for (let i = 0; i < 26; ++i) {
			for (let k = 0; k < 26; ++k) {
				if (a[i][k] === BigInt(0)) continue
				for (let j = 0; j < 26; ++j) {
					res[i][j] = (res[i][j] + a[i][k] * b[k][j]) % MOD
				}
			}
		}
		return res
	}

	// Matrix exponentiation with BigInt
	const matrixPow = (mat, power) => {
		let result = Array(26)
			.fill()
			.map(() => Array(26).fill(BigInt(0)))
		for (let i = 0; i < 26; ++i) {
			result[i][i] = BigInt(1)
		}
		while (power > 0) {
			if (power % 2 === 1) {
				result = multiply(result, mat)
			}
			mat = multiply(mat, mat)
			power = Math.floor(power / 2)
		}
		return result
	}

	// Initialize the transition matrix with BigInt
	const transition = Array(26)
		.fill()
		.map(() => Array(26).fill(BigInt(0)))
	for (let c = 0; c < 26; ++c) {
		const num = nums[c]
		for (let j = 1; j <= num; ++j) {
			const nextChar = (c + j) % 26
			transition[c][nextChar] = transition[c][nextChar] + BigInt(1)
		}
	}

	// Raise the transition matrix to the t-th power
	const matPow = matrixPow(transition, t)

	// Initialize the count vector with BigInt
	const cnt = Array(26).fill(BigInt(0))
	for (let c of s) {
		cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)] =
			cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)] + BigInt(1)
	}

	// Multiply the count vector by the matrix^t
	const newCnt = Array(26).fill(BigInt(0))
	for (let i = 0; i < 26; ++i) {
		for (let j = 0; j < 26; ++j) {
			newCnt[j] = (newCnt[j] + cnt[i] * matPow[i][j]) % MOD
		}
	}

	// Sum all the counts
	let total = BigInt(0)
	for (let x of newCnt) {
		total = (total + x) % MOD
	}
	return Number(total)
}
