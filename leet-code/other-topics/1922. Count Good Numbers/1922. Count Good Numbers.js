/**
 * @param {number} n
 * @return {number}
 */
var countGoodNumbers = function (n) {
	const MOD = 1e9 + 7

	const powNumber = (base, power) => {
		let result = 1n
		base = BigInt(base)
		power = BigInt(power)
		const mod = BigInt(MOD)

		while (power > 0) {
			if (power % 2n === 1n) {
				result = (result * base) % mod
			}
			base = (base * base) % mod
			power = power / 2n
		}

		return result
	}

	const even = Math.ceil(n / 2)
	const odd = Math.floor(n / 2)

	const evenWays = powNumber(5, even)
	const oddWays = powNumber(4, odd)

	return Number((evenWays * oddWays) % BigInt(MOD))
}
